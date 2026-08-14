Root-level bottom tab bar. Pass icons as nodes (this app uses Lucide icons — see readme ICONOGRAPHY).

```jsx
<BottomNav
  items={[
    { icon: <i data-lucide="layout-grid" />, label: "Dashboards" },
    { icon: <i data-lucide="badge-check" />, label: "Calidad" },
  ]}
  activeIndex={0}
  onChange={setTab}
/>
```
