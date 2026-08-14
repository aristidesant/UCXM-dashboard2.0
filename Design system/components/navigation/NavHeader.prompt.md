Centered-title header bar with an optional leading back chevron, used at the top of every pushed detail screen.

```jsx
<NavHeader title="Localizacion" onBack={() => history.back()} />
```

Omit `onBack` for a screen with no back action (e.g. a root tab screen), or pass `trailing` for a rare right-side action.
