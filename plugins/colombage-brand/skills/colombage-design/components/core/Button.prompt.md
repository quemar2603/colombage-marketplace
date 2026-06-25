Large rounded pill button for primary and secondary actions — use for any tappable command.

```jsx
<Button variant="primary" size="lg" onClick={book}>Réserver une visite</Button>
<Button variant="accent">Nous appeler</Button>
<Button variant="outline" iconLeft={<Icon/>}>Détails</Button>
```

Variants: `primary` (navy, default), `secondary` (periwinkle tint), `accent` (soft pink, for warm CTAs), `outline`, `ghost`. Sizes `md` (48px) / `lg` (60px). Pass `fullWidth` for stacked mobile layouts. Buttons stay 400 weight — hierarchy comes from color, not boldness.
