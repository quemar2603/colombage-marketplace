---
name: veille
description: Lance la veille ColombAge (concurrence + réglementaire SAP) via 4 sous-agents spécialisés. Utiliser quand Marc dit "lance la veille", "/veille", "veille concurrentielle", "veille réglementaire", "quoi de neuf chez les concurrents", ou lors du passage hebdo planifié.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - mcp__claude_ai_Slack__slack_search_channels
  - mcp__claude_ai_Slack__slack_send_message_draft
---

<objective>
Produire la veille hebdo ColombAge en orchestrant 4 agents, en ne remontant que les changements depuis le dernier passage. Sortie : rapport daté + MAJ fiche-hub + MAJ état de référence + brouillon Slack sur #veille-colombage.

L'idée centrale : `etat-reference.md` est la **mémoire du dernier passage**. On la donne aux agents pour qu'ils repèrent uniquement le NOUVEAU (le diff), puis on la réécrit avec l'état du jour. Tout le reste sert cette boucle.
</objective>

<steps>

1. **Contexte & date.** Lis `00 Fondations/_contexte-entreprise.md` (survol). Détermine la date du jour : `date +%Y-%m-%d` (format AAAA-MM-JJ) — tu la passeras aux 4 agents. Crée `02 Marketing/Veille/_sections/` s'il n'existe pas.

2. **Charger l'état de référence.** Lis `02 Marketing/Veille/etat-reference.md` en entier.
   - **S'il existe** : c'est un **run normal** → les agents font du diff.
   - **S'il est absent ou vide** : c'est un **cold start** (1er passage) → préviens-en chaque agent dans son prompt (« pas d'état antérieur : établis les baselines, tout est nouveau »), et note-le en tête du rapport.

   L'état est découpé en 4 blocs délimités par des marqueurs HTML, un par agent :
   `<!-- ETAT:concurrence -->…<!-- /ETAT:concurrence -->`, idem `cout-travail`, `reste-a-charge`, `signaux`. Extrais le contenu entre chaque paire de marqueurs : c'est ce que tu transmettras à l'agent correspondant. Ces marqueurs rendent le découpage mécanique et fiable — ne te fie pas aux titres `##`, qui peuvent bouger.

3. **Lancer les 4 agents EN PARALLÈLE** : un seul message, 4 appels `Agent` au premier plan (ils s'exécutent en concurrence, et tu attends naturellement les 4 réponses — inutile de lancer des recherches toi-même entre-temps, ce serait du travail en double). Pour chaque agent, mets dans le `prompt` : la `date`, le `section_path` cible, et le bloc d'état extrait à l'étape 2, encapsulé dans la balise `<etat_*>` attendue par l'agent. Mapping :
   | subagent_type | section_path (`02 Marketing/Veille/_sections/…`) | balise d'état |
   |---|---|---|
   | `veille-marche` | `section-marche.md` | `<etat_concurrence>` |
   | `veille-cout-travail` | `section-cout-travail.md` | `<etat_cout_travail>` |
   | `veille-reste-a-charge` | `section-reste-a-charge.md` | `<etat_reste_a_charge>` |
   | `veille-signaux` | `section-signaux.md` | `<etat_signaux>` |

   Si un agent échoue ou renvoie vide, ne bloque pas : note-le et continue avec les autres.

4. **Assembler le rapport daté.** Lis les 4 fichiers `_sections/`. Crée `02 Marketing/Veille/AAAA-MM-JJ - rapport veille.md` :
   - en-tête `# Veille AAAA-MM-JJ` (+ une ligne de réserve technique si un agent a manqué une source, ex. Légifrance indisponible) ;
   - `## ⭐ Changements majeurs` : la synthèse priorisée (max 8 puces). **Ce qui mérite cette section, dans l'ordre** : (1) tout ce qui **exige une action ColombAge** (réajuster un contrat, une grille tarifaire, une mention de facture) ; (2) un **seuil chiffré qui bouge** (SMIC, minima, plafond crédit d'impôt, taux) ; (3) un **mouvement concurrent en zone Paris/IDF** (nouvelle agence, nouvelle offre, prix) ; (4) une **échéance de financement** qui approche. Le reste descend dans les sections détaillées ;
   - les 4 sections collées dessous.

5. **Réécrire la mémoire d'état (mécanique).** Chaque section contient un bloc « 🔁 État mis à jour » qui est l'état COMPLET du jour pour son domaine. Reconstruis `etat-reference.md` en remplaçant, **entre chaque paire de marqueurs**, l'ancien contenu par le bloc « 🔁 État mis à jour » de l'agent correspondant. Conserve le frontmatter et les marqueurs ; mets `maj:` = date du jour. (Si l'état n'avait pas encore de marqueurs, ajoute-les en enveloppant chaque domaine.)

6. **Mettre à jour la fiche-hub.** Dans `_Veille.md` : `maj:` = date, mets à jour « Dernier passage », ajoute au `## Journal` : `- AAAA-MM-JJ — veille : <1 phrase sur les changements majeurs>`.

7. **Brouillon Slack.** Résous l'ID du canal via `slack_search_channels` (query "veille-colombage"). Compose une synthèse ≤ 12 lignes (« *Veille AAAA-MM-JJ* » puis 🟢 concurrence / 📌 paie & facture / 🧭 idées). Poste-la en **brouillon** via `slack_send_message_draft`. **N'envoie jamais directement.** Canal introuvable → signale-le à Marc, n'invente rien.

8. **Résumé terminal.** Affiche : chemin du rapport, 3-5 changements majeurs, confirmation du brouillon Slack, et toute source qui a manqué.

</steps>

<rules>
- Sources publiques uniquement (délégué aux agents). Aucune donnée personnelle.
- Écritures limitées à `02 Marketing/Veille/` + brouillon Slack. Jamais d'envoi automatique.
- Un agent qui échoue/renvoie vide est noté dans le rapport, pas bloquant.
- Les agents réglementaires vont au **web officiel d'abord** (service-public, URSSAF, CNSA, BOFiP) et n'utilisent Légifrance que pour confirmer/approfondir sur texte consolidé — Légifrance (PISTE) est régulièrement indisponible.
</rules>
