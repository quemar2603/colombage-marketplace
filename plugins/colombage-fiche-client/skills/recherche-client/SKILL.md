---
name: recherche-client
description: >
  Ce skill doit être utilisé quand l'utilisateur demande une "fiche client", "fiche senior", "fiche auxiliaire",
  "recherche sur [nom]", "état du dossier de [nom]", "qu'est-ce qui s'est passé avec [nom]",
  "historique de [nom]", "résumé du suivi de [nom]", ou toute demande de synthèse sur un senior ou une auxiliaire de vie.
  Il orchestre une recherche multi-sources (Airtable, Gmail, Aircall) et produit une fiche de synthèse structurée.
metadata:
  version: "0.1.0"
---

# Recherche Approfondie Client — Fiche Senior ou Auxiliaire

Produis une fiche de synthèse complète sur une personne (senior ou auxiliaire de vie) en interrogeant successivement Airtable, Gmail et Aircall, puis en consolidant les résultats.

## Paramètre requis

Identifie le nom de la personne recherchée dans la demande de l'utilisateur. Si aucun nom n'est mentionné, demande-le avant de commencer.

## Étapes de recherche

Exécute les étapes dans cet ordre. Indique à l'utilisateur quelle étape est en cours avec un court message avant chaque phase.

### Étape 1 — Fiche Airtable

Interroge Airtable pour récupérer la fiche de la personne.

- Cherche d'abord dans la table **Seniors** (ou **Bénéficiaires**), puis dans la table **Auxiliaires** si rien n'est trouvé.
- Extrais tous les champs disponibles : coordonnées, statut, date d'entrée, besoins, intervenants assignés, notes internes, et tout champ métier pertinent.
- Si plusieurs enregistrements correspondent, liste-les et demande à l'utilisateur lequel cibler.
- Note le **statut actuel** du dossier (actif, en attente, suspendu, clôturé…).

Conserve toutes les données extraites pour la synthèse finale.

### Étape 2 — Historique des mails (Gmail)

Recherche les échanges email concernant cette personne.

- Effectue plusieurs requêtes de recherche en variant les termes : nom complet, prénom seul si distinctif, éventuellement numéro de dossier trouvé en étape 1.
- Trie les résultats par date, les plus récents en premier.
- Identifie les fils de discussion significatifs : signalements, demandes de coordination, retours famille, réclamations, changements d'intervenant.
- Extrais pour chaque mail pertinent : date, expéditeur, destinataire, objet, résumé du contenu en 1-2 phrases.
- Limite à 10 mails maximum, en privilégiant les plus récents et les plus informatifs.

Conserve la liste pour la synthèse finale.

### Étape 3 — Appels Aircall

Recherche les appels téléphoniques liés à cette personne dans Aircall.

- Cherche par nom, numéro de téléphone (récupéré depuis Airtable si disponible), ou identifiant dossier.
- Pour chaque appel trouvé : récupère la date, la durée, le sens (entrant/sortant), l'agent ayant traité l'appel, et la transcription ou le résumé si disponible.
- Si une transcription est disponible, extrais les points clés en 2-3 phrases maximum par appel.
- Compte le nombre total d'appels trouvés.

Conserve les données pour la synthèse finale.

## Synthèse finale — Fiche structurée

Après avoir complété les trois étapes, génère une fiche de synthèse selon le format défini dans `references/format-fiche.md`.

Applique les règles de présentation suivantes :
- Langage professionnel, factuel, sans jugement de valeur.
- Les informations manquantes sont indiquées explicitement ("Non renseigné" ou "Aucun résultat").
- Les alertes ou points d'attention sont mis en évidence.
- La fiche doit pouvoir être lue en moins de 2 minutes.
