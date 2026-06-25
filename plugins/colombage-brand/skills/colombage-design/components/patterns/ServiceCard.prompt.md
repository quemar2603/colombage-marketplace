Tappable card presenting one home-care service — icon tile + title + description.

```jsx
<ServiceCard
  title="Aide aux courses"
  description="Un accompagnement chaque semaine pour vos achats."
  meta="Dès 22 € / visite"
  tone="pink"
  icon={<i data-lucide="shopping-basket"></i>}
  selected={chosen === 'courses'}
  onClick={() => choose('courses')}
/>
```

Tones color the icon tile (`pink`, `peri`, `navy`). Pass `selected` to show the pink selection ring. Use with Lucide icons.
