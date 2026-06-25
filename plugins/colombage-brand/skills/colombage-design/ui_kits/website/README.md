# ColombAge — Marketing Website UI kit

Cosmetic recreation of the ColombAge public landing page. Self-contained
(no compiled bundle required); visuals follow `styles.css` tokens.

## Run
Open `index.html`.

## Sections
- **Header** — sticky, logo + nav + "Espace client" + primary CTA.
- **Hero** — headline, subcopy, dual CTA, trust badges, photo `image-slot`,
  floating "prochaine visite" card.
- **Services** — 3-column grid of the six core services.
- **Comment ça marche** — 3 numbered steps on a periwinkle band.
- **Testimonial** — family-member quote.
- **Footer CTA** — navy "Parlons de vos besoins" block.
- **Footer** — link columns + copyright.

## Files
- `index.html` — page shell + script loading.
- `sections.jsx` — all section components + `WIcon`/`WBtn` helpers + service data.
- `image-slot.js` — drag-and-drop photo placeholder (hero).

## Notes
Desktop layout (~1180px content width). Icons are Lucide. The hero photo is an
`<image-slot>` — drop in a warm, naturally-lit photo of a senior being
accompanied. French copy, sentence case, warm/reassuring tone.
