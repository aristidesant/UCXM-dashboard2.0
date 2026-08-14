# Design System Documentation

**This project uses design tokens from `Design system/` folder.**

All design tokens are defined in `Design system/tokens/` and imported into `src/design/`:
- Colors: `Design system/tokens/colors.css`
- Typography: `Design system/tokens/typography.css`
- Spacing: `Design system/tokens/spacing.css`
- Effects: `Design system/tokens/effects.css`

## Color Palette

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | #0A84FF | Actions, highlights |
| Success Green | #34C759 | Positive metrics, active states |
| Warning Orange | #FF9500 | Alerts, warnings |
| Danger Red | #FF3B30 | Errors, negative |
| Dark Gray | #1C1C1E | Primary text |
| Medium Gray | #6E6E73 | Secondary text |
| Light Gray | #C7C7CC | Borders, disabled |
| Background Primary | #FFFFFF | Main background |
| Background Secondary | #F2F2F7 | Card backgrounds, input fields |

### Dark Theme
- Primary bg: #0B0B0D
- Secondary bg: #1C1C1F
- Text: #F5F5F7 (Primary), #98989F (Secondary)

## Typography

| Scale | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 28px | 700 | 1.15 | Screen titles |
| Title | 20px | 700 | 1.2 | Page headers |
| Heading | 17px | 700 | 1.3 | Section headers |
| Body | 15px | 400 | 1.4 | Body text |
| Label | 15px | 600 | 1.2 | Buttons, tags |
| Caption | 13px | 400 | 1.35 | Meta text |
| Micro | 11px | 700 | 1.3 | Bottom nav labels |

**Font Family:** `-apple-system, "SF Pro Text", "Inter", "Helvetica Neue", Arial, sans-serif`

## Spacing

| Token | Value |
|-------|-------|
| xs | 4px (--space-1) |
| sm | 8px (--space-2) |
| md | 12px (--space-3) |
| lg | 16px (--space-4) |
| xl | 20px (--space-5) |
| xxl | 24px (--space-6) |
| xxxl | 32px (--space-8) |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 10px | Inputs, small elements |
| md | 14px | Cards, standard elements |
| lg | 20px | Large containers |
| pill | 999px | Fully rounded elements |

## Shadows

- Card: `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)`
- Sheet: `0 -4px 24px rgba(0,0,0,0.12)`

## Device Frames

### Mobile
- Width: 393px (iPhone 16)
- Height: 852px
- Bezel: 12px
- Border Radius: 45px

### Tablet
- Width: 768px
- Height: 1024px
- Bezel: 8px
- Border Radius: 32px

### Desktop
- Full viewport width/height
- No frame constraints

## Breakpoint

- Mobile: platform === 'mobile'
- Tablet: platform === 'tablet'
- Desktop: platform === 'desktop'
