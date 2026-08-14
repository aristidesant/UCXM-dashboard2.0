# CMX Dashboard Design System

Design system extracted from 8 screenshots of an iOS app used by call-center agents to monitor outbound/inbound calling campaigns ("Localizacion" dashboards) — status, contact rates, contact lists, and account settings. The app fetches its data from another backend system; this is a display/reporting client, not a source of truth.

**Source:** 8 screenshots supplied directly in chat (no Figma or codebase access). Screenshots only — component values are close approximations of the real UI, not exact pixel measurements. Re-attach a Figma file or codebase for pixel-exact tokens.

**Brand name shown in-app:** none — no logo appears in any screenshot. The account is "Newtech SRL" / `newtechsa.com`; "CMX Dashboard" is a placeholder name for this system. No logo was drawn; the brand name renders as plain type wherever a mark would go.

## Index
- `styles.css` — root stylesheet, imports all tokens
- `tokens/` — colors, typography, spacing, effects (radii/shadows/background wash)
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/navigation/` — NavHeader, TopTabs, SegmentedControl, BottomNav
- `components/cards/` — StatCard, ProfileCard
- `components/lists/` — ListRow
- `components/forms/` — Toggle, RadioDot, SettingsRow, Chip, FilterRow, SearchBar, Button
- `components/feedback/` — SectionLabel, Badge, BackgroundWash
- `ui_kits/cmx-dashboard/` — interactive click-through recreation (Dashboards → Localizacion → Filtros; Ajustes)
- `SKILL.md` — portable skill file for Claude Code

## Intentional additions
No codebase or Figma component inventory was available, so the component list above was derived directly from what's visible across the 8 screenshots — nothing was added beyond that. Icons use the open-source Lucide set (CDN) as a substitute for the app's real icon font, which we don't have access to; see ICONOGRAPHY below.

## Content fundamentals
- **Language:** all copy is Spanish (Dominican Republic context — "Ola 1/2", `.com` domain `newtechsa.com`).
- **Tone:** operational and literal — labels are direct nouns/verbs ("Cambiar cliente", "Cerrar sesión", "Enviar Dirección Cliente"), no marketing voice, no exclamation points, no emoji anywhere.
- **Casing:** sentence case for row titles and body copy; small uppercase tracked labels for section headers ("DESGLOSE", "CUENTA", "SEGURIDAD", "RESULTADO").
- **Numbers:** percentages always to two decimals ("70.00%", "0.00%"); counts shown in parentheses after a label ("Todos (15)").
- **Voice:** impersonal/third-person, not "tú" or "usted" direct address, except in settings help text ("Usa Face ID o Touch ID para iniciar sesión más rápido", "Actualiza tu contraseña para mantener tu cuenta segura" — informal "tú" only in these two helper lines).

## Visual foundations
- **Type:** iOS system font (SF Pro / -apple-system), bold weights for nearly everything with content weight — titles, row titles, values — regular weight reserved for placeholder/secondary text. No serif, no display font.
- **Color:** two accent hues on a near-white ground. Green (`--accent-primary`) marks affirmative/brand state — toggles, avatar circles, active filter chips, the "Enviar Dirección Cliente" contact-action text, biometric-toggle highlight border. Blue (`--accent-interactive`) marks interactive/informational state — active tab underline, active bottom-nav icon, percentage figures, chart line/fill. Red is reserved for negative deltas and destructive actions ("Cerrar sesión", "-30.0%"). No purple, no gradients on UI elements (only a very soft green/blue radial wash behind the whole screen).
- **Backgrounds:** flat off-white/light-gray app background (`--surface-app`) with a subtle two-color radial gradient blur in opposite corners — barely visible, never full-bleed imagery, never a hard color block.
- **Cards:** white, 20px radius, soft two-layer shadow (tight + wide, both very low opacity) — no border. Rows inside lists sit on a flatter light-gray fill (14px radius), no shadow, no border — the two card/row treatments are visually distinct and never mixed.
- **Corner radii:** cards 20px, rows/buttons 14px, chips/switches/avatars fully pilled.
- **Shadows:** cards only; rows and chips are flat-fill, no shadow.
- **Borders:** rare — used only around the "Filtros" summary button and around the biometric-toggle row when active (light green border tint), never on cards or list rows.
- **Iconography containers:** small circular tinted chips (green tint) behind functional icons (users, key, building, scan-face) in list/settings rows.
- **Interaction states:** no visible hover treatment (mobile app); selection is shown by fill/tint change (segmented control lifts to white, chips fill light-green, radios fill solid green with white dot, toggles slide and fill green) rather than by scale or shadow changes.
- **Motion:** none observed in the screenshots — no easing, transform, or transition cues to copy; components here use simple instant or short (150–200ms) transitions as a safe default for a mobile-feeling toggle/tab.
- **Charts:** single-series line + soft area fill in blue, thin gridlines, minimal axis labels — seen once (contact-rate trend).
- **Imagery:** none — this app has no photography, illustration, or hero imagery anywhere in the screenshots.

## Iconography
Functional icons appear in green-tinted circular chips (contact lists, settings rows) and as plain gray glyphs (chevrons, filter/search/sliders icons, bottom-nav icons). No icon font or SVG sprite from the source app was available to copy, so components and the UI kit load the open-source **Lucide** icon set from CDN (`unpkg.com/lucide`) as a stroke-icon substitute — same weight/style family as what's visible in the screenshots. Flagging this substitution: if you have the app's real icon assets, drop them into `assets/` and swap the `data-lucide` names for `<img>`/inline SVG references. No emoji or unicode-glyph icons appear anywhere.

## Dark mode
Every semantic color token (`--text-*`, `--surface-*`, `--border-subtle`, `--accent-interactive*`, plus the toggle/radio neutrals `--gray-200`/`--gray-300`) is redefined under a `[data-theme="dark"]` scope in `tokens/colors.css` and `tokens/effects.css`. Because every component reads these variables and never a hardcoded color, **no component code changes between themes** — wrap any screen (or its `BackgroundWash`) in an element with `data-theme="dark"` and it repaints automatically. Dark surfaces are near-black (`#0B0B0D` app background, `#1C1C1F` cards) with the same green/blue accents, brightened slightly (`--accent-interactive` → `#4FA8F5`) for contrast; card shadows swap for a heavier drop shadow plus a 1px inner highlight instead of the light theme's soft double shadow. Selected-state fills (segmented control, filter chips, radio rows) use tinted-alpha versions of the accent colors rather than opaque light tints, matching the dark screenshots. See `guidelines/colors-dark.html` and the dark half of every `components/*/card.html`.

## Background gradient
The soft green/blue radial wash behind every screen is its own component: `components/feedback/BackgroundWash.jsx`. It reads `--surface-app` + `--bg-app-gradient`, so it's dark-mode aware automatically. Use it as the outermost wrapper of any screen instead of repeating gradient CSS.


- Built from 8 screenshots only — colors/spacing are close visual matches, not exact extracted values. Two screens referenced by the bottom nav (Calidad, Cumplimiento, Insights) were never screenshotted and are intentionally left blank in the UI kit.
- No logo/brand mark exists in the source material.
- Font is the OS system font — no webfont files were needed or substituted.

**Ask:** if you have Figma or the app's codebase, attach it and I'll rebuild the tokens and component set against exact values and the real icon/logo assets — screenshots alone cap how precise this can get.
