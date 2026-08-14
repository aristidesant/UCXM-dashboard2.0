Row for account/settings screens. Pair with `Toggle`, `RadioDot`, or a chevron icon as `control`.

```jsx
<SettingsRow icon={<i data-lucide="key" />} title="Cambiar contraseña" subtitle="Actualiza tu contraseña" control={<i data-lucide="chevron-right" />} />
<SettingsRow icon={<i data-lucide="scan-face" />} title="Inicio de sesión biométrico" control={<Toggle checked />} />
<SettingsRow title="Cerrar sesión" danger control={<i data-lucide="chevron-right" />} />
```
