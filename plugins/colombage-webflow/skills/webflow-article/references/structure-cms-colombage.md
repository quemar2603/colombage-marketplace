# Structure CMS du compte Webflow ColombAge — Fiche de référence

> Document de référence factuel généré à partir de l'API Webflow Data v2 (MCP Webflow).
> Dernière synchronisation : **2026-06-26**.
> Toutes les valeurs (IDs, slugs, types de champs, compteurs) sont extraites directement de l'API — aucune n'est inventée.
> ⚠️ Les compteurs d'items et la liste des articles évoluent. Re-synchroniser avant toute opération critique.

---

## 1. Vue d'ensemble du compte

- **Workspace unique** : `634f2c2d1f5fafdfa793daf5`
- **Fuseau** : Europe/Paris
- **2 sites** distincts, chacun avec son propre CMS (les collections ne sont **pas** partagées entre les sites) :

| Site | `site_id` | Domaine(s) de production | Nb collections | Locale |
|------|-----------|--------------------------|----------------|--------|
| **ColombAge site principal** | `634f2c8fdcab3b71c7e6d9a2` | `colombage-cohabitation.fr`, `www.colombage-cohabitation.fr`, `association.colombage-cohabitation.fr` | 18 | FR (primaire, `fr`) |
| **ColombAge Compagnie** | `673c735dd9635521f6a114fc` | `sap.colombage-cohabitation.fr` | 22 | FR (primaire, `fr`) |

> **Important** : un même nom de collection (ex. « Articles - Thèmes », « Villes », « CTA », « FAQ ») existe sur les deux sites avec des **IDs et des schémas différents**. Toujours utiliser le couple (site_id, collection_id).

---

## 2. Le « modèle Article » ColombAge

ColombAge n'a **pas** une collection unique « Blog » / « Articles ». Le contenu éditorial est réparti dans **plusieurs collections** qui partagent un socle de champs commun. Comprendre ce socle est la clé pour automatiser la création d'articles.

### 2.1 Socle de champs commun (présent dans la quasi-totalité des collections éditoriales)

| Slug | Type | Requis | Rôle |
|------|------|:------:|------|
| `name` | PlainText (max 256) | ✅ | **Title** — titre affiché dans Google (balise title). Champ système. |
| `slug` | PlainText (max 256, alphanumérique) | ✅ | URL de l'article. Champ système. Le modifier casse les liens existants. |
| `h1` | PlainText | — | Titre H1 affiché en haut de la page article. |
| `metadescription` | PlainText (max 180) | — | Meta description SEO. |
| `categorie` | Reference → collection « Articles - Thèmes » | — | Catégorie/thème de l'article. |
| `chapo` | PlainText | — | Chapô / accroche sous le titre. |
| `image-chapo` | Image | — | Image principale d'illustration. |
| `alt-image-chapo` | PlainText | — | Texte alternatif de l'image (SEO). |
| `premier-rich-text` | **RichText** | — | Corps principal de l'article (avant CTA). Contenu HTML. |
| `cta-colombage` | Switch | — | Active/désactive le bloc CTA ColombAge. |
| `cta` | Reference → collection « CTA » | — | CTA personnalisé référencé. |

### 2.2 Variantes du modèle

**Variante « simple »** (site principal — collections *Bonnes idées*, *Maintien à domicile*, *Équipements & technologies*, *Jeunes*, *Seniors*) :
socle + `faq-question-1/2` + `faq-reponse-1/2`.

**Variante « riche »** (site Compagnie — toutes les collections de services + *Nos Conseils*, et site principal *Logements spécialisés*) :
socle + en plus :
- `table-des-matieres` (RichText) — sommaire ancré
- `deuxieme-rich-text` (RichText) — 2ᵉ partie après le 1ᵉʳ CTA
- `1-er-lien-cta` (Link) + `texte-premier-cta` (PlainText) + `2-e-lien-cta` (PlainText) — boutons de conversion inline
- `activiter-faq` (Switch) + jusqu'à 4 paires `faq-question-N` / `faq-reponse-N`
- `apparition-dans-nos-conseils` (Switch) — fait remonter l'article dans la page agrégée « Nos Conseils »
- `nos-conseils` (Option : *Aide à domicile* / *Droits et financements* / *Santé*) — rubrique de regroupement
- `auteur` / `auteurs` (Reference → collection « Auteurs »)
- parfois `resume-article` (RichText)

> ⚠️ **Point technique majeur** : les champs `RichText` Webflow attendent du **HTML** (pas du Markdown). Toute automatisation doit convertir le contenu en HTML compatible Webflow.

> ⚠️ **Incohérence de nommage à connaître** : le champ auteur s'appelle `auteur` dans certaines collections et `auteurs` dans d'autres (voir tableaux §3 et §4). De même la FAQ : `faq-question-1` partout, mais le nombre de paires varie (2 ou 4).

---

## 3. Site principal — `634f2c8fdcab3b71c7e6d9a2`

### 3.1 Inventaire des 18 collections

| Collection | Slug | `collection_id` | Items | Type |
|------------|------|-----------------|:-----:|------|
| **Bonnes idées** | `bonnes-idees` | `6660648d4b3cbc5310663409` | **36** | 📝 Articles (modèle simple) |
| **Maintien à domiciles** | `maintien-domicile` | `66602b8091235474a196e178` | 7 | 📝 Articles (modèle simple + offres logement) |
| **Equipements & technologies** | `equipement-technologie` | `666056e9313d00e5a2e805f6` | 8 | 📝 Articles (modèle simple) |
| **Logement spécialisés** | `logement-specialise` | `6660626ce45d98279d2b5111` | 0 | 📝 Articles (modèle riche) |
| **Jeunes** | `jeune` | `68f0c1e45e2a5729736083c2` | 9 | 📝 Articles (modèle simple) |
| **Seniors** | `senior` | `68f0c9bde24651cabed5af4d` | 4 | 📝 Articles (modèle simple) |
| **Articles - Thèmes** | `theme` | `6361382fe7421360b23e6789` | 11 | 🏷️ Taxonomie / catégories |
| **ColombAge - Presses** | `presse` | `657736076bbe37118b34554f` | 12 | 📰 Revue de presse |
| **Villes** | `villes` | `64d2861dc193d4e0e219f320` | 81 | 📍 Pages locales (cohabitation) |
| **ColombAge - Team members** | `team-members` | `636158e69d10feb1b0aea5dd` | — | 👥 Équipe |
| **ColombAge - FAQs** | `faq` | `65a6523be54d143329fcfad9` | — | ❓ FAQ |
| **Categories** | `category` | `6536298da8541ea853d7cad0` | — | 🛒 E-commerce (catégories produits) |
| **Products** | `product` | `6536298da8541ea853d7cad2` | — | 🛒 E-commerce |
| **SKUs** | `sku` | `6536298da8541ea853d7cad4` | — | 🛒 E-commerce |
| **Services cohabitations** | `service` | `664cd5165480f6ff50d04dfa` | — | 🧩 Composant (icônes services) |
| **Exemple de colocations** | `exemple-de-colocations` | `664dafbff8518921d85289ba` | — | 🧩 Exemples de logement |
| **Cohabitation - Etapes inscriptions juniors** | `etapes-inscriptions-junior` | `6641d8e9bd4671099f400dad` | — | 🧩 Étapes process |
| **CTA** | `cta` | `67f69dbcc74e60bcd0dcde63` | — | 🧩 Blocs CTA réutilisables |

📝 = collection à contenu rédactionnel (≈ **64 articles éditoriaux** au total sur le principal).

### 3.2 Taxonomie « Articles - Thèmes » (principal) — `6361382fe7421360b23e6789`

Sert de `categorie` pour toutes les collections d'articles du principal. Champs notables : `couleur` (Color), bloc CTA popup (`cta-titre-popup`, `cta-image-popup`, `cta-description-popup-3`, `cta-texte-bouton-popup`, `cta-link-popup`, `cta-alt-popup`), et des MultiReference inverses vers `bonnes-idees`, `maintien-a-domicile`, `equipements-et-technologie`. **11 thèmes** existants.

### 3.3 Collection « Bonnes idées » — 36 articles

Champs propres : socle simple + `faq-question-1/2`, `faq-reponse-1/2`, `cta-colombage` (Switch), `cta` (Ref → CTA principal). `categorie` → `theme` principal.

Liste des 36 articles (titre — slug — statut) :

| # | Titre | Slug | Statut |
|---|-------|------|--------|
| 1 | 10 activités manuelles et créatives stimulantes pour les seniors | `top-10-des-meilleures-activites-manuelles-et-creatives-stimulantes-pour-les-seniors` | Publié |
| 2 | Ces célébrités âgées sont toujours actives et inspirantes | `portraits-de-5-celebrites-actives-et-inspirantes-a-un-age-avance` | Publié |
| 3 | Mal de dos dès 50 ans : les exercices et traitements qui marchent vraiment | `mal-de-dos-des-50-ans-les-exercices-et-traitements-qui-marchent-vraiment` | Publié |
| 4 | Les 8 habitudes clés qui protègent le cerveau à partir de 65 ans | `les-8-habitudes-cles-qui-protegent-le-cerveau-a-partir-de-65-ans` | Draft |
| 5 | Les 7 meilleurs magazines pour les seniors en 2026 | `les-7-meilleurs-magazines-pour-les-seniors` | Draft |
| 6 | 10 sorties originales et adaptées aux seniors à Paris | `top-10-des-sorties-pour-seniors-a-paris` | Publié |
| 7 | Les 10 meilleures applications de livres audio pour les seniors | `nos-10-meilleures-applications-de-livres-audio-pour-les-seniors` | Publié |
| 8 | 10 idées de podcasts à écouter pour les personnes âgées | `nos-10-idees-de-podcasts-a-ecouter-pour-les-personnes-agees` | Publié |
| 9 | 20 idées de films pour les personnes âgées | `nos-idees-de-films-pour-les-personnes-agees` | Publié |
| 10 | Pourquoi la Vitamine D est essentielle pour la santé des seniors ? | `les-personnes-agees-sont-a-risque-de-carence-en-vitamine-d` | Publié |
| 11 | 10 Recettes simples pour personnes âgées | `10-recettes-simples-pour-personnes-agees` | Publié |
| 12 | 10 idées de lecture pour les personnes âgées | `10-idees-de-lecture-pour-les-personnes-agees` | Publié |
| 13 | 10 sports adaptés aux personnes âgées | `10-sports-pour-seniors` | Publié |
| 14 | Quel rôle pour les grands-parents auprès de leurs petits-enfants ? | `quel-est-le-role-des-grands-parents-aupres-de-leurs-petits-enfants` | Publié |
| 15 | Tout comprendre de la dénutrition chez les personnes âgées | `la-denutrition-chez-les-personnes-agees` | Publié |
| 16 | Conseils pour tous pour se protéger lors de la canicule | `conseils-pour-tous-pour-se-proteger-lors-de-la-canicule` | Publié |
| 17 | Oasis Solidaire : Une solution pour les seniors contre la canicule | `oasis-solidaire-une-solution-pour-les-seniors-contre-la-canicule` | Publié |
| 18 | Tout savoir sur le permis de conduire senior en 2026 | `tout-savoir-sur-le-permis-de-conduire-des-seniors` | Publié |
| 19 | 10 jeux de mémoire gratuits pour les séniors | `10-jeux-de-memoire-gratuits-pour-les-seniors` | Draft |
| 20 | Retrait de permis de conduire senior : Quelles conditions ? | `retrait-de-permis-de-conduire-senior-quelles-conditions` | Publié |
| 21 | Tout savoir sur l'accompagnement personne âgée en voiture | `tout-savoir-sur-laccompagnement-personne-agee-en-voiture` | Publié |
| 22 | Paris en compagnie : un dispositif pour lutter contre l'isolement | `paris-en-compagnie-un-dispositif-pour-lutter-contre-lisolement` | Publié |
| 23 | Gym douce pour les seniors : exercices, bienfaits et informations | `gym-douce-pour-les-seniors-exercices-bienfaits-et-informations` | Publié |
| 24 | Cinéma pour les seniors : tarifs, conditions et infos | `cinema-pour-les-seniors-tarifs-conditions-et-infos` | Draft |
| 25 | Musées gratuits pour les seniors : infos et conditions | `musees-gratuits-pour-les-seniors-infos-et-conditions` | Publié |
| 26 | Cours d'adultes à Paris : des cours du soir à petits prix | `cours-dadulte-a-paris-des-cours-du-soir-a-petits-prix` | Publié |
| 27 | Paris Sport Senior : Des Activités Sportives Gratuites pour les Seniors | `paris-sport-senior-des-activites-sportives-gratuites-pour-les-seniors` | Publié |
| 28 | Club de l'amitié : Un moyen de rencontrer des seniors | `club-de-lamitie-un-moyen-de-rencontrer-des-seniors` | Publié |
| 29 | 10 meilleures idées de cadeaux pour les personnes âgées | `les-10-meilleures-idees-de-cadeaux-pour-les-personnes-agees` | Publié |
| 30 | Livraison gratuite pour les seniors chez Carrefour, Leclerc, Auchan… | `livraison-gratuite-pour-les-seniors-chez-carrefour-leclerc-auchan-monoprix-intermarche-et-franprix` | Draft + Archivé |
| 31 | Comment les séniors peuvent-ils profiter de l'intelligence artificielle ? | `comment-les-seniors-peuvent-ils-profiter-de-lintelligence-artificielle` | Publié |
| 32 | Aides SNCF senior : Service Mes bagages, Accompagnement… | `aides-sncf-senior-service-mes-bagages-accompagnement` | Publié |
| 33 | Quel journal familial choisir en 2026 ? | `quel-journal-familial-choisir` | Publié |
| 34 | Le Pass Paris Senior : la carte navigo de transport gratuite | `le-pass-navigo-senior-paris-la-carte-de-transport-gratuite-pour-les-seniors` | Publié |
| 35 | Les clubs de marche pour les seniors : le guide complet | `les-clubs-de-marche-pour-les-seniors-le-guide-complet` | Publié |
| 36 | Les clubs pour seniors : un espace de loisirs et de partage | `les-clubs-pour-seniors-un-espace-de-loisirs-et-de-partage` | Publié |

### 3.4 Autres collections du principal (résumé des schémas)

- **Villes** (`villes`, 81 items) : pages locales cohabitation. Champs : `metadescription`, `titre-ville`, `titre-h1`, `sous-titre`, `image-principale` + alt, `sommaire` (RichText), `premier-bloc-article` (RichText), `image-partenariat` (MultiImage), `exemples-de-logement` (MultiRef → exemple-de-colocations), `title-pour-home`.
- **Presses** (12) : `h1`, `description-courte` (RichText), `date-d-intervention` (DateTime), `logo-media` (Image), `video-intervention` (VideoLink), `image-intervention`, `lien-de-l-article` (Link), `titre-du-bouton-vers-le-lien`.
- **FAQs** : `service` (Option : Aide à la personne / Cohabitation intergénérationnelle / Aide informatique à domicile), `section-aide-informatique` (Option), `titre-question`, `reponse-question-2` (RichText), `sous-section-colombage-cohabitation` (Option, 7 valeurs), switches d'affichage.
- **Team members** : `description`, `photo`.
- **Categories / Products / SKUs** : module e-commerce Webflow standard (`Products` a `prix-exact` requis, `sku-properties`, images multiples, avis).
- **Services cohabitations** : `icon`. **Exemple de colocations** : `image-de-la-chambre`, `titre-de-la-chambre`, `localisation`, `services` (MultiRef), `prix-logement`, `surface-total-du-logement`. **Etapes inscriptions juniors** : `rang` (Number), `nom-de-l-etape`, `description`, `image`.
- **CTA** (`cta`) : `titre-cta-side`, `titre-cta-end`, `description-cta-end`, `texte-bouton`, `link-bouton` (Link).

---

## 4. Site Compagnie (SAP) — `673c735dd9635521f6a114fc`

### 4.1 Inventaire des 22 collections

| Collection | Slug | `collection_id` | Items | Type |
|------------|------|-----------------|:-----:|------|
| **Nos Conseils** | `nos-conseils` | `673c735dd9635521f6a11664` | **25** | 📝 Articles (modèle riche, hub éditorial) |
| **Aides financières** | `tarifs-et-aides-financieres` | `673c735dd9635521f6a11668` | 28 | 📝 Articles (aides/financement) |
| **Services à la personnes** | `service-a-la-personne` | `673ef91406976030b35d1f22` | 10 | 📝 Articles (services SAP) |
| **Logements spécialisés** | `logements-specialises` | `6821a752dc62a139b31a73c3` | 3 | 📝 Articles (modèle riche) |
| **Aide Ménagères** | `aide-menagere` | `68efcb3c199110f8eb8e5759` | 7 | 📝 Articles (modèle riche) |
| **Aide à la toilettes** | `aide-a-la-toilette` | `68f89839eeb92eac22123b95` | 11 | 📝 Articles (+ `resume-article`) |
| **Aide au lever et au couchers** | `aide-au-lever-et-au-coucher` | `68f89856d106d0ecaa33cbe0` | 8 | 📝 Articles (modèle riche) |
| **Garde de nuits** | `garde-de-nuit` | `68f8986beeb92eac221248d4` | 8 | 📝 Articles (+ `resume-article`) |
| **Aide a domicile mandataires** | `mandataire` | `6a34000ab48d6133c9d02244` | 4 | 📝 Articles (4 FAQ + `nos-conseils` option) |
| **Auxiliaire de vies** | `auxiliaire-de-vie` | `6a3bd69407e84a92cfe1c298` | 4 | 📝 Articles (4 FAQ + `nos-conseils` option) |
| **Articles - Thèmes** | `theme` | `673c735dd9635521f6a11522` | 15 | 🏷️ Taxonomie / catégories |
| **Auteurs** | `auteurs` | `69b980444b31a10ebc12ccec` | 1 | ✍️ Auteurs |
| **Entreprises Aide à la personnes** | `individual` | `673c735dd9635521f6a11669` | 31 | 🏢 Annuaire entreprises SAP |
| **Comparatif-services-a-la-personnes** | `comparatif-services-a-la-personne` | `67498a5a16ec5811ac178141` | 19 | ⚖️ Comparatifs (X vs Y) |
| **Comparatif vignettes** | `comparatif-vignettes` | `6756af79feb1e7eae2308db6` | — | 🧩 Vignettes comparatif |
| **Services cards** | `services-cards` | `67653fce3163e43c4da504b9` | — | 🧩 Cartes services |
| **Villes** | `villes` | `6879059ffc1717b29daffa4d` | 22 | 📍 Pages locales (SAP) |
| **CTa** | `cta` | `680116916ea6feaf3a5d0064` | — | 🧩 Blocs CTA réutilisables |
| **ColombAge - FAQs** | `faq` | `673c735dd9635521f6a1160a` | — | ❓ FAQ |
| **Categories** | `category` | `673c735dd9635521f6a11586` | — | 🛒 E-commerce |
| **Products** | `product` | `673c735dd9635521f6a115a4` | — | 🛒 E-commerce |
| **SKUs** | `sku` | `673c735dd9635521f6a115be` | — | 🛒 E-commerce |

📝 = collection rédactionnelle (≈ **108 articles éditoriaux** au total sur Compagnie).

### 4.2 Famille « pages de services SAP »

Les collections suivantes partagent **strictement le même modèle riche** (socle + table des matières + 2 rich text + boutons CTA inline + FAQ + `apparition-dans-nos-conseils` + `cta` Ref → CTa + auteur), `categorie` → `theme` Compagnie :

`service-a-la-personne`, `logements-specialises`, `aide-menagere`, `aide-a-la-toilette`, `aide-au-lever-et-au-coucher`, `garde-de-nuit`, `mandataire`, `auxiliaire-de-vie`, `tarifs-et-aides-financieres`.

Différences mineures par collection :
- `aide-a-la-toilette` et `garde-de-nuit` ont en plus `resume-article` (RichText).
- `mandataire` et `auxiliaire-de-vie` ont **4 paires de FAQ** (vs 2) + un champ Option `nos-conseils` (Aide à domicile / Droits et financements / Santé) + champ `auteur` (singulier).
- `tarifs-et-aides-financieres` : 4 paires de FAQ, switch `aide-financere-specifique`, champ `auteurs` (pluriel), **pas** de table des matières.
- `service-a-la-personne` : a `icon-svg` (Image) en plus, FAQ 2 paires, champ `auteurs`.

> Le champ auteur : `auteur` (mandataire, auxiliaire-de-vie, nos-conseils) **vs** `auteurs` (aides-financieres, service-a-la-personne, logements-specialises, aide-menagere, aide-a-la-toilette, garde-de-nuit, aide-au-lever). Vérifier par collection avant écriture.

### 4.3 Collection « Nos Conseils » — 25 articles (hub éditorial principal)

Champs : socle + `table-des-matieres`, `premier-rich-text`, `1-er-lien-cta` (Link), `texte-premier-cta`, `2-e-lien-cta`, `deuxieme-rich-text`, `activiter-faq` (Switch), 4 paires FAQ, `cta-colombage` (Switch), `apparition-dans-nos-conseils` (Switch), `cta` (Ref → CTa), `nos-conseils` (Option : Aide à domicile / Droits et financements / Santé), `auteur` (Ref → Auteurs). `categorie` → `theme` Compagnie.

Liste des 25 articles (titre — slug — statut) :

| # | Titre | Slug | Statut |
|---|-------|------|--------|
| 1 | Habilitation familiale et compte bancaire : guide complet | `habilitation-familiale-et-compte-bancaire-guide-complet` | Draft |
| 2 | Sénilité : signes, causes et accompagnement adapté | `senilite-signes-causes-et-accompagnement-adapte` | Draft |
| 3 | Lit médicalisé : prix, location et aides financières | `lit-medicalise-prix-location-et-aides-financieres` | Draft |
| 4 | Tout savoir sur les MARPA | `tout-savoir-sur-les-marpa` | Publié |
| 5 | Qu'est-ce que la démence et quelle est l'espérance de vie associée ? | `comment-se-manifeste-la-demence-et-quelle-est-lesperance-de-vie-associee` | Publié |
| 6 | Choisir entre un service à la personne prestataire ou mandataire | `choisir-entre-un-service-a-la-personne-prestataire-ou-mandataire` | Publié |
| 7 | Habiter la maison d'un parent en EHPAD : droits et démarches | `habiter-la-maison-dun-parent-en-ehpad-droits-et-demarches` | Publié |
| 8 | La gérontologie : définition et rôle | `gerontologie-et-geriatrie-en-detail` | Publié |
| 9 | Donation aux derniers vivants : avantages et inconvénients | `donation-aux-derniers-vivants-avantages-et-inconvenients` | Publié |
| 10 | Tout savoir sur l'avance sur l'héritage | `tout-savoir-sur-lavance-sur-lheritage` | Publié |
| 11 | Kiné à domicile pour personne âgée : infos et tarifs | `kine-a-domicile-pour-personne-agee-infos-et-tarifs` | Publié |
| 12 | Quel est le prix d'une aide ménagère à domicile ? | `quel-est-le-prix-dune-aide-menagere-a-domicile` | Draft |
| 13 | Pose d'un stent : Infos, danger, espérance de vie… | `pose-dun-stent-infos-danger-esperance-de-vie` | Publié |
| 14 | Aides à domicile : jour et nuit | `aides-a-domicile-jour-et-nuit` | Draft |
| 15 | Alzheimer à domicile : aides et infos | `alzheimer-a-domicile-aides-et-infos` | Publié |
| 16 | Le guide complet de l'accueil de jour pour personnes âgées | `le-guide-complet-de-laccueil-de-jour-pour-les-personnes-agees` | Publié |
| 17 | Tout savoir sur l'aide au jardinage pour les personnes âgées | `tout-savoir-sur-laide-au-jardinage-pour-les-personnes-agees` | Publié |
| 18 | Conseils pour l'aide à la toilette d'une personne âgée | `tout-savoir-sur-laide-a-la-toilette-pour-les-personnes-agees` | Draft + Archivé |
| 19 | La présence de nuit et la garde de nuit des personnes âgées en 2025 | `tout-savoir-sur-la-garde-de-nuit-personnes-agees` | Draft + Archivé |
| 20 | Trouver une auxiliaire de vie à domicile pour personnes âgées | `trouver-une-auxiliaire-de-vie-a-domicile-pour-personnes-agees` | Publié |
| 21 | Dame de compagnie à domicile : emploi, info et prix | `dames-de-compagnie-a-domicile-pour-les-seniors` | Publié |
| 22 | Tout savoir sur portage de repas à domicile pour personnes âgées | `tout-savoir-sur-portage-de-repas-a-domicile-pour-personnes-agees` | Publié |
| 23 | Grille AGGIR : définition, calcul, simulateur et PDF | `grille-aggir-definition-calcul-simulateur-et-pdf` | Publié |
| 24 | Guide sur la garde de personnes âgées entre particuliers | `tout-savoir-sur-la-garde-de-personnes-agees-entre-particuliers-a-domicile` | Draft + Archivé |
| 25 | Aide au lever et au coucher des personnes âgées | `aide-au-lever-et-au-coucher-des-personnes-agees` | Draft + Archivé |

### 4.4 Taxonomie « Articles - Thèmes » (Compagnie) — `673c735dd9635521f6a11522`

15 thèmes servant de `categorie`. Champs : `couleur`, bloc CTA popup (`cta-titre-popup`, `cta-link-popup`, `cta-texte-link-popup`, `cta-description-popup`, `cta-image-popup`, `cta-alt-image-popup`), `auteur` (Ref → Auteurs).

Thèmes existants (nom — slug) :
`Auxiliaire de vie` (`auxiliaire-de-vie`), `Mandataire` (`mandataire`), `Aide au lever` (`aide-au-lever`), `Héritage` (`heritage`), `PCH` (`pch`), `ASPA` (`aspa`), `APA` (`apa`), `Aides à l'autonomie` (`aide-a-lautonomie`), `Alimentation` (`alimentation`), `Santé` (`sante`), `Autonomie` (`autonomie`), `Aides financières` (`finance`), `Mobilité` (`transport`), `Culture` (`culture`, Draft), `Aides à domicile` (`aide-a-domicile`).

### 4.5 Collection « Auteurs » — `69b980444b31a10ebc12ccec` (1 auteur)

Champs : `photo` (Image), `bio` (PlainText), `fonction` (PlainText), `date` (PlainText), `linkedin` (Link), `email` (Email), `biographie-detaillee` (RichText), `name`, `slug`.

| Auteur | Slug |
|--------|------|
| Marc Pezeril | `marc-pezeril` |

### 4.6 Collection « CTa » (Compagnie) — `680116916ea6feaf3a5d0064`

Champs : `cta-titre-side`, `titre-cta-end`, `description-cta-end`, `text-bouton`, `link-bouton`. (NB : slugs légèrement différents du « CTA » du principal — `text-bouton` vs `texte-bouton`.)

### 4.7 Autres collections Compagnie (résumé)

- **Entreprises Aide à la personnes** (`individual`, 31) : annuaire SAP. `chapeau`, `presentation-entreprise` (RichText), `adresse`, `code-posta` (Option codes postaux), `type-de-service-2` (Prestataire/Mandataire/Les deux), `prix-horaire-en-eu` (Number), `logo-2`, `services` (MultiRef → services-cards), plusieurs Options Oui/Non (expérience, interlocuteur, devis, contrat…), `caracteristique-n1/2/3`, `mis-en-avant-4`.
- **Comparatif SAP** (`comparatif-services-a-la-personne`, 19) : pages « X vs Y ». `entreprise-1/2`, tarifs et avis, MultiRef vers `comparatif-vignettes`, nombreuses Options de comparaison (CESU, PCH, APA, aide à la toilette…), `texte-comparatif-1/2/3` (RichText), `auteurs`.
- **Villes** (`villes`, 22) : `meta-description`, `nom-ville`, `image-ville`, `h1`, `texte-banniere` (RichText), plusieurs blocs RichText de contenu, `page-d-accueil` (Option oui), `title-pour-home`.
- **FAQs** (`faq`) : `service` (Option, ~9 valeurs incl. Auxiliaire de vie, Mandataire…), `villes` (Option, 23 communes) + `villes-collection` (MultiRef → Villes), `titre-question`, `reponse-question-2` (RichText), `faq-principale` (Option oui).
- **Services cards** : `icone`. **Comparatif vignettes** : `image`, `alt-text-image`, `couleur-bg`.
- **Categories / Products / SKUs** : e-commerce Webflow standard.

---

## 5. Notes pour l'automatisation (création d'articles)

1. **Champs requis universels** : `name` (Title) et `slug`. Pour les collections e-commerce `Products`, `prix-exact` est aussi requis (non concerné par les articles).
2. **Slug** : alphanumérique, tirets autorisés, pas d'espaces/accents/caractères spéciaux, ≤ 256 car. Modifier un slug existant casse les liens.
3. **RichText = HTML** : `premier-rich-text`, `deuxieme-rich-text`, `table-des-matieres`, etc. attendent du HTML. Convertir le contenu rédigé (Markdown) en HTML avant l'envoi.
4. **References** : `categorie` (→ thème), `cta` (→ CTA/CTa), `auteur`/`auteurs` (→ Auteurs) attendent l'**ID d'un item existant** de la collection cible. Récupérer la liste des thèmes/auteurs/CTA d'abord.
5. **Création en draft** : l'API crée les items en draft (`isDraft: true`) par défaut. Publication = appel `publish_collection_items` distinct (publie sur le live).
6. **Cycle recommandé** : créer en draft → relire dans l'éditeur Webflow → publier. Ne jamais publier sans relecture pour du contenu rédactionnel.
7. **Choix de la collection cible** : dépend du sujet et du site. Sur Compagnie, un sujet « service » va dans sa collection dédiée (aide-menagere, garde-de-nuit…) ; un sujet éditorial transverse va dans `nos-conseils`. Sur le principal, l'éditorial loisirs/vie quotidienne va dans `bonnes-idees`.
8. **Cohérence du nom du champ auteur** : vérifier `auteur` vs `auteurs` selon la collection (voir §4.2).

---

## 6. Sources

Données extraites via MCP Webflow (API Data v2) : `list_sites`, `get_collection_list`, `get_collection_details`, `list_collection_items`. Synchronisation du 2026-06-26.
