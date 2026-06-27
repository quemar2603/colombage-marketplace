# Design — Sous-agent rédacteur pour `webflow-article`

**Date** : 2026-06-27
**Statut** : validé (design), en attente du plan d'implémentation
**Plugin concerné** : `colombage-webflow` (v0.2.0)

## Problème

Le skill `webflow-article` sait **formater et pousser** un contenu dans le CMS Webflow ColombAge
et impose les règles ColombAge (SEO, style/humanizer, snippets, liens, mapping des champs). Mais il
ne **rédige pas** : par défaut l'utilisateur fournit le contenu. Marc veut pouvoir demander la
**création d'un article à partir d'un simple sujet**, avec un contenu décidé par la **recherche SERP**
(ce que classent les premiers résultats Google) plutôt qu'à l'aveugle.

## Décisions cadrées (brainstorming)

| Décision | Choix retenu | Raison |
|----------|--------------|--------|
| Portée de la capacité | **Uniquement Webflow** | Le contenu rédigé finit toujours dans le CMS → pas de skill autonome à chaîner. |
| Packaging | **Sous-agent intégré au skill** (pas un skill séparé) | La rédaction est une étape interne de « créer un article Webflow », pas une intention utilisateur distincte ; un sous-agent isole la recherche SERP lourde du contexte principal. |
| Point de contrôle | **Brief → validation humaine → rédaction** | Sujet YMYL (santé/finances de seniors) : valider l'angle et l'outline avant d'écrire. |
| Couplage à `claude-seo` | **Souple** : s'appuie sur `claude-seo:seo-content-brief` si présent, sinon fallback SERP autonome | Pas de dépendance dure à un autre plugin de marketplace (fragile). |

## Architecture

Nouvel **agent de plugin** : `colombage-webflow:webflow-redacteur`, fichier
`plugins/colombage-webflow/agents/webflow-redacteur.md` (nouveau dossier `agents/`).

- Ce n'est **pas un skill** : aucun déclencheur propre. Il est **dispatché par le skill**
  `webflow-article` via l'outil Agent.
- Le skill `webflow-article` gagne un **mode amont** : « Création rédigée (recherche SERP) »,
  déclenché quand l'utilisateur veut un article **sans fournir le contenu**
  (« rédige un article sur X », « écris-moi la page Y »).
- Le skill **orchestre** ; le sous-agent **produit** (brief puis draft) ; le skill **formate et
  pousse** (étapes 4-6 actuelles inchangées).

### Pourquoi un sous-agent et pas du inline

La recherche SERP (WebSearch + 3-5 WebFetch) est lourde et pollue le contexte de la conversation.
L'isoler dans un sous-agent garde la conversation principale propre : il ne renvoie que le **brief**,
puis le **draft** structuré.

## Composants

### 1. Agent `webflow-redacteur` (nouveau)

- **Fichier** : `plugins/colombage-webflow/agents/webflow-redacteur.md`
- **Modèle** : **Opus** (`claude-opus-4-8`) — sujet YMYL (santé/finances de seniors), la qualité
  rédactionnelle et la rigueur factuelle priment sur le coût/la vitesse.
- **Outils** : `WebSearch`, `WebFetch`, `Read`, `Glob`, `Grep`, `Skill` (pour invoquer
  `claude-seo:seo-content-brief` si dispo), `Write` (écrire le brief/draft dans le scratchpad).
- **Connaissances injectées** (le prompt pointe vers les `references/` du skill) :
  - `references/regles-seo-contenu.md` (title/méta, Hn, densité, E-E-A-T, AEO/GEO, maillage, règle de
    pertinence au site §8)
  - `references/regles-style-humanizer.md` (ton ColombAge, anti-tics IA)
  - `references/snippets-html.md` (marqueurs `{{snippet:...}}`)
  - `references/structure-cms-colombage.md` (cibles de liens internes réelles, champs de la collection)
  - le format d'entrée documenté en tête de `scripts/prepare_article.py`

### 2. Évolution du skill `webflow-article`

- Nouvelle section « Création rédigée (recherche SERP) » décrivant le dispatch du sous-agent,
  le point de contrôle au brief, et le renvoi du brief validé.
- Mise à jour de la `description` (déclencheurs : « rédige un article sur… », « écris-moi la page… »).
- Les étapes 4-6 (prepare → résolution refs → push draft) restent la cible du JSON produit.

### 3. Couplage `claude-seo`

Le sous-agent suit la **méthodologie** de `claude-seo:seo-content-brief` (top 5 concurrents filtrés,
scoring depth/format/SEO/UX, gaps topic/depth/quality, densité de mots-clés, méta-tags, intent). Il
**invoque** ce skill si le plugin est installé ; sinon il refait la SERP lui-même
(WebSearch + WebFetch). Par-dessus, il applique systématiquement les règles **ColombAge** (pertinence
au site, liens internes vers de vraies pages, sources juridiques liées, style/humanizer).

## Flux de données

1. Skill `webflow-article` → **dispatch** `webflow-redacteur` avec
   `{ site, collection, mot-clé/sujet, url_existante? }`.
2. **Sous-agent — phase brief** : SERP + analyse des gaps → renvoie un **brief structuré**
   (outline H2/H3 avec word counts, angle / information gain, méta-tags, plan FAQ, liens internes
   ColombAge ciblés, sources à citer).
3. Skill **présente le brief à l'utilisateur** → **validation / ajustements**.
4. Skill **renvoie le brief validé au même sous-agent** (via SendMessage, pour conserver sa recherche
   SERP en contexte) → **phase rédaction**.
5. Sous-agent renvoie le **JSON d'entrée exact attendu par `prepare_article.py`** :
   `collection`, `name`, `slug?`, `h1`, `chapo`, `metadescription`, `body` (Markdown avec marqueurs
   `{{snippet:...}}` et liens `[ancre](url)`), `faq[]`, `categorie`, `auteur`, etc.
   → c'est l'**interface propre** entre rédaction et mise en forme.
6. Skill : `prepare_article.py` → résolution des références (slug→ID via MCP) → `webflow_push.py` en
   **draft**. Publication = geste humain.

### Cas « modification » (réécriture / enrichissement)

Pour un article existant, le sous-agent reçoit en plus l'**URL existante** et le `fieldData` courant.
Il fonctionne en *improve mode* : garder ce qui est fort, combler les manques. Le slug reste
**inchangé**.

## Gestion des erreurs / garde-fous (hérités du skill)

- **SERP injoignable** : rapporter, ne pas inventer le contenu concurrent.
- **Faits YMYL** (montants APA, crédit d'impôt 50 %, bases légales) : sourcés et **liés** (Légifrance /
  service-public), ou demandés — jamais inventés.
- **Sommaire / table des matières** : ne jamais y toucher (géré côté template Webflow).
- **Publication** : toujours en **draft**, jamais de publication automatique.
- **Modification** : slug inchangé, PATCH partiel (champs voulus uniquement), blocs embed préservés.

## Validation (à défaut de tests unitaires sur un agent)

- Le JSON produit par la phase rédaction **passe `prepare_article.py` sans erreur** (champs mappés,
  HTML généré, snippets injectés).
- Sur un sujet réel (ex. l'article « Comment trouver une bonne auxiliaire de vie ? »), le brief
  couvre les gaps réels des tops SERP et l'article respecte densité, maillage 3-5 liens/1000 mots,
  règle de pertinence, ton humanizer.
- Le couplage `claude-seo` dégrade proprement si le plugin est absent (fallback SERP autonome).

## Hors périmètre (YAGNI)

- Pas de skill de rédaction autonome réutilisable hors Webflow.
- Pas de génération d'image (reste un geste éditeur Webflow).
- Pas de publication automatique.
- Pas de mode « rédaction directe sans brief » dans cette itération (le point de contrôle au brief
  est imposé).
