# colombage-webflow

Plugin Claude Code pour **créer et modifier des articles dans le CMS Webflow ColombAge** (sites *principal* `colombage-cohabitation.fr` et *Compagnie / SAP* `sap.colombage-cohabitation.fr`).

Le skill `webflow-article` : mise en forme Markdown → HTML, snippets HTML embed (CTA, encadré « LIRE AUSSI », tableau `gir-table`), mapping des champs par collection, règles SEO + style, liens (sources juridiques + maillage interne), et publication **en brouillon** via l'API Webflow ou le MCP.

## Rédaction guidée par la SERP (sous-agent `webflow-redacteur`)

Quand on veut **créer un article sans fournir le texte** (« rédige un article sur X »), le skill délègue
à un sous-agent **`webflow-redacteur`** (modèle Opus, contexte isolé) qui :

1. **recherche la SERP** (s'appuie sur `claude-seo:seo-content-brief` s'il est installé, sinon
   WebSearch/WebFetch des premiers résultats) et renvoie un **brief** (outline, angle, gaps, méta-tags,
   FAQ, liens internes, sources à lier) ;
2. après **validation humaine du brief**, **rédige l'article** et renvoie le JSON d'entrée de
   `prepare_article.py`.

Le skill enchaîne ensuite le pipeline standard (prepare → résolution des références → push **en
brouillon**). Sujet YMYL : aucun chiffre/montant/base légale inventé, sources officielles liées.

## Configuration des tokens Webflow

Deux façons d'autoriser l'écriture dans le CMS. **Choisis-en une.**

### Option 1 — MCP Webflow (recommandé pour l'équipe, zéro secret partagé)
Chaque utilisateur connecte le **MCP Webflow** à son propre compte Webflow (OAuth). Le skill utilise alors la « Voie B » (outils `data_cms_tool`). Aucun token à gérer ni à partager : chacun agit avec ses propres droits.

### Option 2 — Token API + fichier local (pour les scripts `webflow_push.py` / `webflow_get.py`)
Utile pour pousser de gros articles sans recopie. Les scripts résolvent le token automatiquement, dans cet ordre :

1. variable d'environnement `WEBFLOW_API_TOKEN_COMPAGNIE` / `WEBFLOW_API_TOKEN_PRINCIPAL` ;
2. variable d'environnement `WEBFLOW_API_TOKEN` ;
3. fichier local **`skills/webflow-article/scripts/webflow_tokens.json`**.

**Mise en place du fichier local :**
```bash
cd skills/webflow-article/scripts
cp webflow_tokens.example.json webflow_tokens.json
# puis éditer webflow_tokens.json et coller les tokens (clés "compagnie" et "principal")
```

**Générer un token** : Webflow → *Site settings* du site concerné → *Apps & integrations* → *API access* → *Generate API token*, en cochant les scopes **`cms:read` + `cms:write`**. Un token est **propre à un site**.

## ⚠️ Sécurité — à lire

- **Ne jamais committer `webflow_tokens.json`** ni aucun token. Le fichier est déjà **gitignoré** (`**/webflow_tokens.json`). Seul `webflow_tokens.example.json` (sans secret) est suivi par Git.
- **Ne pas mettre les tokens dans le code, le SKILL, ou un fichier versionné**, même dans un repo privé : l'historique Git les conserverait définitivement et tout collaborateur y aurait accès.
- **Partage entre membres** : transmettez les tokens via un **canal sécurisé** (gestionnaire de secrets, message éphémère chiffré), jamais par chat ni par Git. Chaque membre place sa copie dans son `webflow_tokens.json` local. *(Le plus simple reste l'Option 1 — MCP — qui évite tout partage de secret.)*
- En cas de **fuite d'un token** (par ex. collé dans une conversation), **révoquez-le** dans Webflow (*API access*) et régénérez-en un nouveau.

## Publication

Le skill crée/met à jour toujours **en brouillon** (`isDraft: true`). La publication sur le site live reste un geste humain (relecture en *Preview* puis publication), ou un appel explicite séparé.
