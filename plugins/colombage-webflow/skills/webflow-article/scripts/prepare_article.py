#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
prepare_article.py — Prepare un article ColombAge pour le CMS Webflow.

Partie "scripts locaux" du skill webflow-article (integration hybride :
ce script fait les transformations deterministes ; le push vers Webflow
se fait ensuite via le MCP Webflow `create_collection_items` en DRAFT).

Entree  : un JSON (fichier en argument, ou stdin) decrivant l'article.
Sortie  : un JSON sur stdout :
            {
              "collection_id": "...",
              "site": "...",
              "needs_reference_resolution": { "categorie": "<slug>", "auteur": "<slug>", "cta": "<slug>" },
              "fieldData": { ... pret pour create_collection_items, references encore en slug ... }
            }

Le champ `fieldData` contient les slugs de reference (categorie/auteur/cta) tels
quels ; c'est a l'appelant (Claude) de les remplacer par les IDs d'items reels
via le MCP (list_collection_items sur la collection theme/auteurs/cta) AVANT
d'appeler create_collection_items. Les entrees a resoudre sont rappelees dans
`needs_reference_resolution`.

Format du JSON d'entree (toutes les cles sont optionnelles sauf name + body) :
{
  "collection": "nos-conseils",        # cle de collections.json (obligatoire)
  "name": "Titre SEO (balise title)",  # obligatoire -> champ `name`
  "slug": "mon-article",               # optionnel -> genere depuis name si absent
  "h1": "Titre H1 affiche",
  "metadescription": "... (<=180)",
  "chapo": "Accroche sous le titre",
  "image_alt": "texte alternatif image principale",
  "categorie": "sante",                # slug d'un theme existant -> a resoudre
  "auteur": "marc-pezeril",            # slug d'un auteur existant -> a resoudre
  "cta": "mon-cta",                    # slug d'un CTA existant -> a resoudre
  "cta_colombage": true,               # active le bloc CTA standard
  "apparition_nos_conseils": true,
  "rubrique": "Sante",                 # option `nos-conseils` (collections concernees)
  "table_des_matieres_md": "...",      # markdown -> table-des-matieres (modele riche)
  "body": "## Section...\n\nTexte...", # markdown -> premier-rich-text (corps principal)
  "body2": "## Suite...",              # markdown -> deuxieme-rich-text (modele riche)
  "resume_md": "...",                  # markdown -> resume-article (si la collection l'a)
  "cta_inline": {"lien": "https://...", "texte": "Demander un devis", "lien2": "..."},
  "faq": [ {"q": "Question ?", "r": "Reponse."}, ... ]   # mappe sur faq-question-N / faq-reponse-N
}

Snippets HTML : dans n'importe quel champ markdown, un marqueur de la forme
    {{snippet:nom}}
ou (avec parametres simples)
    {{snippet:nom | titre=... | lien=... | texte=...}}
est remplace par le contenu de scripts/snippets/<nom>.html, avec substitution
des placeholders ${param} presents dans le fichier snippet.

Aucune dependance obligatoire. Si la lib `markdown` est installee elle est
utilisee ; sinon un convertisseur Markdown -> HTML minimal integre prend le relais.
"""

import sys
import os
import re
import json
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
SNIPPETS_DIR = os.path.join(HERE, "snippets")
COLLECTIONS_PATH = os.path.join(HERE, "collections.json")


# --------------------------------------------------------------------------- #
# Slug
# --------------------------------------------------------------------------- #
def slugify(value):
    """Slug Webflow-compatible : minuscules, sans accents, tirets, alphanumerique."""
    value = unicodedata.normalize("NFKD", value)
    value = value.encode("ascii", "ignore").decode("ascii")
    value = value.lower()
    value = re.sub(r"[''`]", "", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value[:256]


# --------------------------------------------------------------------------- #
# Snippets
# --------------------------------------------------------------------------- #
SNIPPET_RE = re.compile(r"\{\{\s*snippet:\s*([a-z0-9\-_]+)\s*(\|[^}]*)?\}\}", re.IGNORECASE)


def _parse_params(raw):
    params = {}
    if not raw:
        return params
    for part in raw.split("|"):
        part = part.strip()
        if not part or "=" not in part:
            continue
        k, v = part.split("=", 1)
        params[k.strip()] = v.strip()
    return params


def _wrap_embed(html):
    """Enveloppe un bloc HTML custom dans le conteneur 'HTML embed' que Webflow
    reconnait dans un champ RichText. Sans ce wrapper, Webflow affiche le code
    comme du texte au lieu de le rendre. Marqueur observe sur les articles
    ColombAge existants : <div data-rt-embed-type='true'>...</div>."""
    return "<div data-rt-embed-type='true'>" + html + "</div>"


def _render_snippet_match(m):
    """Charge le snippet d'un match {{snippet:...}} et retourne son HTML final."""
    name = m.group(1).lower()
    params = _parse_params(m.group(2))
    path = os.path.join(SNIPPETS_DIR, name + ".html")
    if not os.path.isfile(path):
        raise SystemExit(
            f"[prepare_article] Snippet introuvable : {name} "
            f"(attendu : {path}). Snippets disponibles : "
            f"{_list_snippets()}"
        )
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    filled = _fill_placeholders(html, params, name).strip()
    return _wrap_embed(filled)


PLACEHOLDER_RE = re.compile(r"\$\{(\w+)(?::([^}]*))?\}")


def _fill_placeholders(html, params, snippet_name):
    """Remplace ${param} et ${param:defaut} dans un snippet.
    - param fourni       -> valeur fournie
    - sinon defaut donne -> defaut
    - sinon              -> erreur explicite (parametre requis manquant)."""
    def repl(m):
        key = m.group(1)
        default = m.group(2)  # None si pas de ':'
        if key in params:
            return params[key]
        if default is not None:
            return default
        raise SystemExit(
            f"[prepare_article] Snippet '{snippet_name}' : parametre requis manquant "
            f"'{key}'. Passe-le ainsi : {{{{snippet:{snippet_name} | {key}=... }}}}"
        )
    return PLACEHOLDER_RE.sub(repl, html)


def _list_snippets():
    if not os.path.isdir(SNIPPETS_DIR):
        return "(aucun dossier snippets/)"
    names = [f[:-5] for f in os.listdir(SNIPPETS_DIR) if f.endswith(".html")]
    return ", ".join(sorted(names)) or "(vide)"


# --------------------------------------------------------------------------- #
# Markdown -> HTML
# --------------------------------------------------------------------------- #
def _table_style():
    """Retourne le <style> du theme de tableau ColombAge (snippets/tableau.html)."""
    path = os.path.join(SNIPPETS_DIR, "tableau.html")
    if not os.path.isfile(path):
        return ""
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()


def _is_table_sep(line):
    s = line.strip()
    if "-" not in s or set(s) - set("|:- "):
        return False
    return s.startswith("|") or "|" in s


def _split_row(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def _strip_tags(s):
    # Retire les balises et echappe les guillemets doubles (l'attribut data-label
    # utilise des guillemets doubles, donc les apostrophes sont preservees).
    return re.sub(r"<[^>]+>", "", s).replace('"', "&quot;")


def _render_gir_table(block, with_style=False):
    """block = lignes Markdown d'un tableau (header, separateur, lignes).
    Produit un <table class='gir-table'> avec data-label (responsive), enveloppe
    dans un HTML embed. with_style=True prefixe le <style> du theme DANS le meme
    embed que la table, de sorte que chaque tableau soit un embed autonome
    (style + table) — comme les snippets cta / lire-aussi. (Webflow ignore un
    embed qui ne contient qu'un <style>, d'ou l'inclusion dans l'embed de la table.)"""
    headers = _split_row(block[0])
    rows = [_split_row(l) for l in block[2:] if l.strip()]
    out = ["<table class='gir-table'>", "<thead>", "<tr>"]
    for h in headers:
        out.append(f"<th>{_inline(h)}</th>")
    out += ["</tr>", "</thead>", "<tbody>"]
    for row in rows:
        out.append("<tr>")
        for idx, cell in enumerate(row):
            label = _strip_tags(headers[idx]) if idx < len(headers) else ""
            out.append(f'<td data-label="{label}">{_inline(cell)}</td>')
        out.append("</tr>")
    out += ["</tbody>", "</table>"]
    table_html = "\n".join(out)
    if with_style:
        style = _table_style()
        if style:
            table_html = style + "\n" + table_html
    return _wrap_embed(table_html)


def _convert_md_tables(text, add):
    """Remplace chaque tableau Markdown par un placeholder (via add) pointant
    vers son HTML gir-table. Retourne (texte, nombre_de_tableaux)."""
    lines = text.split("\n")
    out = []
    i, n, count = 0, len(lines), 0
    while i < n:
        line = lines[i]
        if (line.strip().startswith("|") and i + 1 < n and _is_table_sep(lines[i + 1])):
            block = []
            while i < n and lines[i].strip().startswith("|"):
                block.append(lines[i])
                i += 1
            out.append(add(_render_gir_table(block, with_style=True)))
            count += 1
        else:
            out.append(line)
            i += 1
    return "\n".join(out), count


def md_to_html(text):
    """Convertit du Markdown en HTML.

    Les snippets HTML et les tableaux Markdown sont extraits AVANT la conversion
    (remplaces par un commentaire-placeholder sur sa propre ligne) puis reinjectes
    intacts APRES, pour que le convertisseur Markdown ne corrompe jamais leur HTML.
    Les tableaux Markdown sont rendus au theme ColombAge (.gir-table) et le <style>
    correspondant est injecte une fois si au moins un tableau est present."""
    if not text:
        return ""
    stash = []

    def add(html):
        stash.append(html)
        # placeholder = commentaire HTML sur sa propre ligne -> traite comme bloc brut
        return f"\n\n<!--SNIPPET-{len(stash) - 1}-->\n\n"

    # 1. Snippets {{snippet:...}}
    text = SNIPPET_RE.sub(lambda m: add(_render_snippet_match(m)), text)
    # 2. Tableaux Markdown -> gir-table
    text, n_tables = _convert_md_tables(text, add)

    # 3. Conversion Markdown du reste
    try:
        import markdown as _md  # type: ignore
        html = _md.markdown(text, extensions=["extra", "sane_lists"])
    except Exception:
        html = _minimal_md(text)

    # 4. Reinjection (le placeholder peut avoir ete enveloppe dans <p>)
    for i, snippet_html in enumerate(stash):
        ph = f"<!--SNIPPET-{i}-->"
        html = html.replace(f"<p>{ph}</p>", snippet_html).replace(ph, snippet_html)

    # 5. (Le <style> du theme est desormais inclus dans l'embed du premier
    #     tableau via _render_gir_table(with_style=True) : pas d'embed style separe,
    #     que Webflow ignorerait car visuellement vide.)
    return html


def _link_repl(m):
    text, url = m.group(1), m.group(2)
    # Lien externe (http/https) -> nouvel onglet ; lien interne (relatif) -> meme onglet
    if url.startswith("http"):
        return f'<a href="{url}" target="_blank" rel="noopener">{text}</a>'
    return f'<a href="{url}">{text}</a>'


def _inline(s):
    # liens [txt](url) : accepte les URLs absolues (http) ET internes relatives (/...)
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", _link_repl, s)
    # gras **txt**
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    # italique *txt*
    s = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", s)
    return s


def _minimal_md(text):
    """Convertisseur Markdown minimal (fallback sans dependance).
    Gere : titres h2-h6, paragraphes, listes ul/ol, gras, italique, liens,
    citations, et laisse passer le HTML brut (lignes commencant par '<')."""
    lines = text.replace("\r\n", "\n").split("\n")
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        stripped = line.strip()

        if stripped == "":
            i += 1
            continue

        # HTML brut (ex. snippet deja expanse) : recopier le bloc tel quel
        if stripped.startswith("<"):
            out.append(line)
            i += 1
            continue

        # Titres
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            out.append(f"<h{level}>{_inline(m.group(2).strip())}</h{level}>")
            i += 1
            continue

        # Citation
        if stripped.startswith(">"):
            buf = []
            while i < n and lines[i].strip().startswith(">"):
                buf.append(lines[i].strip()[1:].strip())
                i += 1
            out.append("<blockquote><p>" + _inline(" ".join(buf)) + "</p></blockquote>")
            continue

        # Liste non ordonnee
        if re.match(r"^[-*+]\s+", stripped):
            items = []
            while i < n and re.match(r"^[-*+]\s+", lines[i].strip()):
                items.append(_inline(re.sub(r"^[-*+]\s+", "", lines[i].strip())))
                i += 1
            out.append("<ul>" + "".join(f"<li>{it}</li>" for it in items) + "</ul>")
            continue

        # Liste ordonnee
        if re.match(r"^\d+[.)]\s+", stripped):
            items = []
            while i < n and re.match(r"^\d+[.)]\s+", lines[i].strip()):
                items.append(_inline(re.sub(r"^\d+[.)]\s+", "", lines[i].strip())))
                i += 1
            out.append("<ol>" + "".join(f"<li>{it}</li>" for it in items) + "</ol>")
            continue

        # Paragraphe (regroupe les lignes consecutives non vides)
        buf = []
        while i < n and lines[i].strip() != "" and not re.match(
            r"^(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|<)", lines[i].strip()
        ):
            buf.append(lines[i].strip())
            i += 1
        out.append("<p>" + _inline(" ".join(buf)) + "</p>")
    return "\n".join(out)


# --------------------------------------------------------------------------- #
# Build fieldData
# --------------------------------------------------------------------------- #
def load_collections():
    with open(COLLECTIONS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def build(data):
    cfg = load_collections()
    coll_key = data.get("collection")
    if not coll_key:
        raise SystemExit("[prepare_article] Champ 'collection' obligatoire (cle de collections.json).")
    if coll_key not in cfg["collections"]:
        raise SystemExit(
            f"[prepare_article] Collection inconnue : {coll_key}. "
            f"Disponibles : {', '.join(cfg['collections'])}"
        )
    meta = cfg["collections"][coll_key]
    modele = meta["modele"]

    name = data.get("name")
    if not name:
        raise SystemExit("[prepare_article] Champ 'name' (titre) obligatoire.")
    slug = data.get("slug") or slugify(name)

    fd = {"name": name, "slug": slug}

    # Champs texte simples
    for key in ("h1", "metadescription", "chapo"):
        if data.get(key):
            fd[key] = data[key]
    if data.get("image_alt"):
        fd["alt-image-chapo"] = data["image_alt"]

    # Corps
    if data.get("body"):
        fd["premier-rich-text"] = md_to_html(data["body"])
    if modele == "riche":
        if data.get("table_des_matieres_md") and not meta.get("sans_table_matieres"):
            fd["table-des-matieres"] = md_to_html(data["table_des_matieres_md"])
        if data.get("body2"):
            fd["deuxieme-rich-text"] = md_to_html(data["body2"])
        # CTA inline (boutons de conversion)
        cta_inline = data.get("cta_inline") or {}
        if cta_inline.get("lien"):
            fd["1-er-lien-cta"] = cta_inline["lien"]
        if cta_inline.get("texte"):
            fd["texte-premier-cta"] = cta_inline["texte"]
        if cta_inline.get("lien2"):
            fd["2-e-lien-cta"] = cta_inline["lien2"]
        if data.get("apparition_nos_conseils") is not None:
            fd["apparition-dans-nos-conseils"] = bool(data["apparition_nos_conseils"])
        # Resume optionnel
        if meta.get("champ_resume") and data.get("resume_md"):
            fd[meta["champ_resume"]] = md_to_html(data["resume_md"])
        # Rubrique "nos-conseils" (option)
        if meta.get("champ_rubrique") and data.get("rubrique"):
            fd[meta["champ_rubrique"]] = data["rubrique"]
        # activiter-faq si FAQ fournie
        if data.get("faq"):
            fd["activiter-faq"] = True

    # FAQ -> faq-question-N / faq-reponse-N (borne par nb_faq de la collection)
    faq = data.get("faq") or []
    max_faq = meta.get("nb_faq", 2)
    for idx, item in enumerate(faq[:max_faq], start=1):
        if item.get("q"):
            fd[f"faq-question-{idx}"] = item["q"]
        if item.get("r"):
            fd[f"faq-reponse-{idx}"] = item["r"]

    # Switch CTA standard
    if data.get("cta_colombage") is not None:
        fd["cta-colombage"] = bool(data["cta_colombage"])

    # References (laissees en slug -> a resoudre en ID via MCP par l'appelant)
    needs = {}
    if data.get("categorie"):
        fd["categorie"] = data["categorie"]
        needs["categorie"] = {
            "slug": data["categorie"],
            "collection_id": cfg["sites"][meta["site"]]["theme_collection_id"],
            "field": "categorie",
        }
    if data.get("cta"):
        fd["cta"] = data["cta"]
        needs["cta"] = {
            "slug": data["cta"],
            "collection_id": cfg["sites"][meta["site"]]["cta_collection_id"],
            "field": "cta",
        }
    auteur_field = meta.get("champ_auteur")
    if auteur_field and data.get("auteur"):
        fd[auteur_field] = data["auteur"]
        auteurs_cid = cfg["sites"][meta["site"]]["auteurs_collection_id"]
        needs["auteur"] = {
            "slug": data["auteur"],
            "collection_id": auteurs_cid,
            "field": auteur_field,
        }

    return {
        "collection": coll_key,
        "site": meta["site"],
        "site_id": cfg["sites"][meta["site"]]["site_id"],
        "collection_id": meta["collection_id"],
        "modele": modele,
        "needs_reference_resolution": needs,
        "fieldData": fd,
    }


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
    if len(sys.argv) > 1 and sys.argv[1] not in ("-", "--stdin"):
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        # Lecture binaire + decode UTF-8 (independant de l'encodage console Windows)
        data = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    result = build(data)
    # Sortie toujours en UTF-8 (le JSON est destine au MCP / a un fichier),
    # quel que soit l'encodage par defaut de la console.
    payload = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    sys.stdout.buffer.write(payload.encode("utf-8"))


if __name__ == "__main__":
    main()
