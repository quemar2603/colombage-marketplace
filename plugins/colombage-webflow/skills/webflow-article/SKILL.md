---
name: webflow-article
description: >
  Ce skill doit être utilisé dès que l'utilisateur veut créer, rédiger, pousser, OU MODIFIER /
  METTRE À JOUR / CORRIGER / ENRICHIR un article / une page éditoriale / un billet de blog / une page
  de service ou de conseils dans le CMS Webflow de ColombAge — sites "principal"
  (colombage-cohabitation.fr) ou "Compagnie / SAP" (sap.colombage-cohabitation.fr). Déclencheurs
  typiques : « crée un article Webflow », « publie ce texte sur Nos Conseils », « ajoute une page aide
  ménagère », « modifie l'article X », « mets à jour la page garde de nuit », « corrige / enrichis /
  complète cet article », « ajoute un paragraphe / un tableau / des liens à la page Y », « pousse ce
  contenu dans le CMS ColombAge ». Le skill couvre la CRÉATION — soit à partir d'un contenu Markdown
  fourni (relecture SEO + style, conversion HTML, snippets, mapping des champs), soit en RÉDACTION
  guidée par la recherche SERP quand l'utilisateur ne fournit pas le texte (« rédige un article sur X »,
  « écris-moi la page Y », « crée un article sur tel sujet ») via le sous-agent `webflow-redacteur` —
  ET la MODIFICATION d'un article existant (localiser l'item, éditer son contenu, repousser en
  brouillon). Utilise ce skill même si l'utilisateur ne dit pas explicitement « Webflow » mais parle
  d'un article/contenu/page pour le site ColombAge.
metadata:
  version: "0.3.0"
---

# Création et modification d'articles Webflow ColombAge

Créer **ou modifier** un contenu rédactionnel dans la bonne collection CMS Webflow de ColombAge, **en brouillon**, en respectant les règles SEO et de style de la marque.

## Principes (à garder en tête tout du long)

1. **Deux voies d'écriture** : (a) le **script `scripts/webflow_push.py`** (API Data v2, nécessite `WEBFLOW_API_TOKEN`) — **recommandé** dès que le rich text est volumineux ; (b) le **MCP Webflow** (`data_cms_tool`) — pratique pour un petit contenu ou sans token. Les transformations déterministes (slug, Markdown→HTML, snippets, mapping) passent par `scripts/prepare_article.py`. Lecture d'un item existant : `scripts/webflow_get.py` (ou le MCP).
2. **Brouillon uniquement** : ce skill crée/met à jour toujours en draft (`isDraft: true`). La publication sur le site live reste un **geste humain** (ou un appel explicite séparé demandé par l'utilisateur). Ne jamais publier de soi-même.
3. **Mise en forme, pas rédaction (sauf demande)** : par défaut, l'utilisateur fournit le contenu ; le rôle du skill est de relire/nettoyer (règles ci-dessous), structurer et pousser. Si une information factuelle manque (montant, source, base légale), la **vérifier** (sous-agents de veille / web) ou la **demander** plutôt que l'inventer.
4. **Deux sites, schémas différents** : un même nom de collection existe parfois sur les deux sites avec des IDs différents. Toujours raisonner par couple (site, collection).
5. **Ne jamais casser l'existant** : en modification, ne change **pas le `slug`** d'un article publié sans raison explicite (cela casse tous les liens entrants) ; ne pousse **que les champs voulus** (un PATCH partiel ne modifie que les champs envoyés) ; conserve les blocs HTML embed existants (`data-rt-embed-type='true'`).

## Fichiers de référence (à lire selon le besoin)

| Fichier | Quand le lire |
|---------|---------------|
| `references/structure-cms-colombage.md` | Pour choisir le site + la collection cible, connaître les champs exacts, les IDs, et la liste des articles existants. **À consulter au début.** |
| `references/regles-seo-contenu.md` | Avant de finaliser le contenu : title/meta, structure Hn, densité mots-clés, profondeur, E-E-A-T, citabilité IA (AEO/GEO), maillage interne. |
| `references/regles-style-humanizer.md` | Pendant la relecture : éliminer les tics d'écriture IA, garder un ton ColombAge naturel et orienté service. |
| `references/snippets-html.md` | Pour insérer un CTA en milieu de page, un encadré « LIRE AUSSI », un tableau (auto). Décrit les marqueurs `{{snippet:...}}` et le **format embed Webflow** (`data-rt-embed-type='true'`). |
| `scripts/collections.json` | Carte machine des collections éditoriales (IDs, modèle simple/riche, nom du champ auteur, nb de FAQ). Utilisé par le script. |
| `scripts/prepare_article.py` | Prépare le contenu : slug, Markdown→HTML, snippets, tableaux `gir-table`, mapping des champs. |
| `scripts/webflow_get.py` / `scripts/webflow_push.py` | Lire un article existant (par slug/id) / créer ou mettre à jour un item en draft via l'API (token `WEBFLOW_API_TOKEN`). |
| Sous-agent `webflow-redacteur` (`agents/webflow-redacteur.md`) | Quand l'utilisateur veut **créer un article sans fournir le contenu** : recherche SERP + rédaction. Voir « Rédaction guidée par la SERP ». |

## Workflow

### Étape 1 — Identifier le site et la collection cible

Lis `references/structure-cms-colombage.md` et détermine, avec l'utilisateur si besoin :
- **Le site** : éditorial seniors / vie quotidienne / cohabitation → souvent le **principal** ; services à la personne, aides financières, conseils SAP → souvent **Compagnie**.
- **La collection** : choisis la collection dont le sujet correspond (ex. un article sur l'aide ménagère → collection `aide-menagere` ; un conseil transverse santé/droits → `nos-conseils` ; un contenu loisirs seniors → `bonnes-idees`).

Si le choix est ambigu, **propose 1-2 options et demande confirmation**. Note la clé de collection telle qu'elle figure dans `scripts/collections.json`.

### Étape 2 — Recueillir le contenu

**Deux cas selon que l'utilisateur fournit ou non le texte :**

- **Contenu fourni** (l'utilisateur donne le Markdown / un brief / un fichier) → recueille les éléments
  ci-dessous et continue normalement (étapes 3+).
- **Création rédigée** (l'utilisateur veut un article **sans fournir le contenu** : « rédige un article
  sur X », « écris-moi la page Y ») → passe par le **sous-agent `webflow-redacteur`** (voir la section
  « Rédaction guidée par la SERP » ci-dessous). Le sous-agent produit le brief puis le JSON d'entrée ;
  reviens ensuite ici pour les étapes 4+.

Récupère auprès de l'utilisateur (ou du fichier/brief fourni) :
- **Titre SEO** (`name`, balise title), **H1**, **chapô**, **méta description**.
- **Corps** de l'article en Markdown (`body`), et le cas échéant une **2ᵉ partie** (`body2`, modèle riche), un **résumé**. (Ne pas recueillir ni produire de sommaire : la table des matières est déjà gérée côté Webflow — voir Garde-fous.)
- **FAQ** (liste de questions/réponses).
- **Catégorie/thème** (slug d'un thème existant), **auteur** (slug, ex. `marc-pezeril`), **CTA** éventuel (slug), boutons CTA inline.
- **Image principale** : l'upload d'image se fait dans l'éditeur Webflow ; côté API on renseigne surtout `alt-image-chapo`. Si une image est fournie, le préciser à l'utilisateur (à attacher manuellement ou via le tool asset du MCP).

### Étape 3 — Relire et optimiser le contenu

Avant la mise en forme, applique :
- Les **règles SEO** (`references/regles-seo-contenu.md`) : vérifie title 50-60 car., méta 130-150 car., présence d'un H1 unique, hiérarchie H2/H3, réponse directe en début de section (citabilité IA), densité du mot-clé raisonnable (0,5-2 %), maillage interne (3-5 liens internes / 1 000 mots), FAQ utile.
- Les **règles de style** (`references/regles-style-humanizer.md`) : supprime les tics IA, garde un ton clair, bienveillant, concret, orienté service.

**Liens — à ne jamais oublier (règle ColombAge, obligatoire) :**
- **Sources juridiques** : chaque loi, article de code, décret, ou **convention collective** cité dans l'article doit être **lié vers sa source officielle** — Légifrance (`legifrance.gouv.fr`) ou la fiche `service-public.fr` correspondante. Exemple : « la convention collective des particuliers employeurs (IDCC 3239) » → poser un lien vers le texte de cette convention sur Légifrance. Idem pour un article de loi, un décret, un montant réglementaire (APA, crédit d'impôt…).
- **Liens internes dans le corps du texte** : insère des **liens internes contextuels directement dans les phrases** (et pas seulement dans les encadrés « LIRE AUSSI »), vers les pages et articles ColombAge pertinents (aides, services, autres conseils). Mets le lien sur l'expression naturelle (« l'APA », « l'aide à la toilette »…), en visant le maillage de **3 à 5 liens internes / 1 000 mots** des règles SEO.
- En pratique (Markdown), ces liens s'écrivent `[texte ancre](url)` directement dans le texte ; ils sont convertis en `<a>` par le script. Les liens internes sont des chemins relatifs (`/nos-conseils/...`, `/tarifs-et-aides-financieres/...`) ; vérifie que la page cible existe.

Propose les corrections à l'utilisateur si elles changent le fond. Les corrections de pure forme peuvent être appliquées directement.

### Étape 4 — Préparer le payload (script local)

Construis un JSON d'entrée conforme au format documenté en tête de `scripts/prepare_article.py` (clé `collection`, `name`, `slug` optionnel, `body`, `faq`, `categorie`, `auteur`, etc.), puis lance :

```bash
python scripts/prepare_article.py entree.json
```

(ou via stdin : `echo '<json>' | python scripts/prepare_article.py`).

Le script renvoie un JSON avec : `collection_id`, `site_id`, `fieldData` (champs prêts, corps déjà en HTML, snippets injectés) et `needs_reference_resolution` (les références encore exprimées en **slug**).

> **Snippets HTML** (voir `references/snippets-html.md` pour les paramètres exacts) :
> - **CTA en milieu de page** : `{{snippet:cta-milieu | lien=... | texte=... | target=_self|_blank}}`
> - **Encadré « LIRE AUSSI »** (maillage interne) : `{{snippet:lire-aussi | lien=... | texte=...}}`
> - **Tableau** : pas de marqueur — écris un **tableau Markdown standard**, le thème ColombAge (`gir-table`, responsive) est appliqué automatiquement.
> Le script préserve le HTML des snippets intact et place le marqueur sur sa propre ligne (entouré de lignes vides).

### Étape 5 — Résoudre les références (slug → ID) via le MCP

Pour chaque entrée de `needs_reference_resolution` (catégorie, auteur, CTA), récupère l'**ID de l'item** correspondant au slug avec le MCP Webflow :

```
data_cms_tool > list_collection_items (collection_id = <celui indiqué>, request: { slug: "<slug>" })
```

Remplace dans `fieldData` la valeur slug par l'**ID** de l'item trouvé. Si le slug n'existe pas (ex. thème ou auteur absent), **signale-le à l'utilisateur** et propose de créer le thème/auteur d'abord ou de retirer la référence. Ne jamais inventer un ID.

### Étape 6 — Créer / mettre à jour l'item en BROUILLON

Deux voies. **Préférer le script API dès que le rich text est volumineux** (un article complet avec tableaux/snippets fait > 10 Ko, et le recopier dans un appel MCP est lent et faillible).

**Voie A — Script API `webflow_push.py` (recommandée pour les articles complets)**
Le token est **résolu automatiquement** par `scripts/webflow_auth.py` : variable d'env `WEBFLOW_API_TOKEN_COMPAGNIE` / `WEBFLOW_API_TOKEN_PRINCIPAL`, sinon `WEBFLOW_API_TOKEN`, sinon le fichier local **`scripts/webflow_tokens.json`** (gitignoré ; copie de `webflow_tokens.example.json`). Le bon token est choisi selon le site (déduit du `collection_id`). Scopes requis : `cms:read` + `cms:write`. Le script lit le payload depuis un fichier et l'envoie directement — aucune recopie.

```bash
# request.json = { "collection_id": "...", "item_id": "...(optionnel: présent => update)", "isDraft": true, "fieldData": {...refs résolues...} }
python scripts/webflow_push.py request.json
```
Sans `item_id` → création ; avec `item_id` → mise à jour. Toujours `isDraft: true`. Configuration des tokens : voir le **README** du plugin. **Ne jamais committer `webflow_tokens.json`.**

**Voie B — MCP `data_cms_tool` (pour un petit contenu / sans token)**
```
data_cms_tool > create_collection_items
  collection_id = <collection_id>
  request: { fieldData: <fieldData résolu>, isDraft: true }
```

Dans les deux cas, l'item est créé/mis à jour **en draft** (non publié). **Ne pas** enchaîner sur une publication sans demande explicite.

### Étape 7 — Rendre compte

Confirme à l'utilisateur :
- la collection et le site cibles,
- le `name`, le `slug` final (et l'URL probable : `https://<domaine>/<slug-collection>/<slug>`),
- l'`itemId` créé,
- le statut **brouillon**,
- les références résolues / non résolues,
- le rappel : **relire dans l'éditeur Webflow, attacher l'image principale si besoin, puis publier manuellement**.

## Rédaction guidée par la SERP (sous-agent `webflow-redacteur`)

Quand l'utilisateur veut **créer un article mais ne fournit pas le contenu**, ne rédige pas à l'aveugle :
délègue la recherche SERP + la rédaction au sous-agent `webflow-redacteur` (modèle Opus, contexte
isolé). Toi (skill) tu restes l'orchestrateur : tu présentes le brief, tu valides avec l'utilisateur,
puis tu formates et pousses (étapes 4-6). Le sujet est **YMYL** : aucun chiffre/montant/base légale ne
doit être inventé.

### R1 — Préparer le dispatch
Détermine d'abord le **site + la collection** cible (Étape 1) et le **mot-clé/sujet**. Récupère les
**chemins absolus** des références à passer au sous-agent (elles sont sous le dossier de ce skill) :
`references/regles-seo-contenu.md`, `references/regles-style-humanizer.md`, `references/snippets-html.md`,
`references/structure-cms-colombage.md`, et `scripts/prepare_article.py`.

### R2 — Phase brief (1er appel du sous-agent)
Lance le sous-agent (outil Agent, `subagent_type: "webflow-redacteur"`) avec un prompt contenant :
`phase: brief`, le `site`+`collection` (nom + collection_id), le `sujet`/mot-clé, les chemins absolus
des références, et — **en cas de modification** — l'`url_existante` + le `fieldData` courant (mode
*improve*). Le sous-agent renvoie un **brief structuré** (outline, angle, gaps, méta-tags, plan FAQ,
liens internes ciblés, sources à lier, points YMYL à confirmer).

### R3 — Validation humaine du brief
**Présente le brief à l'utilisateur** et recueille ses ajustements. Ne passe pas à la rédaction sans
son accord. C'est le point de contrôle imposé.

### R4 — Phase rédaction (2e appel, même sous-agent)
Renvoie le **brief validé** au **même** sous-agent via SendMessage (il conserve ainsi sa recherche SERP
en contexte) avec `phase: redaction`. Il renvoie le **JSON d'entrée exact attendu par
`prepare_article.py`** (corps en Markdown, marqueurs de snippets, FAQ, références en **slug**).

### R5 — Reprendre le pipeline standard
Avec ce JSON, enchaîne les **étapes 4 à 7** : `prepare_article.py` → résolution des références
(slug→ID) → `webflow_push.py` en **draft** → rendre compte. Rien n'est publié automatiquement.

> Le sous-agent applique déjà les règles SEO, style/humanizer et liens, mais **revérifie** avant de
> pousser : sources juridiques liées, maillage interne vers des pages existantes, pas de sommaire.

## Modifier un article existant

Quand l'utilisateur veut **éditer / corriger / enrichir / mettre à jour** un article déjà présent (pas en créer un neuf) :

### M1 — Localiser l'item
Identifie le site + la collection (référence CMS), puis récupère l'item :
- Script : `WEBFLOW_API_TOKEN=… python scripts/webflow_get.py <collection_id> --slug <slug>` (ou `--id <item_id>`, ou `--list` pour retrouver le bon slug).
- Ou MCP : `data_cms_tool > list_collection_items` avec `{ slug: "<slug>" }`.

Note l'`item_id` et **récupère le `fieldData` actuel** — en particulier le rich text, qui est **déjà du HTML Webflow** (avec ses blocs `data-rt-embed-type='true'`), pas du Markdown.

### M2 — Analyser le SERP avant de proposer un enrichissement (OBLIGATOIRE pour tout enrichissement)
Dès que la demande est d'**enrichir / compléter / améliorer** un article (et pas une simple correction de forme), **ne propose jamais de changements « à l'aveugle ».** Va d'abord voir **ce que classent les premiers résultats** sur le mot-clé cible, puis comble les manques.

1. **Identifie le mot-clé principal** de l'article (depuis le `name`/`h1`/`slug`).
2. **Consulte les premiers résultats Google** pour ce mot-clé (et 1-2 variantes / questions associées) via `WebSearch`, puis ouvre les **3 à 5 premières pages** avec `WebFetch`.
3. **Relève ce qu'elles couvrent et que l'article ne couvre pas** : sous-thèmes / sections (H2) manquants, questions « People Also Ask », chiffres et montants à jour, tableaux comparatifs, définitions, cas pratiques, sources officielles citées, angles non traités.
4. **Propose les enrichissements à partir de ces manques**, en respectant la **règle de pertinence au site** (`references/regles-seo-contenu.md` §8 : ne suggérer que ce que ColombAge peut crédiblement traiter) et le **gain d'information** (apporter mieux/plus précis que l'existant, pas du remplissage).
5. **Rends compte du gap analysé** à l'utilisateur (ce que couvrent les tops, ce qui manque, ce que tu proposes d'ajouter) **avant** d'écrire, puis applique selon M3.

> Cette analyse SERP est le préalable de tout enrichissement. Une correction purement formelle (faute, lien mort, chiffre erroné déjà connu) n'en a pas besoin.

### M3 — Choisir le mode d'édition
- **Édition ciblée** (ajouter un lien, un paragraphe, un tableau, corriger une phrase, mettre à jour un chiffre) → **travaille directement sur le HTML existant** récupéré en M1. Pour insérer un nouveau bloc HTML (tableau, CTA, encadré), respecte le format embed : `<div data-rt-embed-type='true'>…</div>` (voir `references/snippets-html.md`). Tu peux générer un bloc isolé avec `prepare_article.py` (rédige le fragment en Markdown, récupère le HTML produit) puis l'insérer au bon endroit du HTML existant. **Ne ré-encode pas** le HTML déjà en place.
- **Réécriture complète** (l'utilisateur réécrit tout l'article) → repars d'un Markdown, passe par `prepare_article.py`, et pousse en **update** (avec `item_id`). Attention : cela remplace le contenu existant.

### M4 — Pousser la mise à jour (PATCH partiel, en draft)
Construis un payload ne contenant **que les champs modifiés** (un PATCH ne touche pas les champs absents). Conserve le `slug` existant (ne le renvoie pas, ou renvoie-le **inchangé**).
```bash
# request.json = { "collection_id": "...", "item_id": "...", "isDraft": true, "fieldData": { "premier-rich-text": "<html modifié>", ... } }
WEBFLOW_API_TOKEN=xxxxx python scripts/webflow_push.py request.json
```
Ou MCP : `data_cms_tool > update_collection_items` avec `{ items: [{ id, isDraft: true, fieldData: {…champs modifiés…} }] }`.

### M5 — Rendre compte
Indique l'`item_id`, les champs modifiés, le statut **brouillon**, et rappelle de **relire en Preview** puis publier manuellement.

> Applique aussi en modification les **règles de liens** (sources juridiques liées, liens internes contextuels) et les règles SEO/style ci-dessus.

## Garde-fous

- **Sommaire / table des matières : NE JAMAIS y toucher.** Le sommaire est **déjà présent** (géré côté template/page Webflow, pas dans le contenu de l'article). Ne renseigne ni ne modifie **jamais** le champ `table-des-matieres`, n'ajoute pas d'ancres (`id`) sur les H2 pour construire un sommaire, et ne propose pas d'en créer un. Ce n'est pas le rôle de ce skill, en création comme en modification.
- **Jamais de publication automatique.** Création/mise à jour en draft, point.
- **En modification** : ne jamais changer le `slug` d'un article publié sans accord explicite (liens morts) ; ne pousser que les champs voulus ; préserver les blocs HTML embed existants.
- **Pas d'invention factuelle** : montants d'aides, dates, sources → demander si absent.
- **Vérifier la fraîcheur des IDs** : `scripts/collections.json` est un instantané (2026-06-26). En cas de doute (collection récente, erreur d'ID), re-synchroniser avec `get_collection_list` / `get_collection_details`.
- **Champ auteur** : son slug varie (`auteur` vs `auteurs`) selon la collection — le script s'en charge via `collections.json`, ne pas le forcer à la main.
