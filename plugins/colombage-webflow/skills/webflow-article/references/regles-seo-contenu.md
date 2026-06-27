# Règles SEO de rédaction de contenu (source : plugin agricidaniel-seo)

> **Note.** Ce document est une synthèse **fidèle** des règles de rédaction de contenu on-page extraites du plugin SEO `plugins/agricidaniel-seo/`. Rien n'a été inventé : les seuils chiffrés, noms de critères et formules sont repris tels quels et seulement traduits/reformulés en français clair. Le périmètre est strictement éditorial (écriture du contenu d'un article web) ; les aspects purement techniques (crawl, sitemap, performance, robots.txt, backlinks, API) sont volontairement exclus.
>
> **Skills sources réellement utilisés :**
> - `seo-content` (qualité de contenu, E-E-A-T, lisibilité, citabilité IA)
> - `seo-content-brief` (briefs, densité de mots-clés, title/meta, maillage interne) + références `keyword-density.md` et `page-type-templates.md`
> - `seo-geo` (AEO/GEO, citabilité au niveau passage, format Q-R)
> - `seo-page` (structure on-page d'une page)
> - `seo-schema` (statut des types de schema)
> - `seo` / référence `eeat-framework.md` (cadre E-E-A-T détaillé)

---

## 1. Title & meta description

### Title tag (seo-content-brief, seo-page)
- Longueur : **50 à 60 caractères** (jamais sous 50, jamais au-dessus de 60).
- **Mot-clé principal placé en tête**, nom de marque à la fin.
- Séparer la marque par un pipe `|` ou un tiret `-` (reprendre le motif déjà utilisé sur le site).
- Commencer par un résultat, un chiffre ou un élément concret quand c'est possible.
- Doit être **unique** sur le site.

### Meta description (seo-content-brief, seo-page)
- Longueur : **130 à 150 caractères** (jamais sous 130, jamais au-dessus de 150).
  - *Nuance :* `seo-page` mentionne 150-160 caractères ; la règle stricte du générateur de brief est **130-150**.
- **Voix active** ; prolonge le title avec des USP et des éléments concrets.
- Se termine par un **appel à l'action**.
- Pas de nom de marque à la fin (il est déjà dans le title).
- Pas de guillemets (Google tronque à l'endroit des guillemets).
- Inclure naturellement le mot-clé.

---

## 2. Structure Hn et on-page

### Hiérarchie des titres (seo-content, seo-page)
- **Un seul H1**, qui correspond à l'intention de la page et contient le mot-clé (de préférence en tête).
- Hiérarchie logique **H1 → H2 → H3** sans niveau sauté.
- Titres **descriptifs** et sections scannables.
- Listes à puces / numérotées là où c'est pertinent.
- **Sommaire (table des matières)** pour le contenu long.

### URL / slug
- Court, descriptif, en minuscules, mots séparés par des **tirets**, sans paramètres.
- Contient le mot-clé principal.

### Longueurs de contenu — planchers de couverture par type de page (seo-content)
| Type de page | Minimum |
|--------------|---------|
| Page d'accueil | 500 mots |
| Page de service | 800 mots |
| Article de blog | 1 500 mots |
| Page produit | 300+ (400+ pour produits complexes) |
| Page locale | 500-600 mots |

> **Important (cité tel quel) :** ce sont des **planchers de couverture thématique, pas des cibles**. Google a confirmé que le nombre de mots **n'est PAS un facteur de classement direct**. Une page de 500 mots qui répond complètement à la requête battra une page de 2 000 mots qui n'y répond pas. À utiliser comme repère de profondeur adéquate, pas comme exigence rigide.

---

## 3. Intention de recherche (seo-content-brief)

Classer la requête avant d'écrire :
- **Informationnelle :** l'utilisateur veut apprendre (guides, how-to, définitions).
- **Commerciale :** il se renseigne avant d'acheter (comparatifs, avis, « meilleur X »).
- **Transactionnelle :** il est prêt à agir (acheter, réserver, demander un devis, s'inscrire).
- **Navigationnelle :** il cherche un site ou une page précis.

Identifier le **format que Google récompense** pour cette requête : guide long, listicle, tableau comparatif, landing page, FAQ, vidéo, pack local. Adapter le format de l'article en conséquence.

---

## 4. Profondeur, E-E-A-T et gain d'information

### Cadre E-E-A-T — pondérations (eeat-framework.md)
E-E-A-T = **Experience, Expertise, Authoritativeness, Trustworthiness**. La **fiabilité (Trust) est le facteur le plus important**.

| Dimension | Poids | Ce que le rédacteur doit démontrer |
|-----------|-------|-------------------------------------|
| Expérience (Experience) | 20 % | Vécu de première main : photos/captures originales, données propres, études de cas avec détails spécifiques, documentation de processus, résultats avant/après, anecdotes invérifiables autrement |
| Expertise | 25 % | Crédentials de l'auteur, exactitude et profondeur techniques, affirmations sourcées, vocabulaire spécialisé correct, byline visible avec nom + qualifications |
| Autorité (Authoritativeness) | 25 % | Reconnaissance externe : citations par d'autres sources, mentions presse, récompenses, historique de publication régulier |
| Fiabilité (Trustworthiness) | 30 % | Contact clair, transparence sur qui crée le contenu, témoignages/avis, historique de corrections, HTTPS |

> **À retenir (déc. 2025, cité) :** l'E-E-A-T s'applique désormais à **TOUTES les requêtes concurrentielles**, pas seulement au YMYL. L'attribution d'auteur anonyme ou générique est pénalisée même hors YMYL. Le contenu générique ne se classe plus.

**L'Expérience est le différenciateur clé :** narration à la première personne (« j'ai testé… », « d'après mon expérience… »), photos/captures originales (pas de banque d'images), exemples précis et vérifiables, documentation du travail réellement effectué. Raison : l'IA peut simuler l'expertise mais **ne peut pas fabriquer une expérience authentique**.

**YMYL** (exigence E-E-A-T maximale) : santé/sécurité, finance, droit, actualité, élections et confiance civique, processus démocratiques, groupes de personnes.

### Gain d'information — non négociable (seo-content-brief)
Chaque article doit apporter une **valeur nouvelle qu'aucune page actuellement classée ne fournit**. Doit être précis :
- données propriétaires ou recherche originale ;
- études de cas avec résultats réels ;
- citations d'experts ou expérience de première main ;
- synthèse originale ou cadre/framework inédit.
- **PAS** « plus de détails » ni « meilleure mise en forme ».

### Signaux de confiance à inclure (seo-content-brief)
- Bio et crédentials de l'auteur pertinents pour le sujet.
- Citations d'experts ou de sources autoritaires.
- Études/données/statistiques citées **avec dates**.
- Date de dernière mise à jour.
- Particulièrement critique pour les sujets YMYL.

### Contenu IA — marqueurs de faible qualité à éviter (seo-content, eeat-framework.md)
Le contenu généré par IA est **acceptable s'il démontre un vrai E-E-A-T** et une valeur unique. Marqueurs de faible qualité **à éviter** :
- formulations génériques sans spécificité ;
- aucune idée ni perspective originale ;
- aucun signal d'expérience de première main ;
- inexactitudes factuelles ;
- structure répétitive d'une page à l'autre ;
- aucune attribution d'auteur.

### Fraîcheur (seo-content)
- Date de publication visible.
- Date de mise à jour si le contenu a été révisé.
- Signaler le contenu de plus de **12 mois** sans mise à jour sur les sujets qui évoluent vite.

---

## 5. Densité et placement des mots-clés (keyword-density.md, seo-content-brief)

### Densité du mot-clé principal
**Plage sûre : 0,5 % à 2,0 %** du nombre total de mots.

| Densité | Évaluation |
|---------|-----------|
| < 0,5 % | Sous-optimisé (probablement absent d'emplacements clés) |
| 0,5 % – 2,0 % | **Plage optimale** : lecture naturelle, signal thématique clair |
| 2,0 % – 3,0 % | Revue nécessaire (peut sonner artificiel) |
| > 3,0 % | Risque de keyword stuffing / pénalité |

- Exemple : article de 1 000 mots à 1-2 % → le mot-clé principal apparaît **environ 10 à 20 fois** au total (titres + corps + alt text).
- **Rendements décroissants :** les 1-2 premières occurrences portent le plus de poids SEO ; privilégier la qualité de placement à la quantité.
- `seo-content` / `seo-page` parlent d'une densité « naturelle de 1-3 % » — rester dans la plage sûre 0,5-2 %.

### Le mot-clé principal DOIT apparaître dans :
1. Le **title** (en tête, pas à la fin).
2. Le **H1** (en tête).
3. Le **slug d'URL** (minuscules, tirets).
4. La **meta description** (intégration naturelle).
5. Le **premier paragraphe / les 100 premiers mots**.
6. **Au moins un alt text d'image**.

### Le mot-clé principal n'a PAS besoin d'apparaître dans :
- chaque H2 / H3 (les sous-titres portent le contexte naturellement si le H1 couvre le sujet) ;
- chaque paragraphe ou section ;
- l'ancre de chaque lien interne (varier les ancres).

### Mots-clés secondaires et sémantiques
| Type | Nombre | Usage |
|------|--------|-------|
| Termes étroitement liés | **5-8** | Répartis dans le corps et les titres H2-H6 |
| Termes sémantiques larges | **10-15** | Couvrent les concepts liés et variations d'intention |
| Synonymes | autant que naturel | Améliorent la lisibilité ; **ne comptent PAS** dans la densité |

### Distribution
- **Répartir le mot-clé principal uniformément** : ne pas tout concentrer dans l'introduction ni dans une seule section.
- Erreurs courantes à éviter : obsession de l'exact-match (varier les formulations), bourrage du mot-clé dans tous les titres, oubli des 100 premiers mots, oubli de l'alt text, comptage des synonymes dans la densité.

---

## 6. Lisibilité (seo-content)

- **Flesch Reading Ease : cible 60-70** pour un public général.
  - *Nuance citée :* le score Flesch est un **indicateur de qualité, pas un facteur de classement direct** Google (confirmé par John Mueller ; Yoast l'a déprioritisé en v19.3). À utiliser comme repère d'accessibilité, pas à optimiser pour le SEO.
- Niveau de lecture adapté au public cible.
- **Longueur de phrase : 15-20 mots en moyenne.**
- **Longueur de paragraphe : 2-4 phrases.**
- Sections scannables avec titres descriptifs ; listes à puces / numérotées quand pertinent.

---

## 7. AEO / GEO — citabilité par les moteurs IA (seo-geo, seo-content)

Objectif : être **cité** par les moteurs IA (Google AI Overviews, Google AI Mode, ChatGPT, Perplexity, Bing Copilot). Dans Google AI Mode, il n'y a **aucun lien organique bleu** : la citation IA est le seul mécanisme de visibilité.

### Citabilité au niveau passage (critère « Citability », 25 % du score GEO)
- **Longueur de passage optimale pour la citation : 134-167 mots.** Construire des **blocs de réponse autonomes** (extractibles sans contexte).
- **Réponse directe dans les 40-60 premiers mots** de la section.
- Phrases **claires et citables** avec faits/statistiques précis.
- Définitions suivant les motifs « X est… » / « X désigne… ».
- Points de données uniques, introuvables ailleurs ; affirmations attribuées à des sources précises.
- À éviter : affirmations vagues, opinions sans preuve, conclusions enfouies, absence de données chiffrées.

### Lisibilité structurelle (critère « Structural Readability », 20 % du score GEO)
- Hiérarchie propre **H1 → H2 → H3**.
- **Titres formulés en question** (correspondent aux patterns de requêtes).
- Paragraphes courts (**2-4 phrases**).
- **Tableaux** pour les données comparatives ; **listes** ordonnées/non ordonnées pour étapes ou items multiples.
- Sections **FAQ** au format Q-R clair.
- À éviter : mur de texte sans structure, hiérarchie de titres incohérente, info enfouie dans les paragraphes.

### Contenu multimodal (15 % du score GEO)
Le contenu avec éléments multimodaux obtient un **taux de sélection +156 %**. Inclure : texte + images pertinentes, vidéo (intégrée ou liée), infographies/graphiques, éléments interactifs (calculateurs, outils).

### Signaux d'autorité et de marque (20 % du score GEO)
Byline auteur avec crédentials, date de publication **et** date de mise à jour, citations de sources primaires, citations d'experts attribuées. (Les mentions de marque corrèlent 3× plus fortement avec la visibilité IA que les backlinks — hors périmètre rédactionnel mais à connaître.)

### Quick wins rédactionnels (seo-geo)
1. Ajouter une définition « Qu'est-ce que [sujet] ? » dans les **60 premiers mots**.
2. Créer des **blocs de réponse autonomes de 134-167 mots**.
3. Ajouter des **titres H2/H3 formulés en question**.
4. Inclure des statistiques précises avec leurs sources.
5. Afficher les dates de publication / mise à jour.

### Format question-réponse et FAQ
- Formats explicites question→réponse, définitions, instructions pas-à-pas que l'IA peut extraire et citer.
- **Sections FAQ structurées** recommandées pour la visibilité IA (notamment plateformes non-Google) — voir la nuance sur le **schema** FAQ en section 9.
- Construire des **clusters thématiques** (autorité topique), pas des pages isolées : l'IA cite préférentiellement les sources à expertise profonde.

---

## 8. Maillage interne (seo-content, seo-content-brief)

- **3 à 5 liens internes pertinents pour 1 000 mots.**
- **Ancres descriptives** (et variées d'un lien à l'autre — ne pas réutiliser la même ancre exacte partout).
- Liens vers du contenu connexe ; éviter les pages orphelines.
- Dans un brief : suggérer **3-5 opportunités de liens internes précises avec ancre + URL cible**, en s'appuyant sur la structure réelle du site (sitemap).
- Préciser si la page est un **hub** (qui pointe vers les pages du cluster) ou un **spoke** (qui pointe vers la page pilier).
- **Règle de couverture de structure (pages hub/catégorie/« types de ») :** l'article doit référencer **chaque** catégorie/sous-page pertinente existante, chacune dans sa propre section avec une suggestion de lien interne. Ne pas inventer de catégories inexistantes, ne pas en omettre.
- **Liens externes :** citer des sources autoritaires, nombre raisonnable (pas excessif).

### Règle de pertinence au site (seo-content-brief)
Chaque titre, sous-thème, mot-clé et question de FAQ suggéré doit être quelque chose que **le site peut crédiblement traiter** au regard de ses services/produits réels. Avant chaque suggestion, se demander : « Ce site peut-il réellement délivrer ce contenu ? » Si non, supprimer.

---

## 9. Schema éditorial (seo-schema, page-type-templates.md)

Ce que le rédacteur doit savoir sur les données structurées côté contenu d'article. **Format JSON-LD** privilégié (préférence déclarée de Google).

### Types ACTIFS pertinents pour un article (à recommander librement)
- **Article / BlogPosting / NewsArticle** — pour un article. Propriétés clés : `headline`, `author` (Person), `datePublished`, `dateModified`, `image`, `publisher`.
- **Person / ProfilePage** — pour l'auteur (renforce l'E-E-A-T et la clarté d'entité).
- **Organization**, **BreadcrumbList**, **WebPage**, **VideoObject**, **ImageObject** — selon le contenu.

### FAQ / FAQPage — règle importante et nuancée
- **`seo-schema` et `seo-page` (rich results Google) :** le **schema FAQ est RESTREINT aux sites gouvernementaux et de santé** (restriction d'août 2023). Ne pas compter dessus pour des rich results FAQ sur un site commercial.
- **`seo-geo` / `seo-content` :** garder des **sections FAQ structurées dans le contenu** (Q-R visible) reste utile pour la citabilité par les moteurs IA, **notamment les plateformes non-Google** — c'est l'usage éditorial, distinct du balisage pour rich results Google.
- **`page-type-templates.md`** liste FAQPage parmi les schemas recommandés selon le type de page : cohérent avec l'usage éditorial/AEO, à distinguer de l'attente de rich results Google.
- En clair pour le rédacteur : **écrire de vraies sections FAQ** (bon pour l'IA et l'utilisateur) ; ne pas promettre de rich results FAQ Google hors secteurs autorisés.

### HowTo — NE JAMAIS recommander
Les rich results **HowTo** ont été supprimés (sept. 2023). `seo-page` : « NEVER recommend HowTo ». On peut toujours écrire des instructions pas-à-pas dans le contenu (utile pour l'IA), mais sans en attendre un rich result.

> **Note technique (déc. 2025) :** pour le markup sensible au temps, inclure le JSON-LD dans le HTML rendu côté serveur (les données injectées en JavaScript peuvent être traitées avec retard). Détail d'implémentation, hors rédaction.

---

## 10. Modèles de structure d'article par type de page (page-type-templates.md)

### Article de blog
Objectif : se classer sur des requêtes informationnelles et renvoyer vers les pages de service.

| Section | Rôle | Format |
|---------|------|--------|
| Réponse directe | Gagner le Featured Snippet | Paragraphe « answer-first », **40-60 mots**, cible FS |
| Contexte / background | Poser le décor | 1-2 paragraphes |
| 3-5 sous-thèmes (H2) | Profondeur (issus des PAA / gaps) | Mix paragraphes, listes, tableaux |
| Erreurs courantes | Valeur unique | Liste numérotée avec explications |
| FAQ | Capter le longue-traîne | 5 questions issues de l'analyse de gaps |
| CTA vers un service | Convertir | Lien contextuel, pas de hard sell |

- **Schema :** Article + FAQPage (voir nuance FAQ section 9).
- **Placement du mot-clé principal :** H1, 100 premiers mots, slug, meta title, un alt text d'image.

### Page de service (rappel utile si l'article est une page service)
- Sections types : *Qu'est-ce que [service]* (encadré définition, **80-120 mots**) ; *Qui en a besoin* ; *Comment ça marche* (étapes numérotées) ; *Coûts/tarifs* (tableau ou fourchette) ; *Résultats* (stats, études de cas) ; *Pourquoi nous* (3-5 puces concrètes) ; *FAQ* (**5-8 questions, 40-60 mots chacune**, cible FS) ; *CTA*.
- **Placement du mot-clé :** H1, 100 premiers mots, un H2, slug, meta title.

> Les blocs « réponse directe » (40-60 mots) et FAQ (40-60 mots/réponse) sont à la fois des **cibles de Featured Snippet** et des **blocs citables par l'IA** — cohérent avec les 40-60 mots de réponse directe et 134-167 mots de passage autonome de la section 7.

---

## Checklist de publication

**Title & meta**
- [ ] Title de 50-60 caractères, mot-clé en tête, marque à la fin
- [ ] Meta description de 130-150 caractères, voix active, CTA final, sans guillemets

**Structure**
- [ ] Un seul H1 contenant le mot-clé ; hiérarchie H1→H2→H3 sans saut
- [ ] Slug court, minuscules, tirets, avec le mot-clé
- [ ] Sommaire si contenu long ; sections scannables, listes/tableaux où utile
- [ ] Longueur ≥ au plancher du type de page (blog : 1 500 ; service : 800 ; locale : 500-600)

**Intention & profondeur**
- [ ] Intention de recherche identifiée et format adapté
- [ ] Gain d'information explicite (donnée/étude/expertise inédite — pas « plus de détails »)
- [ ] Signaux E-E-A-T : bio auteur + crédentials, citations sourcées datées, date de mise à jour
- [ ] Signaux d'Expérience de première main (je/nous, photos originales, exemples vérifiables)

**Mots-clés**
- [ ] Densité du mot-clé principal entre 0,5 % et 2,0 %
- [ ] Mot-clé dans : title, H1, slug, meta, 100 premiers mots, ≥ 1 alt text
- [ ] 5-8 termes secondaires + 10-15 termes sémantiques répartis ; pas de bourrage

**Lisibilité**
- [ ] Phrases ~15-20 mots ; paragraphes 2-4 phrases
- [ ] Flesch Reading Ease visé 60-70 (indicateur, pas obsession)

**AEO / GEO**
- [ ] Définition « Qu'est-ce que [sujet] ? » dans les 60 premiers mots
- [ ] Au moins un bloc de réponse autonome de 134-167 mots
- [ ] Titres H2/H3 en question ; sections FAQ au format Q-R
- [ ] Statistiques précises avec sources ; tableaux/listes pour données comparatives
- [ ] Dates de publication et de mise à jour affichées

**Maillage & schema**
- [ ] 3-5 liens internes / 1 000 mots, ancres descriptives variées
- [ ] Rôle hub vs spoke clair ; liens vers les pages connexes réelles du site
- [ ] Liens externes vers sources autoritaires (nombre raisonnable)
- [ ] JSON-LD Article (+ Person auteur) ; FAQ écrite pour l'IA, sans attendre de rich result FAQ Google hors secteurs autorisés ; jamais de rich result HowTo
- [ ] Toute suggestion respecte la Règle de pertinence au site (le site peut réellement la délivrer)
