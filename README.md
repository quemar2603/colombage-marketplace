# colombage-marketplace

Marketplace de **skills Claude Code** pour l'équipe ColombAge. Chacun installe à la carte
les plugins dont son rôle a besoin.

## Installation

Dans Claude Code :

```
/plugin marketplace add quemar2603/colombage-marketplace
/plugin install <nom-du-plugin>@colombage-marketplace
```

Puis redémarrer Claude Code si besoin.

## Plugins disponibles

| Plugin | Contenu | Pour qui |
|---|---|---|
| **colombage-brand** | `colombage-brand` (DA, charte v2), `colombage-design` (design system, UI kit) | Marketing, créa, toute production visuelle |
| **colombage-veille** | `veille` + 4 agents (marché, coût du travail, reste à charge, signaux) | Croissance / veille SAP |
| **colombage-compta-juridique** | `comptable`, `commissaire-aux-comptes`, `controleur-fiscal`, `notaire`, `syndic` | Gestion, compta, juridique |
| **claude-seo** | 25 skills + 18 agents SEO (technique, E-E-A-T, schema, GEO, local…) | SEO / marketing |
| **crawl4ai** | `crawl4ai` (web crawling & extraction de données : scraping, pages JS, multi-URL, pipelines) | Data / dev / veille |

### Exemples

```
/plugin install colombage-brand@colombage-marketplace
/plugin install colombage-veille@colombage-marketplace
/plugin install colombage-compta-juridique@colombage-marketplace
/plugin install claude-seo@colombage-marketplace
```

## Confidentialité (RGPD)

- Ce repo est **privé**. Il ne doit contenir **aucune donnée senior/famille**.
- Les données réelles d'entreprise (`company.json`, etc.) sont **exclues** via `.gitignore` :
  seuls les fichiers `*.example.json` servent de modèle. Configure tes propres données
  **en local**, après installation, sans les versionner.

## Mise à jour des skills

Les plugins sont des **copies snapshot** des skills ColombAge (`~/.claude/skills`).
Après modification d'un skill source, re-synchroniser le dossier correspondant dans
`plugins/`, bumper la `version` du `plugin.json`, puis commit + push.

## Crédits & licence

- Plugins `colombage-*` : © ColombAge.
- Plugin **claude-seo** : © AgriciDaniel — licence **MIT**
  (voir `plugins/agricidaniel-seo/LICENSE`), redistribué ici sans modification d'attribution.
