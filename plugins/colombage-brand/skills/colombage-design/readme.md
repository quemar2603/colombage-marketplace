# ColombAge — Design System

**ColombAge** ("*Bien chez soi*") helps older adults stay safely and happily at
home, by coordinating warm, human services — companionship, light housekeeping,
help with errands, meal support and regular check-in visits. The brand voice is
**warm, reassuring, and unhurried**; the visual world is **soft, rounded and
gentle**, built on a trustworthy navy with tender pink and periwinkle accents.

> Source material: brand marks (`assets/logo-mark-navy.svg` for light backgrounds,
> `assets/logo-mark.svg` for dark) — a house sheltering two figures —
> plus a brief specifying typography (Varela Round), palette
> (`#B8C1EC`, `#EEBBC3`, `#304969`, `#FFFFFF` — the latter two are primary),
> rounded corners, soft pink separators, a warm/reassuring atmosphere, and
> **no glassmorphism**. There is no prior codebase or Figma file.

---

## Index / manifest

- `styles.css` — the single entry point consumers link. `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — reusable React primitives (see below).
- `ui_kits/` — full-screen product recreations (mobile app, marketing site).
- `assets/` — `logo-mark-navy.svg` (navy mark for light backgrounds),
  `logo-mark.svg` (periwinkle mark for navy/dark backgrounds).
- **Photo library** — lives in the shared Drive (team access):
  `G:\Mon Drive\Colombage\Developpement\02 Marketing\Photothèque\`
  (~68 images, use instead of `<image-slot>` placeholders). Naming prefixes:
  - `senior-*` — authentic brand shoots: seniors at home with companions
    (café, cuisine, bibliothèque, salle à manger). **Prefer these.**
  - `equipe-*` — founders & team (navy ColombAge jackets, portraits, visio,
    terrain) · `solidarite-*` — ColombAge Solidarité events (group photo, rires).
  - `profil-*` — individual headshots (marc, jbs, jbr, paul).
  - `stock-*` — licensed stock (Adobe/Shutterstock/Pexels/Unsplash): seniors +
    aidants, informatique, courses, jardin, jeux, mains, aide à domicile. Use
    when no authentic shot fits; pick the warmest, most natural ones.
  - `Shooting cohabitation/` subfolder — 20 authentic shoot photos (senior +
    young companion, Parisian flat); best standing duo: IMG_4385.
  - `.webp` duplicates of some `.jpg`/`.png` are pre-optimized for web.
- `SKILL.md` — portable Agent Skill wrapper.

**Components** (`window.ColombAgeDesignSystem_008fae`):
- `core/` — `Button`, `Badge`, `Avatar`, `Card`
- `forms/` — `Input`, `Switch`, `Checkbox`
- `patterns/` — `ServiceCard` (home-care service tile)

**UI kits**:
- `ui_kits/mobile_app/` — interactive home-care booking app (Accueil, Services,
  booking flow, Messages, Profil).
- `ui_kits/website/` — marketing landing page (hero, services, how-it-works,
  testimonial, footer CTA).

**Starting points**: `Button` (Core), `ServiceCard` (Patterns).

---

## Content fundamentals

- **Language:** French-first (the product serves French families). Copy is short,
  plain and concrete — "*Réserver une visite*", "*Aide aux courses*".
- **Voice:** warm and reassuring, never clinical or alarmist. We speak *with* the
  family, not down to the elder. Prefer "*nous veillons sur…*" over feature-speak.
- **Person:** address the reader as **vous** (respectful), refer to the team as
  **nous**. Caregivers are "*auxiliaires de vie*".
- **Casing:** sentence case for everything except small uppercase eyebrows
  (`.ca-eyebrow`, tracked +0.04em). No ALL-CAPS shouting in body copy.
- **Tone words:** serein, chaleureux, présence, proximité, simplicité.
- **No emoji** in product UI — warmth comes from color, roundness and real human
  photography, not emoji or exclamation marks.
- **Numbers stay human:** "*chaque semaine*" over "*7-day cadence*".

---

## Visual foundations

- **Color:** deep navy `#304969` is the backbone (brand, primary actions, text on
  light). White/cream surfaces keep things airy. Soft pink `#EEBBC3` is the warm
  accent used sparingly — small separators, chips, the occasional CTA. Periwinkle
  `#B8C1EC` is the calm secondary for info surfaces. Status colors are muted and
  on-brand, never neon.
- **Type:** one family — **Varela Round** (single 400 weight). Hierarchy comes from
  size, color and spacing, not boldness. Base body is a generous **18px** with
  relaxed 1.7 line-height for older readers.
- **Shape & radius:** rounded everywhere, and **proportional to element size**.
  Use the semantic aliases so curvature stays consistent: `--radius-control`
  (14px, inputs/buttons) · `--radius-card` (20px, cards/rows) · `--radius-panel`
  (28px, large panels) · `--radius-hero` (36px, CTA/hero blocks). Chips, dots,
  avatars and toggles are fully round (`--radius-pill`). For nested elements use
  **concentric radii**: inner = outer − gap. No sharp corners anywhere.
- **Spacing:** airy, 4px-based. Tap targets are large (≥48px, primary 60px) for
  accessibility.
- **Backgrounds:** flat, warm cream or white. **No gradients, no glassmorphism,
  no blur, no texture.** Depth comes only from soft, navy-tinted shadows.
- **Shadows:** gentle and diffuse (`0 6px 18px rgba(48,73,105,.10)`); pink accents
  may carry a soft warm glow. No hard black drop shadows.
- **Borders:** hairline 1.5px in navy-100/200; pink-300 for accented surfaces.
- **Hover:** cards lift 3px + deeper shadow; buttons keep color, no underline.
- **Press:** buttons scale to 0.97 (a small, friendly squish). No color flip.
- **Motion:** short (120–150ms) ease transitions. Gentle, never bouncy or flashy.
- **Focus:** 3px periwinkle ring, 2px offset — visible and calm.
- **Imagery:** warm, natural light, real people; rounded corners; never cold or
  clinical stock. Real photography lives in the shared Photothèque (see Index) —
  prefer it over `<image-slot>` placeholders.

---

## Iconography

ColombAge has **no bespoke icon font**. We standardize on **Lucide** (loaded from
CDN) — its rounded caps and even 2px stroke match Varela Round's friendly geometry.
Use line icons at 24px in navy; never fill-heavy or sharp icon sets. No emoji and
no Unicode dingbats as icons. The brand mark (house + couple) is the only
illustrative asset and is used as a logo, not decoration.

```html
<script src="https://unpkg.com/lucide@latest"></script>
```
