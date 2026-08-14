Full-bleed background layer: the app's flat surface color plus its subtle green/blue radial gradient wash. Use as the outermost wrapper of any screen.

```jsx
<BackgroundWash style={{ minHeight: "100vh" }}>
  <NavHeader title="Dashboards" />
  ...
</BackgroundWash>
```

Automatically switches to the dark-theme wash when an ancestor has `data-theme="dark"` — no separate dark prop needed.
