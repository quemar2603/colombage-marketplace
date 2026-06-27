# Snippets HTML embed — ColombAge

> Codes HTML réutilisables à injecter dans le corps d'un article (champs RichText Webflow).
> Le script `scripts/prepare_article.py` remplace automatiquement un marqueur par le contenu
> du fichier `scripts/snippets/<nom>.html` correspondant.

## Mécanisme

Dans le Markdown d'un champ (`body`, `body2`, `table_des_matieres_md`…), insérer un marqueur :

```
{{snippet:nom}}
```

ou avec des paramètres (substitués dans le HTML aux emplacements `${param}`) :

```
{{snippet:nom | titre=Mon titre | lien=https://... | texte=Demander un devis}}
```

Le marqueur est remplacé par le HTML du fichier `scripts/snippets/nom.html`. Le HTML du snippet
est **extrait avant la conversion Markdown puis réinjecté intact** : son code (y compris les blocs
`<style>` et les commentaires CSS) n'est jamais altéré.

**Convention** : placer le marqueur **sur sa propre ligne, entouré de lignes vides** (c'est un bloc,
pas de l'inline).

### Placeholders et valeurs par défaut

Dans un fichier snippet, deux formes de placeholder :
- `${param}` — **requis** : si l'appelant ne le fournit pas, le script s'arrête avec une erreur explicite.
- `${param:defaut}` — **optionnel** : utilise `defaut` si le paramètre n'est pas fourni.

## Snippets disponibles

### `cta-milieu` — ✅ intégré
Bouton CTA / téléchargement au milieu de l'article (classe Webflow `button-primary w-button`).

| Paramètre | Requis | Défaut | Rôle |
|-----------|:------:|--------|------|
| `lien` | ✅ | — | URL du bouton (PDF, page interne, page externe). |
| `texte` | ✅ | — | Libellé du bouton. |
| `target` | — | `_self` | `_self` pour une page interne ColombAge ; `_blank` pour un PDF ou un lien externe. |

Exemples :
```
{{snippet:cta-milieu | lien=/tarifs-et-aides-financieres/apa | texte=Découvrir l'APA}}
{{snippet:cta-milieu | lien=https://.../grille-aggir.pdf | texte=Téléchargez la grille AGGIR | target=_blank}}
```

### `lire-aussi` — ✅ intégré
Encadré de maillage interne « LIRE AUSSI : » avec barre d'accent à gauche (`#4b6385`).

| Paramètre | Requis | Défaut | Rôle |
|-----------|:------:|--------|------|
| `lien` | ✅ | — | URL de l'article lié (généralement une page interne ColombAge). |
| `texte` | ✅ | — | Libellé du lien. |
| `target` | — | `_self` | `_self` pour une page interne ; `_blank` pour un lien externe. |

Exemple :
```
{{snippet:lire-aussi | lien=/tarifs-et-aides-financieres/formulaire-de-demande-apa | texte=Formulaire de demande de l'APA}}
```

### `tableau` — ✅ intégré (automatique)
Pas de marqueur à écrire : **écris simplement un tableau en Markdown standard**, et le script
applique automatiquement le thème ColombAge « gir-table » (en-tête bleu `#304969`, lignes alternées,
coins arrondis, **version responsive** avec `data-label` générés depuis les en-têtes). Le `<style>`
du thème (`scripts/snippets/tableau.html`) est injecté **une seule fois** par champ contenant un tableau.

Exemple Markdown :
```
| Groupe GIR | Description | Besoin |
| --- | --- | --- |
| GIR 1 | Dépendance **totale** | Présence continue |
| GIR 2 | Dépendance physique<br>Ou psychique | Surveillance permanente |
```
- Le **gras**/*italique*/liens dans les cellules sont convertis ; un `<br>` reste tel quel (retour à la ligne dans une cellule).
- La 1re colonne est accentuée (bleu, gras) par le thème.
- Pour modifier le style du thème, éditer `scripts/snippets/tableau.html` (le code n'est pas à toucher).

> Tant qu'un fichier snippet est absent, son marqueur déclenche une erreur explicite listant les
> snippets disponibles.

## Note technique — RichText Webflow et HTML embed (IMPORTANT)

Tout bloc HTML custom (tableau, `<style>`, encart `<div>`, CTA, formulaire, script…) doit être enveloppé
dans le **conteneur d'embed Webflow** pour être **rendu** dans la page. Sans ce wrapper, Webflow affiche
le code **comme du texte brut** (c'était le bug du 1er essai).

Marqueur exact (observé sur les articles ColombAge existants, ex. « grille-aggir ») :

```html
<div data-rt-embed-type='true'> …le code HTML/CSS/JS… </div>
```

`prepare_article.py` **applique ce wrapper automatiquement** à chaque snippet et à chaque tableau converti
(fonction `_wrap_embed`). Le texte courant (titres, paragraphes, listes, liens, gras, `<blockquote>`) reste
hors embed — rendu nativement par le RichText.

⚠️ **Le `<style>` du thème de tableau est inclus DANS l'embed de chaque tableau** (chaque tableau = un embed
autonome `style + table`, comme les snippets cta / lire-aussi). On n'utilise **pas** d'embed `<style>` séparé :
Webflow **ignore un embed qui ne contient qu'un `<style>`** (visuellement vide), donc le CSS ne serait pas chargé.

ℹ️ **Rappel rendu** : les HTML Embed (et leur CSS) ne s'affichent **pas dans le canvas du Designer** Webflow —
uniquement en **Preview** (icône œil) et sur le **site publié**.

### Validé en réel (2026-06-26)

Article brouillon « prix-garde-de-nuit-et-presence-de-nuit » (collection `garde-de-nuit`, item
`6a3ea7b295143d6a6bca1ebc`) :
- L'API CMS **conserve intégralement** le HTML stocké (relu via `list_collection_items`).
- Avec le wrapper `data-rt-embed-type='true'`, les tableaux `gir-table`, encadrés `encadre-lireaussi`,
  le bloc `wrapper_cta_article` et le `<style>` du thème sont reconnus comme **HTML Embed** → rendus.
- Reste à confirmer visuellement dans l'éditeur/preview Webflow.
