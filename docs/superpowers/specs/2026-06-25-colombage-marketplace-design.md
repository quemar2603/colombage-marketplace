# Design — colombage-marketplace

**Date:** 2026-06-25
**Auteur:** Marc (ColombAge) + Claude
**Statut:** validé (en attente relecture spec)

## But

Un **plugin marketplace Claude Code** hébergé sur `github.com/quemar2603/colombage-marketplace`
(repo **privé**), que chaque membre de l'équipe ColombAge branche via :

```
/plugin marketplace add quemar2603/colombage-marketplace
```

puis installe **à la carte** les plugins dont son rôle a besoin.

## Emplacement

- Repo local : `C:\Users\marcp\Documents\dev\colombage-marketplace`
- Les skills sources restent dans `~/.claude/skills` et `~/.claude/agents`.
  Le repo en contient une **copie snapshot** (re-sync manuel pour v0.1.0 ;
  un script de sync pourra venir plus tard).

## Structure

```
colombage-marketplace/
├─ .claude-plugin/
│  └─ marketplace.json            # déclare les 4 plugins
├─ README.md                      # quoi/pourquoi + install + tableau des plugins
├─ .gitignore                     # exclut données réelles (company.json, etc.)
├─ docs/superpowers/specs/        # ce document
└─ plugins/
   ├─ colombage-brand/
   │  ├─ .claude-plugin/plugin.json
   │  └─ skills/
   │     ├─ colombage-brand/      # ex-"Colombage brand" (dossier renommé, sans espace)
   │     └─ colombage-design/
   ├─ colombage-veille/
   │  ├─ .claude-plugin/plugin.json
   │  ├─ skills/veille/
   │  └─ agents/                  # veille-marche, veille-cout-travail,
   │                              # veille-reste-a-charge, veille-signaux
   ├─ colombage-compta-juridique/
   │  ├─ .claude-plugin/plugin.json
   │  └─ skills/
   │     ├─ comptable/
   │     ├─ commissaire-aux-comptes/
   │     ├─ controleur-fiscal/
   │     ├─ notaire/
   │     └─ syndic/
   └─ agricidaniel-seo/           # plugin tiers MIT, copié tel quel
      ├─ .claude-plugin/plugin.json
      ├─ LICENSE                  # MIT, attribution AgriciDaniel conservée
      ├─ skills/ (25)
      ├─ agents/ (18)
      └─ (hooks/, scripts/, etc. selon dépendances du plugin)
```

## Contenu des plugins

| Plugin | Skills | Agents | Source |
|---|---|---|---|
| `colombage-brand` | Colombage brand, colombage-design | — | custom ColombAge |
| `colombage-veille` | veille | veille-marche, veille-cout-travail, veille-reste-a-charge, veille-signaux | custom ColombAge |
| `colombage-compta-juridique` | comptable, commissaire-aux-comptes, controleur-fiscal, notaire, syndic | — | custom ColombAge |
| `agricidaniel-seo` | claude-seo (25 sous-skills) | 18 sous-agents | tiers, MIT (AgriciDaniel) |

## Confidentialité (point clé)

- **Ne copier que** les fichiers `*.example.json`.
- Le fichier **`comptable/company.json`** (vraies données financières ColombAge)
  est **exclu** et listé dans `.gitignore`.
- Repo **privé** (skills métier + contexte interne).
- RGPD : aucune donnée senior/famille ne doit se retrouver dans le repo.

## Licence & attribution

- Repo ColombAge : skills custom = propriété ColombAge.
- `agricidaniel-seo` : licence **MIT** conservée intégralement (fichier LICENSE +
  copyright `agricidaniel`), auteur non modifié dans `plugin.json` et `marketplace.json`.

## Détails d'implémentation

- `Colombage brand` (dossier avec espace) → renommé `colombage-brand` dans le repo.
  Le `name:` du frontmatter SKILL.md est conservé (c'est le déclencheur d'invocation).
- Chaque `plugin.json` custom : `name`, `description`, `version` `0.1.0`,
  `author` = `ColombAge`.
- `marketplace.json` : `name` = `colombage-marketplace`, owner ColombAge,
  4 entrées `plugins[]` avec `source` pointant vers `./plugins/<nom>`.
- `README.md` : pitch, tableau des plugins, commande d'install, note licence MIT.

## Étapes (haut niveau)

1. Scaffold arborescence + `.gitignore`.
2. Copier les skills custom (en excluant `company.json` réel).
3. Renommer le dossier brand.
4. Copier le plugin `agricidaniel-seo` (skills + agents + LICENSE + dépendances).
5. Écrire les 4 `plugin.json` + `marketplace.json` + `README.md`.
6. `git init`, commit `ColombAge marketplace v0.1.0`, branche `main`.
7. Créer le repo privé GitHub (`gh repo create`) si absent, ajouter le remote, push.

## Pré-requis à vérifier à l'exécution

- `git` et `gh` installés, `gh auth` connecté (ou clé SSH GitHub active).
- Existence du repo `quemar2603/colombage-marketplace` côté GitHub.
