# ColombAge — Mobile App UI kit

Interactive, cosmetic recreation of the ColombAge home-care app for older adults
and their families. Self-contained (does not require the compiled bundle) so it
renders anywhere; visuals follow `styles.css` tokens.

## Run
Open `index.html`. The app boots on the **Accueil** (home) screen inside a phone frame.

## Surfaces
- **Accueil** — greeting, next-visit hero (caregiver, time, message/call), quick
  service grid, trust strip.
- **Services** — filterable list of all home-care services.
- **Booking flow** — tap any service → choose day + time slot → confirm → success.
- **Messages** — conversation list with caregivers, the team and proches aidants.
- **Profil** — account rows + notification toggles.

## Files
- `index.html` — phone shell + script loading (React, Babel, Lucide).
- `ui.jsx` — inlined primitives: `Icon`, `Btn`, `Chip`, `Avatar`, `Tile`.
- `screens.jsx` — `HomeScreen`, `ServicesScreen`, `BookingScreen`, `ConfirmScreen`, `ProfileScreen`, service data.
- `App.jsx` — routing, bottom nav, `MessagesScreen`.

## Notes
Icons are Lucide (rounded, 2px stroke). All copy is French, sentence case, warm
and reassuring. Tap targets ≥48px. No glassmorphism, flat warm surfaces only.
