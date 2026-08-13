# Localization Campaign Management Prototype — Design Specification

**Date:** 2026-08-13  
**Status:** Design Approved  
**Purpose:** Prototype for design handoff; mockup-only, no complex backend  

---

## 1. Overview

This is a mobile and web prototype application for campaign management and localization tracking. Users can:
- View available dashboards
- Filter dashboard data by information type (QA, Emotion & Sentiment, Compliance)
- View campaign metrics and contact details
- Access settings and profile

**Tech Stack:**
- React Native Web (single codebase, renders to mobile and web)
- Vite bundler
- TypeScript
- Mock data only (no backend)

---

## 2. Project Structure

```
localization-proto/
├── vite.config.ts
├── design.md                          # Typography, spacing, colors
├── components.md                      # Component specifications
├── src/
│   ├── index.tsx
│   ├── App.tsx                        # Main app, platform context provider
│   ├── design/
│   │   ├── colors.ts                  # Color tokens (light/dark)
│   │   ├── typography.ts              # Font scales
│   │   ├── spacing.ts                 # Spacing scale (8px base)
│   │   └── index.ts                   # Exported design tokens
│   ├── components/
│   │   ├── Button.tsx                 # Action button (multiple variants)
│   │   ├── Card.tsx                   # Generic card container
│   │   ├── Chart.tsx                  # Trend/line chart component
│   │   ├── TabBar.tsx                 # Navigation tabs (mobile/web variants)
│   │   ├── MetricCard.tsx             # Metric display card
│   │   ├── ContactList.tsx            # List of contacts with actions
│   │   ├── FilterButton.tsx           # Info type filter (QA/Emotion/Compliance)
│   │   ├── PlatformToggle.tsx         # Subtle mobile/web switch (top-right)
│   │   └── index.ts
│   ├── screens/
│   │   ├── Dashboards.tsx             # Dashboard list screen
│   │   ├── CampaignDashboard.tsx      # Main dashboard (Indicadores/Contactos tabs)
│   │   ├── ContactDetails.tsx         # Single contact detail view
│   │   └── Settings.tsx               # User settings
│   ├── hooks/
│   │   ├── usePlatform.ts             # Returns 'mobile' or 'web', toggles platform
│   │   ├── useInfoType.ts             # Returns current info type, setter
│   │   └── useMockData.ts             # Fetches mock data by info type
│   ├── context/
│   │   ├── PlatformContext.tsx        # Platform state (mobile/web toggle)
│   │   └── AppContext.tsx             # Global app state (dashboards, filters)
│   ├── data/
│   │   ├── mockDashboards.ts          # Dashboard list data
│   │   ├── mockMetrics.ts             # Metrics by info type
│   │   └── mockContacts.ts            # Contact lists
│   ├── pages/
│   │   └── ComponentShowcase.tsx      # Vite dev page (all components visible)
│   └── styles/
│       └── globals.css                # Reset, base styles
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-08-13-localization-proto-design.md (this file)
└── package.json
```

---

## 3. Core Flows

### 3.1 Dashboard Selection Flow
1. App loads to **Dashboards Screen**
2. User sees list of available dashboards (e.g., "Localization", "Localization Mayo")
3. Each dashboard card displays: name, status (Active/Inactive), last updated timestamp
4. User taps a dashboard → navigates to **Campaign Dashboard Screen**

### 3.2 Information Type Switching Flow
1. User is on **Campaign Dashboard Screen**
2. Filter button at top shows current info type: **QA** | **Emotion & Sentiment** | **Compliance**
3. User taps filter → selector opens (modal or dropdown)
4. User chooses an info type
5. Dashboard metrics update with mock data for that info type
6. Contact list remains independent (not filtered by info type)

### 3.3 Screen Navigation
```
Dashboards Screen
    ↓ (user selects dashboard)
Campaign Dashboard Screen
    ├─ Tab 1: Indicadores (metrics)
    └─ Tab 2: Detalles de contacto (contacts)
    ↓ (user taps contact)
Contact Details Screen

Settings Screen (always accessible via tab bar)
```

---

## 4. Design System

### 4.1 Color Palette

**Light Theme (Default)**
| Token | Value | Use |
|-------|-------|-----|
| Primary Blue | `#0066CC` | Actions, highlights, active state |
| Success Green | `#00AA44` | Positive metrics, completed status |
| Warning Orange | `#FF9900` | Alerts, warnings, in-progress |
| Danger Red | `#FF3333` | Errors, negative trends |
| Neutral Dark Gray | `#333333` | Primary text |
| Neutral Medium Gray | `#666666` | Secondary text |
| Neutral Light Gray | `#CCCCCC` | Borders, dividers |
| Background Primary | `#FFFFFF` | Main background |
| Background Secondary | `#F5F5F5` | Card backgrounds, subtle sections |

**Dark Theme**
- Inverted: Primary bg becomes `#1A1A1A`, secondary `#2A2A2A`
- Text adjusted for contrast compliance

### 4.2 Typography

| Scale | Size | Weight | Use |
|-------|------|--------|-----|
| Display | 32px | 700 | Screen titles (Dashboards, Localization) |
| Heading | 24px | 700 | Section headers, card titles |
| Subheading | 18px | 600 | Subsection headers |
| Body | 16px | 400 | Body text, descriptions |
| Label | 14px | 600 | Buttons, tags, filter labels |
| Caption | 12px | 400 | Meta text, timestamps, secondary info |

**Font Family:** System font stack (e.g., `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`)

### 4.3 Spacing Scale

Base unit: **8px**

| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Tight spacing (icon margins) |
| sm | 8px | Button padding, small gaps |
| md | 16px | Section margins, card padding |
| lg | 24px | Major section spacing |
| xl | 32px | Large grouping |
| xxl | 48px | Screen edge margins |

All padding, margins, and gaps use multiples of 8px.

### 4.4 Component Design Rules

| Component | Rule |
|-----------|------|
| Cards | 12px border-radius, 2px shadow on light, subtle border |
| Buttons | 8px border-radius, min 44px height (mobile), text-centered |
| Inputs | 8px border-radius, 16px padding, placeholder gray |
| Charts | Responsive to container width, maintains aspect ratio |
| Tab Bars | Mobile: 56px height, icons + labels; Web: compact top/side nav |
| Metric Cards | Large numbers (Display/Heading scale), supporting text (Caption) |

---

## 5. Screens & Components

### 5.1 Dashboards Screen

**Purpose:** Entry point; user selects a dashboard to view

**Layout (Mobile):**
- Header: "Dashboards" (Display)
- Search bar (placeholder: "Buscar dashboards...")
- List of dashboard cards (stacked)
- Each card: name, status badge, last updated
- Tab bar at bottom

**Layout (Web):**
- Left sidebar or top nav with "Dashboards" 
- Grid of dashboard cards (2-3 columns)
- Same card content

**Components Used:**
- `Button` (search icon)
- `Card` (dashboard item)
- `TabBar` (navigation)
- Status badge (colored dot + text)

---

### 5.2 Campaign Dashboard Screen

**Purpose:** Main view; displays metrics and contacts, allows info type filtering

**Layout (Mobile):**
- Header: Dashboard title, platform toggle (top-right, subtle)
- Info Type Filter: "Filtros" button, shows current selection
- Two tabs: "Indicadores" | "Detalles de contacto"

**Tab 1: Indicadores**
- Metric cards (key numbers, percentages, trends)
- Trend chart (line chart showing data over week)
- Breakdown cards (numerator/denominator, or sentiment breakdown)

**Tab 2: Detalles de contacto**
- Filter button
- Contact list (name, avatar, action label in green)
- Each contact is tappable

**Layout (Web):**
- Same content, but:
  - Metrics in a grid (2-3 columns)
  - Chart wider
  - Contact list in sidebar or bottom section
  - Tabs at top or side

**Components Used:**
- `TabBar` (platform-aware)
- `MetricCard` (metric display)
- `Chart` (trend visualization)
- `Card` (breakdown cards)
- `ContactList` (contact items)
- `FilterButton` (info type selector)
- `PlatformToggle` (subtle, top-right)

---

### 5.3 Contact Details Screen

**Purpose:** View single contact's full information and take actions

**Layout:**
- Header: Contact name
- Avatar/icon
- Contact info fields (role, status, etc.)
- Action buttons (Enviar dirección, etc.)

**Components Used:**
- `Button` (action buttons)
- `Card` (info section)

---

### 5.4 Settings Screen

**Purpose:** User settings, appearance, account

**Sections:**
- User profile (name, email, account status)
- Account settings (change client, change password)
- Security (biometric login toggle)
- Appearance (theme: System/Light/Dark, language: System/English/Spanish)
- About (version number)
- Sign out

**Components Used:**
- `Card` (section containers)
- `Button` (actions, toggle buttons)
- `TabBar` (navigation)

---

## 6. State Management

### 6.1 PlatformContext
- **State:** `platform: 'mobile' | 'web'`
- **Persisted:** localStorage as `platform_preference`
- **Action:** `togglePlatform()` — switches between mobile and web
- **Provider:** Wraps entire App

### 6.2 AppContext
- **State:**
  - `currentDashboard` — selected dashboard ID
  - `currentInfoType` — 'qa' | 'emotion' | 'compliance'
  - `selectedContact` — contact ID (for detail view)
- **Persisted:** Not required (stateless prototype)

### 6.3 usePlatform Hook
```typescript
const { platform, togglePlatform } = usePlatform();
// platform: 'mobile' | 'web'
```

### 6.4 useInfoType Hook
```typescript
const { infoType, setInfoType } = useInfoType();
// infoType: 'qa' | 'emotion' | 'compliance'
```

### 6.5 useMockData Hook
```typescript
const metrics = useMockData(currentDashboard, infoType);
// Returns mock data based on info type
```

---

## 7. Mock Data Structure

### 7.1 Dashboards
```typescript
type Dashboard = {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused' | 'completed' | 'failed';
  type: string;
  lastUpdated: string;
  createdAt: string;
};
```

### 7.2 Metrics (by InfoType)
```typescript
type InfoType = 'qa' | 'emotion' | 'compliance';

type Metrics = {
  qa: {
    contactPercentage: number;
    voiceMailboxPercentage: number;
    totalAnalyzed: number;
    trend: number[];
    results: { effective: number; ineffective: number };
  };
  emotion: {
    sentiment: string; // 'positive' | 'neutral' | 'negative'
    score: number;
    breakdown: { [key: string]: number };
    trend: number[];
  };
  compliance: {
    violations: number;
    coverage: number;
    trend: number[];
    alerts: string[];
  };
};
```

### 7.3 Contacts
```typescript
type Contact = {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  status?: string;
  action: string; // e.g., "Enviar Dirección Cliente"
};
```

---

## 8. Component Showcase (Dev Page)

**Route:** `/showcase` or `?dev=true`

**Features:**
- Displays all components with their variations
- Each component card shows:
  - Component name
  - Visual preview(s) with different states
  - Responsive: toggle between mobile/web layout
  - Theme toggle: Light/Dark
  
**Components to Showcase:**
1. Button (primary, secondary, disabled, loading)
2. Card (default, with image, compact)
3. MetricCard (with positive/negative trend)
4. ContactList (items, empty state)
5. Chart (line chart with mock data)
6. TabBar (mobile vs web)
7. FilterButton (various states)
8. Input (default, focused, disabled)
9. Badge (status badges in different colors)
10. Modal/Popup (filter selector)

**Not in production build** — dev/designer-only tool

---

## 9. Platform-Specific Layouts

### 9.1 Mobile (width < 768px)
- Single column layout
- Full-width cards
- Bottom tab navigation (56px height)
- Large touch targets (min 44px)
- Vertical scrolling primary
- Metric cards stacked

### 9.2 Web (width >= 768px)
- Multi-column grids (2-3 columns)
- Sidebar navigation or top tabs
- Compact spacing
- Cards in grid
- Horizontal layout for metrics

**Implementation:** `usePlatform()` hook + conditional rendering or CSS media queries

---

## 10. Documentation Files

### 10.1 design.md
- Typography scales and font families
- Color palette with hex values
- Spacing scale
- Component design rules
- Accessibility notes (if applicable)

### 10.2 components.md
- Each component documented:
  - **Name**
  - **Props** (types, defaults)
  - **Usage examples** (code snippets)
  - **States** (default, hover, active, disabled)
  - **Variants** (primary, secondary, etc.)
  - **Mobile vs Web considerations**

---

## 11. Testing Approach (Prototype)

**No unit tests required.** Instead:

1. **Visual testing:**
   - Manual verification of mobile vs web layouts
   - Theme switching (light/dark)
   - Component Showcase page validates all components render

2. **Functional testing:**
   - Info type switching updates metrics correctly
   - Dashboard selection navigates properly
   - Platform toggle persists preference

3. **Data switching:**
   - Mock data loads for each info type
   - Contact list independent of info type filter

---

## 12. Out of Scope

- Backend API integration
- Real user authentication
- Database
- Performance optimization for scale
- Analytics
- Error handling beyond UI states
- Accessibility (WCAG) compliance
- Unit/integration tests

---

## 13. Success Criteria

✅ Single React Native Web codebase renders to both mobile and web  
✅ Platform toggle always visible (top-right, subtle)  
✅ Dashboard selection works  
✅ Info type switching (QA/Emotion/Compliance) updates metrics  
✅ Contact details view displays correctly  
✅ Settings screen functional  
✅ Component Showcase page lists all components  
✅ `design.md` and `components.md` documented  
✅ Mobile and web layouts visually distinct but use same components  

---

## 14. Next Steps

1. ✅ Design approved
2. Write implementation plan (writing-plans skill)
3. Set up Vite + React Native Web
4. Create design tokens and component library
5. Build screens and navigation
6. Create Component Showcase
7. Test on mobile and web views
