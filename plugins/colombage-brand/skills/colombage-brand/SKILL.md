---
name: colombage-brand
version: 2.0.0
last_updated: 2026-06-10
description: >
  Directeur artistique IA pour ColombAge. Applique la charte graphique officielle
  v2 (design system Claude Design, juin 2026) à toute production visuelle :
  slides, présentations, pages web, flyers, emails, composants HTML/React/SVG.
  À lire en PREMIER avant tout output visuel ColombAge.
triggers:
  - "présentation ColombAge"
  - "slide ColombAge"
  - "page web ColombAge"
  - "flyer ColombAge"
  - "design ColombAge"
  - "charte ColombAge"
  - "brand ColombAge"
---

# ColombAge — Brand SKILL v2.0

> **v2.0 (2026-06-10)** : charte alignée sur le design system officiel créé dans
> Claude Design. Changements majeurs vs v1 : typographie **Varela Round** unique
> (remplace DM Serif Display + Source Sans 3), **radius proportionnels**
> (remplace les pilules 999px sur les boutons), **fonds plats** (dégradés et
> blobs supprimés), **pervenche `#B8C1EC`** remplace la lavande comme couleur
> calme. Le design system complet (tokens CSS, composants React, UI kits) vit
> dans la skill `colombage-design` et dans
> `02 Marketing/Site internet/Design system/` du vault Développement.

---

## 0. PROTOCOLE D'ACTIVATION

Avant tout output visuel, l'agent doit :

1. Lire ce fichier en entier
2. Identifier le TYPE DE SUPPORT (slide / web / flyer / email / composant)
3. Identifier la CIBLE (senior / famille / jeune / partenaire institutionnel / investisseur)
4. Choisir la combinaison de fond appropriée (section 3)
5. Appliquer la checklist 12 points (section 10) avant de livrer

Pour du code production ou des prototypes HTML/React : utiliser les **tokens CSS
du design system** (`colombage-design` → `styles.css` + `tokens/`) plutôt que des
valeurs en dur.

---

## 1. IDENTITÉ DE MARQUE

### Qui est ColombAge ?

ColombAge est une startup sociale française (ESS — Économie Sociale et Solidaire),
fondée en 2023. Elle opère sur deux pôles complémentaires :

- **Cohabitation intergénérationnelle** : mise en relation seniors (hôtes) et jeunes
- **Aide à domicile** : via ColombAge Compagnie (mandataire SAP certifié)

Zone principale : Paris & Île-de-France. Expansion : Lille, Nice, Lyon, Bordeaux.

### Mission officielle

> "Un accompagnement humain au service des seniors."

### Valeurs fondatrices

**Partage · Solidarité · Soutien · Entraide**

Ces quatre mots doivent guider chaque choix visuel. Le design ColombAge
n'est jamais froid, jamais corporate, jamais anxiogène.

---

## 2. L'ÉMOTION DERRIÈRE LE DESIGN

### Territoire émotionnel

| Émotion | Ce que ça traduit visuellement |
|---|---|
| **Sécurité** | Formes rondes (radius proportionnels), pas d'angles vifs, espaces aérés |
| **Chaleur** | Rose en petites touches, photos de visages souriants, crème chaleureux |
| **Confiance** | Navy profond, Varela Round lisible, hiérarchie claire |

### Ce que le design NE DOIT PAS évoquer

- ❌ Hôpital / médical (blanc froid, bleu clinique)
- ❌ Administratif lourd (gris, Times New Roman, colonnes de texte)
- ❌ Urgence / alarme (rouge, orange, exclamations)
- ❌ Technologie froide (dégradés violets, glassmorphism)
- ❌ Vieillesse stigmatisée (couleurs ternes, photos de personnes isolées)

### Le bon mot pour chaque couleur

| Couleur | Mot-clé | Usage |
|---|---|---|
| Navy `#304969` | CONFIANCE | Titres, fond hero, footer, CTA principaux |
| Rose `#EEBBC3` | CHALEUR | Accents, séparateurs, chips — par petites touches |
| Pervenche `#B8C1EC` | SÉRÉNITÉ | Surfaces d'info, focus, fonds calmes |
| Crème `#FBFAF8` | LÉGÈRETÉ | Fond de page par défaut |
| Blanc `#FFFFFF` | AIR | Cartes, surfaces |

---

## 3. PALETTE DE COULEURS

### Couleurs primaires (les deux principales : navy + blanc)

```
Navy principal    #304969    rgb(48, 73, 105)     --navy-600
Blanc             #FFFFFF                          --white
Crème (page)      #FBFAF8                          --cream
```

### Accents

```
Rose doux         #EEBBC3    --pink-400   (accent chaleureux, parcimonie)
Pervenche         #B8C1EC    --peri-400   (secondaire calme, focus ring)
```

### Déclinaisons utiles (tokens du design system)

```
Navy texte fort   #1d2e44    --navy-900 / --text-strong
Navy corps        #2a4058    --navy-700 / --text-body
Navy estompé      #5c769b    --navy-400 / --text-muted
Bordure douce     #e2e7ef    --navy-100
Fond sunken       #f2f5f9    --navy-50
Rose pâle         #fceff1    --pink-100  (surface accent)
Pervenche pâle    #f0f2fb    --peri-100  (surface info)
```

### Statuts (doux, jamais néon)

```
Succès   #4e8d6e  (fond #e3f0ea)
Alerte   #c98a3c  (fond #f8ecda)
Danger   #c2596a  (fond #f7e3e6)
```

### Combinaisons de fonds autorisées

| Fond | Texte principal | Accent | Usage typique |
|---|---|---|---|
| Crème `#FBFAF8` | Navy `#304969` | Rose `#EEBBC3` | Page / slide contenu par défaut |
| Blanc `#FFFFFF` | Navy `#304969` | Pervenche | Cartes, sections légères |
| Navy `#304969` | Blanc | Rose `#EEBBC3` | Hero, footer, slides de transition |
| Pervenche pâle `#f0f2fb` | Navy | Navy | Sections d'info, encadrés |
| Rose pâle `#fceff1` | Navy | Navy | Encadrés chaleureux, badges |

### RÈGLES D'OR

> Navy et Rose ne s'affrontent JAMAIS en grandes masses côte à côte.
> L'un est toujours dominant, l'autre est accent.
>
> **Fonds PLATS uniquement.** Aucun dégradé, aucun blob flouté, aucun
> glassmorphism, aucune texture. La profondeur vient exclusivement des
> ombres douces teintées navy.

---

## 4. TYPOGRAPHIE

### Une seule famille : Varela Round

| Rôle | Police | Fallback | Poids |
|---|---|---|---|
| Tout (titres, corps, labels) | Varela Round | ui-rounded, 'Segoe UI', system-ui, sans-serif | 400 uniquement |

Varela Round n'existe qu'en graisse 400 : **la hiérarchie vient de la taille, de
la couleur et de l'espacement — jamais du gras** (pas de faux-bold).

### Import Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
```

### Échelle typographique (tokens)

```
--text-xs  13px · --text-sm 15px · --text-base 18px (corps par défaut)
--text-md  20px · --text-lg 24px · --text-xl 30px
--text-2xl 38px · --text-3xl 48px · --text-4xl 60px
```

### Hiérarchie slides (16:9)

```
H1 slide hero      : 48–60px  Varela Round  navy ou blanc, letter-spacing -0.01em
H2 titre section   : 38px     Varela Round  navy
H3 sous-titre      : 24px     Varela Round  navy-400 (estompé)
Corps texte        : 18–20px  Varela Round  navy-700, interligne 1.7
Eyebrow / label    : 15px     uppercase, letter-spacing +0.04em, navy-400
```

### Hiérarchie web

```
H1 hero page       : 48–60px  interligne 1.15
H2 section         : 30–38px
H3 carte           : 20–24px
Body               : 18px     interligne 1.7 (lisibilité seniors)
Small / caption    : 13–15px  navy-400
```

### Règles typographiques strictes

- ❌ Jamais de gras (la police n'en a pas — pas de faux-bold)
- ❌ Jamais de texte ALL CAPS sauf petits eyebrows (15px max, tracking +0.04em)
- ✅ Interligne 1.7 sur le corps (lecteurs âgés)
- ✅ Letter-spacing -0.01em sur les grands titres, +0.04em sur les eyebrows

---

## 5. FORMES & ORNEMENTS

### Philosophie : tout est arrondi, proportionnellement

Le radius est **proportionnel à la taille de l'élément** pour une courbure
visuellement cohérente partout :

```
--radius-control  14px   boutons, champs, petits contrôles (~48px de haut)
--radius-card     20px   cartes standard, lignes de liste
--radius-panel    28px   grands panneaux, modales
--radius-hero     36px   blocs hero, bandeaux CTA
--radius-pill     999px  UNIQUEMENT chips, badges, avatars, pastilles, toggles
```

> ⚠️ Les **boutons ne sont PAS des pilules** : 14px (`--radius-control`).
> Les pilules sont réservées aux petits éléments ronds (chips, badges, avatars).

**Règle d'imbrication concentrique** : rayon intérieur = rayon extérieur − marge.
Ex. carte 20px avec padding 8px → l'image dedans prend 12px.

### Ombres (douces, teintées navy — jamais noires)

```css
--shadow-sm: 0 2px 8px  rgba(48,73,105,.08);
--shadow-md: 0 6px 18px rgba(48,73,105,.10);   /* cartes par défaut */
--shadow-lg: 0 14px 36px rgba(48,73,105,.14);  /* hover, modales */
```

### Séparateurs

```css
/* Séparateur rose fin sous un titre de section */
.divider {
  width: 60px; height: 3px;
  background: #EEBBC3;
  border-radius: 999px;
  margin: 16px auto;
}
```

### Badges / chips (les seuls éléments en pilule)

```css
.badge {
  display: inline-flex; align-items: center;
  padding: 6px 16px;
  border-radius: 999px;
  font: 400 14px 'Varela Round', sans-serif;
}
.badge-navy  { background: #304969; color: #fff; }
.badge-pink  { background: #f8dfe3; color: #2a4058; }
.badge-peri  { background: #e0e4f7; color: #2a4058; }
```

### Icônes

- Source : **Lucide** (CDN `https://unpkg.com/lucide@latest`) — caps arrondis, trait 2px
- Couleur : navy sur fond clair, blanc/rose sur fond navy
- Taille : 24px par défaut, 32–40px dans les cartes
- ❌ Jamais d'emoji ni de caractères Unicode en guise d'icônes

---

## 6. COMPOSANTS RÉCURRENTS

> Versions React complètes dans la skill `colombage-design`
> (`components/` : Button, Badge, Avatar, Card, Input, Switch, Checkbox, ServiceCard).

### Boutons

```css
/* CTA principal */
.btn-navy {
  background: #304969; color: #fff;
  border-radius: 14px;                 /* --radius-control, PAS 999px */
  padding: 14px 28px; min-height: 48px;
  font: 400 18px 'Varela Round', sans-serif;
  border: none; cursor: pointer;
  transition: background .15s ease, transform .12s ease;
}
.btn-navy:hover  { background: #2a4058; }
.btn-navy:active { transform: scale(.97); }   /* petit squish amical */

/* CTA secondaire (rose) */
.btn-pink {
  background: #EEBBC3; color: #2a4058;
  border-radius: 14px; padding: 12px 24px; min-height: 48px;
}
.btn-pink:hover { background: #e3a0ad; }

/* Ghost / outline */
.btn-ghost {
  background: transparent; color: #304969;
  border: 1.5px solid #b9c4d6; border-radius: 14px;
  padding: 12px 24px; min-height: 48px;
}
```

Tap targets : **minimum 48px**, actions principales 60px.

### Carte de service

```css
.card {
  background: #fff;
  border-radius: 20px;                  /* --radius-card */
  border: 1.5px solid #e2e7ef;
  padding: 28px 24px;
  box-shadow: 0 6px 18px rgba(48,73,105,.10);
  transition: transform .15s ease, box-shadow .15s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(48,73,105,.14);
}
```

Structure type : icône Lucide 40px navy → titre 20–24px navy →
séparateur rose 60×3px → corps 18px → CTA.

### Focus (accessibilité)

```css
:focus-visible { outline: 3px solid #B8C1EC; outline-offset: 2px; }
```

### Slide hero (fond navy plat)

```
[LOGO haut gauche : logo-mark.svg (pervenche) + "ColombAge" blanc]

  BADGE PILL (ex: "Fondée en 2023")

  Titre H1 Varela Round, blanc, 48–56px, max 2 lignes

  Sous-titre Varela Round, blanc 80% opacité, 18–20px, max 3 lignes

  [CTA rose 14px] [CTA outline blanc 14px]

[CHIFFRE CLÉ flottant bas droit, carte blanche radius 20px]
```

Fond navy **uni** — pas de blob, pas de dégradé.

### Slide contenu (fond crème plat)

```
[EYEBROW uppercase pervenche/navy-400]
[TITRE SECTION navy, Varela Round 38px]
[séparateur rose 60px]

[Grille 2-3 colonnes de cartes blanches radius 20px, gap 24px]

[footer discret : logo + téléphone + site]
```

### Étapes / processus

```
① [badge navy rond numéroté]  Titre étape 20px navy
   Description courte, 2 lignes max
   ↓ (flèche fine navy — icône Lucide)
② ...
```

### Logos

- `logo-mark-navy.svg` — maison navy, pour **fonds clairs**
- `logo-mark.svg` — maison pervenche, pour **fonds navy/foncés**
- Sur fond navy : petit logo SVG + wordmark « ColombAge » blanc, **séparés**, même taille (72×72)
- Le lockup logo = « ColombAge » seul, **sans tagline** intégrée

(Fichiers dans `colombage-design/assets/` et dans le vault
`02 Marketing/Site internet/Design system/assets/`.)

---

## 7. RÈGLES DE COMPOSITION

### Pour les slides (16:9)

- **Marges** : 64px sur tous les côtés
- **Maximum 5 éléments textuels par slide** — 1 idée par slide
- **Alternance** : slide navy (impact/transition) → slide crème (contenu)
- **Logo** : toujours présent, haut gauche ou droit, ~80px de hauteur
- **Footer** : présent sur les slides contenu — téléphone + site

Ratio slides recommandé :
```
1 slide hero navy        (ouverture)
1 slide problème         (fond blanc, texte navy)
2-3 slides solution      (fond crème, cartes blanches)
1 slide chiffres clés    (fond navy, chiffres en rose)
1 slide équipe           (portraits circulaires, fond crème)
1 slide CTA / contact    (fond navy)
```

### Pour le web

- **Hero** : fond crème ou navy, **plat** ; image photo arrondie (radius 28–36px)
- **Sections contenu** : alternance blanc / crème / pervenche pâle
- **Section engagement** : 3 colonnes, icônes Lucide centrées, séparateur rose
- **Footer** : fond navy, logo pervenche, liens navy-200/300
- **Max-width container** : 1200px, margin auto
- **Padding section** : 80px vertical desktop, 48px mobile
- **Gap cartes** : 24–32px
- **Motion** : transitions 120–150ms ease, douces — jamais bouncy

### Photographies

- **Style** : authentiques, lumière naturelle chaude, jamais de stock stéréotypé
- **Sujets** : senior souriant + jeune ensemble, auxiliaire avec senior (regard positif)
- **Traitement** : légèrement chaud, jamais désaturé ni clinique
- **Crop** : portraits en cercle ou rectangle avec radius 16–20px (concentrique si imbriqué)
- **Overlay** : si texte sur photo, voile navy uni 40-60% d'opacité (pas de dégradé)

---

## 8. CHIFFRES CERTIFIÉS (NE PAS MODIFIER)

Ces chiffres sont extraits des documents officiels ColombAge.
Ne jamais inventer de nouveaux chiffres.

```
97%          clients recommandent ColombAge Compagnie
400+         seniors ont fait confiance à ColombAge (cohabitation)
500€         loyer maximum/mois pour le senior hôte (exonéré d'impôt)
30%          loyers en dessous du marché pour les jeunes
100%         gratuit pour les seniors (mise en relation cohabitation)
30€          TTC/heure — aide à domicile ColombAge Compagnie
50%          crédit d'impôt sur les dépenses SAP
12 000€      plafond annuel du crédit d'impôt
3 ans        expérience minimum auxiliaires de vie
2023         année de création de ColombAge
109          cohabitations actives à Paris (réf. présentation V2)
3            fondateurs : Jean-Baptiste Serot, Paul Schneider,
             Marc Pezeril
```

---

## 9. FORMULATIONS OFFICIELLES

Ces textes sont à utiliser textuellement dans les productions.

```
Accroche cohabitation    : "Restez chez soi, mieux entouré"
Tagline Compagnie        : "Votre bien-être, notre priorité"
Mission                  : "un accompagnement humain au service des seniors"
Baseline cohabitation    : "une équipe de confiance pour encadrer
                            votre cohabitation de A à Z"
Statut ESS               : "entreprise de l'Économie Sociale et Solidaire"
Engagement 1             : "Notre priorité : le bien-être des seniors"
Engagement 2             : "Guider et conseiller pour mieux anticiper"
Engagement 3             : "Créer des liens pour rompre l'isolement"
```

Voix : chaleureuse et rassurante, jamais clinique ni alarmiste. Vouvoiement
(**vous**), équipe = **nous**. Les intervenantes sont des « auxiliaires de vie ».
Pas d'emoji dans l'UI produit. ⚠️ La tagline « Bien chez soi » n'est PAS
intégrée au lockup logo (copy d'ambiance uniquement, si souhaité).

Témoignages officiels (seuls cités dans les documents) :
- Valérie (senior, Paris)
- Anne & JE

---

## 10. CHECKLIST D'AUTO-ÉVALUATION (12 points)

Avant de livrer tout output visuel, vérifier chaque point :

```
□ 1.  Palette respectée — navy/blanc dominants, rose & pervenche en accents
□ 2.  Navy et Rose jamais en masses égales côte à côte
□ 3.  Fonds PLATS — aucun dégradé, blob, blur ou glassmorphism
□ 4.  Varela Round partout, graisse 400 uniquement (pas de faux-bold)
□ 5.  Hiérarchie par taille/couleur/espacement, corps 18px interligne 1.7
□ 6.  Radius proportionnels : boutons 14px, cartes 20px, panneaux 28px,
      hero 36px — pilules réservées aux chips/avatars/badges
□ 7.  Imbrications concentriques (intérieur = extérieur − marge)
□ 8.  Ombres douces teintées navy — jamais de noir dur
□ 9.  Aucun chiffre inventé — uniquement les chiffres certifiés section 8
□ 10. Logo ColombAge visible (bon SVG selon le fond), sans tagline
□ 11. Émotions correctes : sécurité + chaleur + confiance — rien de médical
□ 12. Tap targets ≥ 48px ; focus ring pervenche 3px ; max 5 éléments
      textuels par slide

Score 12/12 → livrer
Score 10-11 → corriger les écarts non critiques
Score < 10  → refaire
```

---

## 11. CE QUE L'AGENT NE DOIT PAS FAIRE

```
✗ Utiliser DM Serif Display, Source Sans 3, Inter, Roboto, Arial (charte v1 obsolète)
✗ Mettre du gras ou un faux-bold sur Varela Round
✗ Faire des boutons en pilule 999px (c'est 14px depuis la v2)
✗ Utiliser des dégradés, blobs floutés, glassmorphism ou textures
✗ Utiliser la lavande #E6E9F8 (remplacée par la pervenche #B8C1EC et ses pâles)
✗ Créer des slides avec plus de 5 éléments textuels
✗ Inventer des chiffres ou statistiques
✗ Utiliser un style médical/hôpital (blanc froid, croix rouge)
✗ Placer Navy et Rose en grandes masses côte à côte
✗ Utiliser des angles vifs (border-radius 0) ou des emoji comme icônes
✗ Créer des illustrations de seniors isolés, tristes, ou dépendants
✗ Ajouter des noms d'équipe non listés dans les sources
✗ Mentionner des villes non confirmées comme zones de déploiement
✗ Intégrer une tagline dans le lockup logo
```

---

## 12. CONTACT & INFORMATIONS LÉGALES

```
Téléphone seniors      : 0973 674 730
Téléphone Compagnie    : 09 78 45 19 84
Site cohabitation      : colombage-cohabitation.fr
Site Compagnie         : sap.colombage-cohabitation.fr
Réseaux sociaux        : Facebook, LinkedIn, Instagram
Agrément               : SAP certifié (mandataire)
Statut                 : ESS — Entreprise de l'Économie Sociale et Solidaire
```

---

## 13. WORKFLOW DE PRODUCTION RECOMMANDÉ

```
1. LIRE ce fichier en entier
2. POUR DU CODE : charger les tokens du design system (skill colombage-design)
3. IDENTIFIER : support + cible + objectif
4. CHOISIR : combinaison de fond (section 3)
5. STRUCTURER : contenu (règle 1 idée / slide ou 1 service / carte)
6. RÉDIGER : avec les formulations officielles (section 9)
7. METTRE EN FORME : palette + Varela Round + radius proportionnels + ombres douces
8. AUTO-ÉVALUER : checklist 12 points (section 10)
9. LIVRER : signaler tout écart volontaire avec justification
```
