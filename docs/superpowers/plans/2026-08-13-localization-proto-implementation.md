# Localization Campaign Management Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React Native Web prototype with mobile and web views, design system, mock data, and component showcase for campaign management and localization tracking.

**Architecture:** Single React Native Web codebase (Vite bundler) with platform detection via context. All screens use the same components with platform-specific layout variations. Design system exported as TypeScript tokens. Mock data structured by info type (QA/Emotion/Compliance). Component Showcase page serves as visual design reference.

**Tech Stack:** React Native Web, Vite, TypeScript, React Context for state management, CSS-in-JS for platform-aware styling

**Spec:** `docs/superpowers/specs/2026-08-13-localization-proto-design.md`

---

## Global Constraints

- **React Native Web:** Single codebase, no branching for mobile/web logic beyond layout
- **Vite:** Primary bundler, fast HMR, TypeScript support
- **Platform Toggle:** Top-right, always visible, subtle, persists to localStorage
- **Info Types:** QA, Emotion & Sentiment, Compliance (mock data only)
- **Colors:** Light theme default, dark theme supported
- **Spacing Base:** 8px (all spacing multiples of 8px)
- **Breakpoint:** Mobile < 768px, Web >= 768px
- **Navigation:** Tab bar (mobile bottom 56px, web top or side)
- **No Tests:** Manual visual + functional testing only
- **No Backend:** All mock data hardcoded

---

## File Structure

**New files to create:**
- `src/index.tsx` — Entry point
- `src/App.tsx` — Main app, context provider
- `src/design/colors.ts`, `typography.ts`, `spacing.ts`, `index.ts` — Design tokens
- `src/components/Button.tsx`, `Card.tsx`, `MetricCard.tsx`, `Chart.tsx`, `ContactList.tsx`, `FilterButton.tsx`, `PlatformToggle.tsx`, `TabBar.tsx`, `Badge.tsx`, `index.ts`
- `src/screens/Dashboards.tsx`, `CampaignDashboard.tsx`, `ContactDetails.tsx`, `Settings.tsx`
- `src/hooks/usePlatform.ts`, `useInfoType.ts`, `useMockData.ts`
- `src/context/PlatformContext.tsx`, `AppContext.tsx`
- `src/data/mockDashboards.ts`, `mockMetrics.ts`, `mockContacts.ts`
- `src/pages/ComponentShowcase.tsx`
- `src/styles/globals.css`
- `design.md` — Design system documentation
- `components.md` — Component API reference
- `vite.config.ts` — Vite configuration
- `package.json` — Dependencies
- `tsconfig.json` — TypeScript configuration
- `index.html` — HTML entry point

---

## Tasks

### Task 1: Project Initialization & Vite Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `.gitignore`

**Interfaces:**
- Produces: Vite dev server at `http://localhost:5173`, TypeScript compilation

- [ ] **Step 1: Create package.json with React Native Web + Vite dependencies**

```json
{
  "name": "localization-proto",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-native": "^0.73.0",
    "react-native-web": "^0.19.9"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Localization Campaign Management</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create .gitignore**

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

- [ ] **Step 6: Run npm install and verify dev server starts**

```bash
npm install
npm run dev
```

Expected: Vite dev server running on http://localhost:5173 (will show error until App.tsx exists, which is fine)

- [ ] **Step 7: Commit**

```bash
git add package.json vite.config.ts tsconfig.json index.html .gitignore
git commit -m "chore: initialize Vite + React Native Web project"
```

---

### Task 2: Design Tokens (Colors, Typography, Spacing)

**Files:**
- Create: `src/design/colors.ts`
- Create: `src/design/typography.ts`
- Create: `src/design/spacing.ts`
- Create: `src/design/index.ts`

**Interfaces:**
- Produces: Design token exports
  - `colors: { light: {...}, dark: {...} }`
  - `typography: { display, heading, subheading, body, label, caption }`
  - `spacing: { xs, sm, md, lg, xl, xxl }`

- [ ] **Step 1: Create colors.ts with light/dark palettes**

```typescript
// src/design/colors.ts

export const colors = {
  light: {
    primaryBlue: '#0066CC',
    successGreen: '#00AA44',
    warningOrange: '#FF9900',
    dangerRed: '#FF3333',
    darkGray: '#333333',
    mediumGray: '#666666',
    lightGray: '#CCCCCC',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F5F5F5',
  },
  dark: {
    primaryBlue: '#0066CC',
    successGreen: '#00AA44',
    warningOrange: '#FF9900',
    dangerRed: '#FF3333',
    darkGray: '#FFFFFF',
    mediumGray: '#CCCCCC',
    lightGray: '#333333',
    bgPrimary: '#1A1A1A',
    bgSecondary: '#2A2A2A',
  },
};
```

- [ ] **Step 2: Create typography.ts**

```typescript
// src/design/typography.ts

export const typography = {
  display: {
    fontSize: 32,
    fontWeight: '700',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
  },
};

export const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
```

- [ ] **Step 3: Create spacing.ts**

```typescript
// src/design/spacing.ts

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

- [ ] **Step 4: Create design index.ts to export all tokens**

```typescript
// src/design/index.ts

export { colors } from './colors';
export { typography, fontFamily } from './typography';
export { spacing } from './spacing';
```

- [ ] **Step 5: Verify tokens can be imported**

Create a simple test file or just check TypeScript compilation:
```bash
npm run build
```

Expected: No TypeScript errors, dist folder created

- [ ] **Step 6: Commit**

```bash
git add src/design/
git commit -m "feat: add design tokens (colors, typography, spacing)"
```

---

### Task 3: Context & Hooks (Platform, InfoType, MockData)

**Files:**
- Create: `src/context/PlatformContext.tsx`
- Create: `src/context/AppContext.tsx`
- Create: `src/hooks/usePlatform.ts`
- Create: `src/hooks/useInfoType.ts`
- Create: `src/hooks/useMockData.ts`

**Interfaces:**
- Produces:
  - `usePlatform(): { platform: 'mobile' | 'web', togglePlatform: () => void }`
  - `useInfoType(): { infoType: InfoType, setInfoType: (type: InfoType) => void }`
  - `useMockData(dashboardId: string, infoType: InfoType): Metrics`
  - `PlatformProvider` component
  - `AppProvider` component

- [ ] **Step 1: Create PlatformContext.tsx**

```typescript
// src/context/PlatformContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

type Platform = 'mobile' | 'web';

interface PlatformContextType {
  platform: Platform;
  togglePlatform: () => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platform, setPlatform] = useState<Platform>(() => {
    if (typeof window === 'undefined') return 'web';
    const saved = localStorage.getItem('platform_preference') as Platform | null;
    return saved || 'mobile';
  });

  useEffect(() => {
    localStorage.setItem('platform_preference', platform);
  }, [platform]);

  const togglePlatform = () => {
    setPlatform(prev => (prev === 'mobile' ? 'web' : 'mobile'));
  };

  return (
    <PlatformContext.Provider value={{ platform, togglePlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatformContext = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatformContext must be used within PlatformProvider');
  }
  return context;
};
```

- [ ] **Step 2: Create AppContext.tsx**

```typescript
// src/context/AppContext.tsx

import React, { createContext, useContext, useState } from 'react';

export type InfoType = 'qa' | 'emotion' | 'compliance';

interface AppContextType {
  currentDashboard: string | null;
  setCurrentDashboard: (id: string) => void;
  currentInfoType: InfoType;
  setCurrentInfoType: (type: InfoType) => void;
  selectedContact: string | null;
  setSelectedContact: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDashboard, setCurrentDashboard] = useState<string | null>(null);
  const [currentInfoType, setCurrentInfoType] = useState<InfoType>('qa');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        currentDashboard,
        setCurrentDashboard,
        currentInfoType,
        setCurrentInfoType,
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

- [ ] **Step 3: Create usePlatform.ts hook**

```typescript
// src/hooks/usePlatform.ts

import { usePlatformContext } from '../context/PlatformContext';

export const usePlatform = () => {
  return usePlatformContext();
};
```

- [ ] **Step 4: Create useInfoType.ts hook**

```typescript
// src/hooks/useInfoType.ts

import { useAppContext, InfoType } from '../context/AppContext';

export const useInfoType = () => {
  const { currentInfoType, setCurrentInfoType } = useAppContext();
  return {
    infoType: currentInfoType,
    setInfoType: setCurrentInfoType,
  };
};
```

- [ ] **Step 5: Create useMockData.ts hook (will be implemented after mock data creation)**

```typescript
// src/hooks/useMockData.ts

import { InfoType } from '../context/AppContext';
// Will import mockMetrics and return data based on dashboardId and infoType

export const useMockData = (dashboardId: string, infoType: InfoType) => {
  // TODO: Implement after creating mockMetrics.ts
  return {};
};
```

- [ ] **Step 6: Commit**

```bash
git add src/context/ src/hooks/
git commit -m "feat: add context providers and custom hooks"
```

---

### Task 4: Mock Data (Dashboards, Metrics, Contacts)

**Files:**
- Create: `src/data/mockDashboards.ts`
- Create: `src/data/mockMetrics.ts`
- Create: `src/data/mockContacts.ts`

**Interfaces:**
- Produces:
  - `mockDashboards: Dashboard[]`
  - `mockMetrics: Record<dashboardId, Record<InfoType, Metrics>>`
  - `mockContacts: Contact[]`

- [ ] **Step 1: Create mockDashboards.ts**

```typescript
// src/data/mockDashboards.ts

export interface Dashboard {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused' | 'completed' | 'failed';
  type: string;
  lastUpdated: string;
  createdAt: string;
}

export const mockDashboards: Dashboard[] = [
  {
    id: 'loc-1',
    name: 'Localizacion',
    status: 'inactive',
    type: 'Localizacion',
    lastUpdated: '2026-08-13T12:11:00Z',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'loc-mayo',
    name: 'Localizacion Mayo',
    status: 'active',
    type: 'Localizacion',
    lastUpdated: '2026-08-13T12:11:00Z',
    createdAt: '2026-05-01T09:00:00Z',
  },
];
```

- [ ] **Step 2: Create mockMetrics.ts**

```typescript
// src/data/mockMetrics.ts

import { InfoType } from '../context/AppContext';

export interface QAMetrics {
  contactPercentage: number;
  voiceMailboxPercentage: number;
  totalAnalyzed: number;
  trend: number[];
  results: { effective: number; ineffective: number };
}

export interface EmotionMetrics {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  breakdown: Record<string, number>;
  trend: number[];
}

export interface ComplianceMetrics {
  violations: number;
  coverage: number;
  trend: number[];
  alerts: string[];
}

export type Metrics = QAMetrics | EmotionMetrics | ComplianceMetrics;

export const mockMetrics: Record<string, Record<InfoType, Metrics>> = {
  'loc-1': {
    qa: {
      contactPercentage: 70,
      voiceMailboxPercentage: 0,
      totalAnalyzed: 10,
      trend: [0.2, 1, 3, 5, 5.5, 5.8, 4.5],
      results: { effective: 7, ineffective: 3 },
    },
    emotion: {
      sentiment: 'positive',
      score: 8.5,
      breakdown: { positive: 65, neutral: 25, negative: 10 },
      trend: [6, 6.5, 7, 7.8, 8.2, 8.5, 8.3],
    },
    compliance: {
      violations: 2,
      coverage: 95,
      trend: [90, 91, 92, 94, 95, 95, 95],
      alerts: ['Rule A violated twice', 'Coverage target met'],
    },
  },
  'loc-mayo': {
    qa: {
      contactPercentage: 85,
      voiceMailboxPercentage: 5,
      totalAnalyzed: 20,
      trend: [1, 3, 8, 15, 18, 20, 22],
      results: { effective: 17, ineffective: 3 },
    },
    emotion: {
      sentiment: 'positive',
      score: 9.0,
      breakdown: { positive: 75, neutral: 20, negative: 5 },
      trend: [7, 7.5, 8, 8.5, 8.8, 9.0, 8.9],
    },
    compliance: {
      violations: 0,
      coverage: 100,
      trend: [95, 96, 97, 98, 99, 100, 100],
      alerts: ['All compliance rules met'],
    },
  },
};
```

- [ ] **Step 3: Create mockContacts.ts**

```typescript
// src/data/mockContacts.ts

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  status?: string;
  action: string;
}

export const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Yamilet Sanchez',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
  },
  {
    id: 'contact-2',
    name: 'Kerlis Sanchez',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
  },
  {
    id: 'contact-3',
    name: 'Steve Socorro',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
  },
  {
    id: 'contact-4',
    name: 'Enmanuel Placido',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
  },
  {
    id: 'contact-5',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
  },
  {
    id: 'contact-6',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
  },
  {
    id: 'contact-7',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Llamada finalizo antes de tiempo',
  },
  {
    id: 'contact-8',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Llamada finalizo antes de tiempo',
  },
];
```

- [ ] **Step 4: Update useMockData.ts to use mock data**

```typescript
// src/hooks/useMockData.ts

import { InfoType } from '../context/AppContext';
import { mockMetrics, Metrics } from '../data/mockMetrics';

export const useMockData = (dashboardId: string, infoType: InfoType): Metrics | null => {
  if (!dashboardId || !mockMetrics[dashboardId]) {
    return null;
  }
  return mockMetrics[dashboardId][infoType];
};
```

- [ ] **Step 5: Commit**

```bash
git add src/data/ src/hooks/useMockData.ts
git commit -m "feat: add mock data for dashboards, metrics, and contacts"
```

---

### Task 5: Base Components (Button, Card, Badge)

**Files:**
- Create: `src/components/Button.tsx`
- Create: `src/components/Card.tsx`
- Create: `src/components/Badge.tsx`
- Create: `src/components/index.ts`

**Interfaces:**
- Produces:
  - `<Button variant="primary" | "secondary" disabled={bool} onPress={fn} />`
  - `<Card children={ReactNode} />`
  - `<Badge status="active" | "inactive" | "completed" | "failed" />`

- [ ] **Step 1: Create Button.tsx**

```typescript
// src/components/Button.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../design';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const styles = StyleSheet.create({
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        variant === 'primary'
          ? colors.light.primaryBlue
          : colors.light.bgSecondary,
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      ...typography.label,
      color:
        variant === 'primary'
          ? colors.light.bgPrimary
          : colors.light.darkGray,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

- [ ] **Step 2: Create Card.tsx**

```typescript
// src/components/Card.tsx

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../design';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.light.bgPrimary,
      borderRadius: 12,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.light.lightGray,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
};
```

- [ ] **Step 3: Create Badge.tsx**

```typescript
// src/components/Badge.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, spacing } from '../design';

interface BadgeProps {
  status: 'active' | 'inactive' | 'completed' | 'failed' | 'paused';
}

const statusColors: Record<BadgeProps['status'], string> = {
  active: colors.light.successGreen,
  inactive: colors.light.mediumGray,
  completed: colors.light.successGreen,
  failed: colors.light.dangerRed,
  paused: colors.light.warningOrange,
};

const statusLabels: Record<BadgeProps['status'], string> = {
  active: 'Activa',
  inactive: 'Inactiva',
  completed: 'Completada',
  failed: 'Fallida',
  paused: 'Pausada',
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const styles = StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: 8,
      backgroundColor: statusColors[status],
      opacity: 0.2,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: statusColors[status],
      marginRight: spacing.xs,
    },
    text: {
      ...typography.caption,
      color: statusColors[status],
    },
  });

  return (
    <View style={styles.badge}>
      <View style={styles.dot} />
      <Text style={styles.text}>{statusLabels[status]}</Text>
    </View>
  );
};
```

- [ ] **Step 4: Create components/index.ts**

```typescript
// src/components/index.ts

export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Button.tsx src/components/Card.tsx src/components/Badge.tsx src/components/index.ts
git commit -m "feat: add base components (Button, Card, Badge)"
```

---

### Task 6: Specialized Components (MetricCard, Chart, ContactList, FilterButton)

**Files:**
- Create: `src/components/MetricCard.tsx`
- Create: `src/components/Chart.tsx`
- Create: `src/components/ContactList.tsx`
- Create: `src/components/FilterButton.tsx`

**Interfaces:**
- Produces:
  - `<MetricCard label={string} value={string | number} trend={number} />`
  - `<Chart data={number[]} />`
  - `<ContactList contacts={Contact[]} onSelectContact={fn} />`
  - `<FilterButton currentType={InfoType} onSelect={fn} />`

- [ ] **Step 1: Create MetricCard.tsx**

```typescript
// src/components/MetricCard.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card } from './Card';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendLabel,
}) => {
  const isTrendPositive = trend !== undefined && trend > 0;
  const trendColor = isTrendPositive
    ? colors.light.successGreen
    : colors.light.dangerRed;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginBottom: spacing.sm,
    },
    value: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendArrow: {
      ...typography.body,
      color: trendColor,
      marginRight: spacing.xs,
    },
    trendText: {
      ...typography.caption,
      color: trendColor,
    },
  });

  return (
    <Card style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {trend !== undefined && (
        <View style={styles.trendContainer}>
          <Text style={styles.trendArrow}>{isTrendPositive ? '↑' : '↓'}</Text>
          <Text style={styles.trendText}>
            {Math.abs(trend).toFixed(1)}% {trendLabel || ''}
          </Text>
        </View>
      )}
    </Card>
  );
};
```

- [ ] **Step 2: Create Chart.tsx (simple line chart using SVG)**

```typescript
// src/components/Chart.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../design';

interface ChartProps {
  data: number[];
  height?: number;
  labels?: string[];
}

export const Chart: React.FC<ChartProps> = ({
  data,
  height = 200,
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height,
      paddingVertical: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.light.bgSecondary,
      borderRadius: 12,
      marginVertical: spacing.md,
    },
    svgContainer: {
      width: '100%',
      height: '100%',
    },
  });

  if (data.length === 0) {
    return <View style={styles.container} />;
  }

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const width = 100;
  const padding = 10;
  const chartHeight = height - padding * 2;
  const pointSpacing = width / (data.length - 1 || 1);

  const points = data.map((value, index) => {
    const x = padding + index * pointSpacing;
    const y = chartHeight - ((value - minValue) / range) * chartHeight + padding;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <View style={styles.container}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ flex: 1 }}
      >
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke={colors.light.primaryBlue}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={points.join(' ')}
          fill={`url(#gradient)`}
          opacity="0.2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.light.primaryBlue} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.light.primaryBlue} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </View>
  );
};
```

- [ ] **Step 3: Create ContactList.tsx**

```typescript
// src/components/ContactList.tsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Contact } from '../data/mockContacts';
import { Card } from './Card';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onSelectContact,
}) => {
  const styles = StyleSheet.create({
    listContainer: {
      gap: spacing.sm,
    },
    contactItem: {
      padding: spacing.md,
      borderRadius: 12,
      backgroundColor: colors.light.bgSecondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      ...typography.body,
      color: colors.light.darkGray,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    contactAction: {
      ...typography.caption,
      color: colors.light.successGreen,
      fontWeight: '600',
    },
    chevron: {
      ...typography.body,
      color: colors.light.mediumGray,
    },
  });

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => onSelectContact(item)}
      activeOpacity={0.7}
    >
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactAction}>{item.action}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderContact}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};
```

- [ ] **Step 4: Create FilterButton.tsx**

```typescript
// src/components/FilterButton.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { InfoType } from '../context/AppContext';

interface FilterButtonProps {
  currentType: InfoType;
  onSelect: (type: InfoType) => void;
}

const infoTypeLabels: Record<InfoType, string> = {
  qa: 'QA',
  emotion: 'Emotion & Sentiment',
  compliance: 'Compliance',
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  currentType,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = StyleSheet.create({
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      backgroundColor: colors.light.bgSecondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      ...typography.label,
      color: colors.light.darkGray,
      marginRight: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.light.bgPrimary,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingVertical: spacing.md,
    },
    optionItem: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    optionText: {
      ...typography.body,
      color: colors.light.darkGray,
    },
    checkmark: {
      ...typography.body,
      color: colors.light.primaryBlue,
      fontWeight: '700',
    },
  });

  const handleSelect = (type: InfoType) => {
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{infoTypeLabels[currentType]}</Text>
        <Text style={styles.buttonText}>⚙️</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {(['qa', 'emotion', 'compliance'] as InfoType[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.optionItem}
                onPress={() => handleSelect(type)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{infoTypeLabels[type]}</Text>
                {currentType === type && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};
```

- [ ] **Step 5: Update components/index.ts to export new components**

```typescript
// src/components/index.ts

export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
export { MetricCard } from './MetricCard';
export { Chart } from './Chart';
export { ContactList } from './ContactList';
export { FilterButton } from './FilterButton';
```

- [ ] **Step 6: Commit**

```bash
git add src/components/MetricCard.tsx src/components/Chart.tsx src/components/ContactList.tsx src/components/FilterButton.tsx src/components/index.ts
git commit -m "feat: add specialized components (MetricCard, Chart, ContactList, FilterButton)"
```

---

### Task 7: Platform Toggle & TabBar Components

**Files:**
- Create: `src/components/PlatformToggle.tsx`
- Create: `src/components/TabBar.tsx`

**Interfaces:**
- Produces:
  - `<PlatformToggle />` (reads from usePlatform, always visible top-right)
  - `<TabBar currentScreen={string} onSelectScreen={fn} platform={Platform} />`

- [ ] **Step 1: Create PlatformToggle.tsx**

```typescript
// src/components/PlatformToggle.tsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { usePlatform } from '../hooks/usePlatform';
import { colors, typography } from '../design';

export const PlatformToggle: React.FC = () => {
  const { platform, togglePlatform } = usePlatform();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1000,
    },
    button: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.light.bgSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.light.lightGray,
    },
    icon: {
      ...typography.caption,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={togglePlatform}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{platform === 'mobile' ? '📱' : '💻'}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

- [ ] **Step 2: Create TabBar.tsx**

```typescript
// src/components/TabBar.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';

interface TabBarProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
  tabs: { id: string; label: string; icon: string }[];
}

export const TabBar: React.FC<TabBarProps> = ({
  currentScreen,
  onSelectScreen,
  tabs,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.light.bgPrimary,
      borderTopWidth: 1,
      borderTopColor: colors.light.lightGray,
      height: isMobile ? 56 : 50,
      alignItems: 'center',
      justifyContent: isMobile ? 'space-around' : 'flex-start',
      paddingHorizontal: isMobile ? 0 : spacing.md,
      gap: isMobile ? 0 : spacing.lg,
    } as ViewStyle,
    tab: {
      flex: isMobile ? 1 : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    } as ViewStyle,
    activeTab: {
      borderBottomColor: colors.light.primaryBlue,
    } as ViewStyle,
    icon: {
      fontSize: isMobile ? 20 : 18,
      marginBottom: isMobile ? spacing.xs : 0,
      marginRight: isMobile ? 0 : spacing.xs,
    },
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
    },
    activeLabel: {
      color: colors.light.primaryBlue,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onSelectScreen(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            {isMobile && (
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
```

- [ ] **Step 3: Update components/index.ts**

```typescript
// src/components/index.ts

export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
export { MetricCard } from './MetricCard';
export { Chart } from './Chart';
export { ContactList } from './ContactList';
export { FilterButton } from './FilterButton';
export { PlatformToggle } from './PlatformToggle';
export { TabBar } from './TabBar';
```

- [ ] **Step 4: Commit**

```bash
git add src/components/PlatformToggle.tsx src/components/TabBar.tsx src/components/index.ts
git commit -m "feat: add PlatformToggle and TabBar components"
```

---

### Task 8: Screens Part 1 - Dashboards Screen

**Files:**
- Create: `src/screens/Dashboards.tsx`

**Interfaces:**
- Consumes: `mockDashboards`, `useAppContext`, `usePlatform`
- Produces: Dashboard list screen with grid/stack layout based on platform

- [ ] **Step 1: Create Dashboards.tsx screen**

```typescript
// src/screens/Dashboards.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useAppContext } from '../context/AppContext';
import { Card, Badge } from '../components';
import { mockDashboards } from '../data/mockDashboards';
import { TouchableOpacity } from 'react-native';

interface DashboardsScreenProps {
  onSelectDashboard: (dashboardId: string) => void;
}

export const DashboardsScreen: React.FC<DashboardsScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [search, setSearch] = React.useState('');

  const filteredDashboards = mockDashboards.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    searchContainer: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.light.lightGray,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      ...typography.body,
      color: colors.light.darkGray,
    },
    gridContainer: {
      gap: spacing.md,
    } as ViewStyle,
    dashboardCard: {
      minHeight: 120,
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    } as ViewStyle,
    dashboardName: {
      ...typography.subheading,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
    },
    dashboardMeta: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginBottom: spacing.sm,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  const renderDashboard = ({ item }: { item: typeof mockDashboards[0] }) => (
    <TouchableOpacity
      onPress={() => onSelectDashboard(item.id)}
      activeOpacity={0.7}
    >
      <Card style={styles.dashboardCard}>
        <View>
          <Text style={styles.dashboardName}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Badge status={item.status} />
            <Text style={styles.dashboardMeta}>
              Iniciada {new Date(item.lastUpdated).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={styles.dashboardMeta}>
          Tipo: {item.type}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboards</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar dashboards..."
          placeholderTextColor={colors.light.mediumGray}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredDashboards}
        renderItem={renderDashboard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
        numColumns={isMobile ? 1 : 2}
        columnWrapperStyle={
          !isMobile
            ? { gap: spacing.md }
            : undefined
        }
      />
    </View>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/screens/Dashboards.tsx
git commit -m "feat: add Dashboards screen"
```

---

### Task 9: Screens Part 2 - Campaign Dashboard Screen

**Files:**
- Create: `src/screens/CampaignDashboard.tsx`

**Interfaces:**
- Consumes: `useMockData`, `useInfoType`, `useAppContext`, `usePlatform`
- Produces: Dashboard with Indicadores/Contactos tabs, info type filter

- [ ] **Step 1: Create CampaignDashboard.tsx screen**

```typescript
// src/screens/CampaignDashboard.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useInfoType } from '../hooks/useInfoType';
import { useMockData } from '../hooks/useMockData';
import { useAppContext } from '../context/AppContext';
import {
  Card,
  MetricCard,
  Chart,
  ContactList,
  FilterButton,
  TabBar,
} from '../components';
import { mockDashboards } from '../data/mockDashboards';
import { mockContacts } from '../data/mockContacts';
import { QAMetrics, EmotionMetrics, ComplianceMetrics } from '../data/mockMetrics';

interface CampaignDashboardScreenProps {
  onSelectContact: (contactId: string) => void;
  onBack: () => void;
}

export const CampaignDashboardScreen: React.FC<CampaignDashboardScreenProps> = ({
  onSelectContact,
  onBack,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { infoType, setInfoType } = useInfoType();
  const { currentDashboard } = useAppContext();
  const [activeTab, setActiveTab] = useState<'indicadores' | 'contactos'>(
    'indicadores'
  );

  const metrics = useMockData(currentDashboard || '', infoType);
  const dashboard = mockDashboards.find((d) => d.id === currentDashboard);

  if (!metrics || !dashboard) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Dashboard not found</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      ...typography.display,
      color: colors.light.darkGray,
    },
    filterContainer: {
      marginBottom: spacing.md,
    },
    tabContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
    } as ViewStyle,
    tab: {
      paddingVertical: spacing.sm,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      marginBottom: -1,
    } as ViewStyle,
    activeTab: {
      borderBottomColor: colors.light.primaryBlue,
    } as ViewStyle,
    tabText: {
      ...typography.body,
      color: colors.light.mediumGray,
    },
    activeTabText: {
      color: colors.light.primaryBlue,
      fontWeight: '600',
    },
    metricsGrid: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
      flexWrap: 'wrap',
    } as ViewStyle,
    metricColumn: {
      flex: isMobile ? 1 : 0.48,
    } as ViewStyle,
    fullWidth: {
      width: '100%',
    } as ViewStyle,
  });

  const renderIndicadores = () => {
    if (infoType === 'qa' && 'contactPercentage' in metrics) {
      const qaMetrics = metrics as QAMetrics;
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="Porcentaje de Contacto"
                value={`${qaMetrics.contactPercentage.toFixed(1)}%`}
                trend={-30}
                trendLabel="vs 100.00%"
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Porcentaje de Buzón de Voz"
                value={`${qaMetrics.voiceMailboxPercentage.toFixed(1)}%`}
              />
            </View>
          </View>

          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={qaMetrics.trend} height={200} />
          </View>

          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <Card style={{ padding: spacing.md }}>
                <Text style={typography.caption}>Numerador</Text>
                <Text style={typography.heading}>{qaMetrics.results.effective}</Text>
              </Card>
            </View>
            <View style={styles.metricColumn}>
              <Card style={{ padding: spacing.md }}>
                <Text style={typography.caption}>Denominador</Text>
                <Text style={typography.heading}>{qaMetrics.results.ineffective}</Text>
              </Card>
            </View>
          </View>
        </ScrollView>
      );
    }

    if (infoType === 'emotion' && 'sentiment' in metrics) {
      const emotionMetrics = metrics as EmotionMetrics;
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.metricsGrid}>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Sentiment Score"
                value={emotionMetrics.score.toFixed(1)}
                trend={-5}
              />
            </View>
          </View>

          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={emotionMetrics.trend} height={200} />
          </View>

          <Card>
            {Object.entries(emotionMetrics.breakdown).map(([key, value]) => (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.light.lightGray,
                }}
              >
                <Text style={typography.body}>{key}</Text>
                <Text style={[typography.body, { fontWeight: '600' }]}>
                  {value}%
                </Text>
              </View>
            ))}
          </Card>
        </ScrollView>
      );
    }

    if (infoType === 'compliance' && 'violations' in metrics) {
      const complianceMetrics = metrics as ComplianceMetrics;
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard label="Violations" value={complianceMetrics.violations} />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard label="Coverage" value={`${complianceMetrics.coverage}%`} />
            </View>
          </View>

          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={complianceMetrics.trend} height={200} />
          </View>

          <Card>
            {complianceMetrics.alerts.map((alert, idx) => (
              <Text key={idx} style={[typography.body, { marginBottom: spacing.sm }]}>
                • {alert}
              </Text>
            ))}
          </Card>
        </ScrollView>
      );
    }

    return null;
  };

  const renderContactos = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ContactList
        contacts={mockContacts}
        onSelectContact={(contact) => onSelectContact(contact.id)}
      />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{dashboard.name}</Text>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton currentType={infoType} onSelect={setInfoType} />
      </View>

      <View style={styles.tabContainer}>
        {['indicadores', 'contactos'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as 'indicadores' | 'contactos')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === 'indicadores' ? 'Indicadores' : 'Detalles de contacto'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'indicadores' ? renderIndicadores() : renderContactos()}
    </View>
  );
};

import { TouchableOpacity } from 'react-native';
```

- [ ] **Step 2: Commit**

```bash
git add src/screens/CampaignDashboard.tsx
git commit -m "feat: add CampaignDashboard screen with Indicadores and Contactos tabs"
```

---

### Task 10: Screens Part 3 - ContactDetails & Settings

**Files:**
- Create: `src/screens/ContactDetails.tsx`
- Create: `src/screens/Settings.tsx`

**Interfaces:**
- Produces: Contact detail view and Settings screen

- [ ] **Step 1: Create ContactDetails.tsx**

```typescript
// src/screens/ContactDetails.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card, Button } from '../components';
import { Contact } from '../data/mockContacts';
import { usePlatform } from '../hooks/usePlatform';

interface ContactDetailsScreenProps {
  contact: Contact | null;
  onBack: () => void;
}

export const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({
  contact,
  onBack,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.light.bgSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
      alignSelf: 'center',
    },
    avatarText: {
      fontSize: 40,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.subheading,
      color: colors.light.darkGray,
      marginBottom: spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
    } as ViewStyle,
    infoLabel: {
      ...typography.caption,
      color: colors.light.mediumGray,
    },
    infoValue: {
      ...typography.body,
      color: colors.light.darkGray,
      fontWeight: '600',
    },
    actionButtonsContainer: {
      gap: spacing.md,
      marginTop: spacing.lg,
      marginBottom: spacing.xxl,
    } as ViewStyle,
  });

  if (!contact) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.header}>Contact not found</Text>
        <Button title="Back" onPress={onBack} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{contact.name}</Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{contact.avatar}</Text>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{contact.name}</Text>
          </View>
          {contact.role && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoValue}>{contact.role}</Text>
            </View>
          )}
          {contact.status && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{contact.status}</Text>
            </View>
          )}
          <View
            style={[
              styles.infoRow,
              { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.infoLabel}>Action</Text>
            <Text
              style={[
                styles.infoValue,
                { color: colors.light.successGreen },
              ]}
            >
              {contact.action}
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button title={contact.action} onPress={() => {}} />
        <Button title="Back" onPress={onBack} variant="secondary" />
      </View>
    </ScrollView>
  );
};
```

- [ ] **Step 2: Create Settings.tsx**

```typescript
// src/screens/Settings.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Switch,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card, Button } from '../components';
import { usePlatform } from '../hooks/usePlatform';

export const SettingsScreen: React.FC = () => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'spanish' | 'english'>('spanish');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.md,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
    } as ViewStyle,
    settingLabel: {
      ...typography.body,
      color: colors.light.darkGray,
    },
    profileCard: {
      marginBottom: spacing.md,
    },
    profileName: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.xs,
    },
    profileEmail: {
      ...typography.caption,
      color: colors.light.mediumGray,
    },
    versionText: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginTop: spacing.lg,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Ajustes</Text>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        <Card style={styles.profileCard}>
          <Text style={styles.profileName}>Aristides Santana</Text>
          <Text style={styles.profileEmail}>
            aristides.santana@newtechsa.com
          </Text>
          <Text
            style={[
              typography.caption,
              { color: colors.light.successGreen, marginTop: spacing.sm },
            ]}
          >
            Estado iniciada
          </Text>
        </Card>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Cambiar cliente</Text>
            <Text>›</Text>
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Cambiar contraseña</Text>
            <Text>›</Text>
          </View>
        </Card>
      </View>

      {/* Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <Card>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Inicio de sesión biométrico</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{
                false: colors.light.lightGray,
                true: colors.light.successGreen,
              }}
              thumbColor={colors.light.bgPrimary}
            />
          </View>
        </Card>
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Tema</Text>
            <Text style={typography.caption}>
              {theme === 'light' ? '☀️ Claro' : '🌙 Oscuro'}
            </Text>
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Idioma</Text>
            <Text style={typography.caption}>
              {language === 'spanish' ? '🇪🇸 Español' : '🇺🇸 English'}
            </Text>
          </View>
        </Card>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de</Text>
        <Card>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Versión</Text>
            <Text style={typography.caption}>26.08.10 (2)</Text>
          </View>
        </Card>
      </View>

      {/* Sign Out Button */}
      <Button
        title="Cerrar sesión"
        onPress={() => {}}
        variant="secondary"
        style={{ marginBottom: spacing.xxl, borderWidth: 1, borderColor: colors.light.dangerRed }}
      />

      <Text style={styles.versionText}>v1.0.0</Text>
    </ScrollView>
  );
};
```

- [ ] **Step 3: Update screens to export all**

Create `src/screens/index.ts`:

```typescript
// src/screens/index.ts

export { DashboardsScreen } from './Dashboards';
export { CampaignDashboardScreen } from './CampaignDashboard';
export { ContactDetailsScreen } from './ContactDetails';
export { SettingsScreen } from './Settings';
```

- [ ] **Step 4: Commit**

```bash
git add src/screens/ContactDetails.tsx src/screens/Settings.tsx src/screens/index.ts
git commit -m "feat: add ContactDetails and Settings screens"
```

---

### Task 11: Global Styles & App.tsx Setup

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/App.tsx`

**Interfaces:**
- Produces: Main app component with routing, context providers

- [ ] **Step 1: Create globals.css**

```css
/* src/styles/globals.css */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #ffffff;
  color: #333333;
}

#root {
  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
}
```

- [ ] **Step 2: Create App.tsx**

```typescript
// src/App.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ViewStyle,
} from 'react-native';
import { PlatformProvider } from './context/PlatformContext';
import { AppProvider } from './context/AppContext';
import { PlatformToggle, TabBar } from './components';
import {
  DashboardsScreen,
  CampaignDashboardScreen,
  ContactDetailsScreen,
  SettingsScreen,
} from './screens';
import { useAppContext } from './context/AppContext';
import { usePlatform } from './hooks/usePlatform';
import { colors, spacing } from './design';
import { mockContacts } from './data/mockContacts';

type Screen = 'dashboards' | 'campaign' | 'contact' | 'settings';

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboards');
  const { currentDashboard, setCurrentDashboard } = useAppContext();
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const selectedContact = mockContacts.find((c) => c.id === selectedContactId);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
    } as ViewStyle,
    safeArea: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
    } as ViewStyle,
    content: {
      flex: 1,
      position: 'relative',
    } as ViewStyle,
  });

  const tabs = [
    { id: 'dashboards', label: 'Dashboards', icon: '📊' },
    { id: 'campaign', label: 'Campaign', icon: '📈' },
    { id: 'contact', label: 'Contact', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleSelectDashboard = (dashboardId: string) => {
    setCurrentDashboard(dashboardId);
    setCurrentScreen('campaign');
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setCurrentScreen('contact');
  };

  const handleBack = () => {
    if (currentScreen === 'contact') {
      setCurrentScreen('campaign');
      setSelectedContactId(null);
    } else if (currentScreen === 'campaign') {
      setCurrentScreen('dashboards');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboards':
        return (
          <DashboardsScreen onSelectDashboard={handleSelectDashboard} />
        );
      case 'campaign':
        return currentDashboard ? (
          <CampaignDashboardScreen
            onSelectContact={handleSelectContact}
            onBack={handleBack}
          />
        ) : (
          <DashboardsScreen onSelectDashboard={handleSelectDashboard} />
        );
      case 'contact':
        return (
          <ContactDetailsScreen contact={selectedContact || null} onBack={handleBack} />
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardsScreen onSelectDashboard={handleSelectDashboard} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PlatformToggle />
        <View style={styles.content}>{renderScreen()}</View>
        <TabBar
          currentScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen as Screen)}
          tabs={tabs}
        />
      </View>
    </SafeAreaView>
  );
};

export const App: React.FC = () => {
  return (
    <PlatformProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </PlatformProvider>
  );
};

export default App;
```

- [ ] **Step 3: Create src/index.tsx**

```typescript
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/index.tsx src/styles/globals.css
git commit -m "feat: create App component with routing and global styles"
```

---

### Task 12: Component Showcase Page

**Files:**
- Create: `src/pages/ComponentShowcase.tsx`

**Interfaces:**
- Produces: /showcase route displaying all components with variants

- [ ] **Step 1: Create ComponentShowcase.tsx**

```typescript
// src/pages/ComponentShowcase.tsx

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import {
  Button,
  Card,
  Badge,
  MetricCard,
  Chart,
  ContactList,
  FilterButton,
  TabBar,
  PlatformToggle,
} from '../components';
import { usePlatform } from '../hooks/usePlatform';
import { mockContacts } from '../data/mockContacts';

export const ComponentShowcase: React.FC = () => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [selectedInfoType, setSelectedInfoType] = useState<'qa' | 'emotion' | 'compliance'>('qa');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    sectionHeader: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginTop: spacing.lg,
      marginBottom: spacing.md,
    },
    section: {
      marginBottom: spacing.xl,
      paddingBottom: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
    } as ViewStyle,
    componentGrid: {
      flexDirection: 'row',
      gap: spacing.md,
      flexWrap: 'wrap',
    } as ViewStyle,
    componentItem: {
      flex: isMobile ? 1 : 0.48,
    } as ViewStyle,
    componentRow: {
      gap: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Component Showcase</Text>

      {/* Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Buttons</Text>
        <Text style={styles.label}>Primary</Text>
        <Button title="Primary Button" onPress={() => {}} />
        <Text style={styles.label}>Secondary</Text>
        <Button
          title="Secondary Button"
          onPress={() => {}}
          variant="secondary"
        />
        <Text style={styles.label}>Disabled</Text>
        <Button title="Disabled Button" onPress={() => {}} disabled />
      </View>

      {/* Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Cards</Text>
        <Card>
          <Text style={typography.subheading}>Default Card</Text>
          <Text style={[typography.body, { marginTop: spacing.sm }]}>
            This is a card component with content inside.
          </Text>
        </Card>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Badges</Text>
        <View style={styles.componentRow}>
          <Badge status="active" />
          <Badge status="inactive" />
          <Badge status="completed" />
        </View>
        <View style={styles.componentRow}>
          <Badge status="failed" />
          <Badge status="paused" />
        </View>
      </View>

      {/* Metric Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Metric Cards</Text>
        <MetricCard
          label="Contact Percentage"
          value="70%"
          trend={-30}
          trendLabel="vs 100%"
        />
        <MetricCard label="Score" value="8.5" trend={2} />
      </View>

      {/* Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Chart</Text>
        <Chart data={[0.2, 1, 3, 5, 5.5, 5.8, 4.5]} height={200} />
      </View>

      {/* Filter Button */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Filter Button</Text>
        <FilterButton
          currentType={selectedInfoType}
          onSelect={setSelectedInfoType}
        />
      </View>

      {/* Contact List */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contact List</Text>
        <ContactList
          contacts={mockContacts.slice(0, 3)}
          onSelectContact={() => {}}
        />
      </View>

      {/* Tab Bar */}
      <View style={[styles.section, { marginBottom: spacing.lg }]}>
        <Text style={styles.sectionHeader}>Tab Bar</Text>
        <Text style={styles.label}>Mobile Style</Text>
        <View style={{ height: 56 }}>
          <TabBar
            currentScreen="component"
            onSelectScreen={() => {}}
            tabs={[
              { id: 'tab1', label: 'Tab 1', icon: '📊' },
              { id: 'tab2', label: 'Tab 2', icon: '📈' },
              { id: 'tab3', label: 'Tab 3', icon: '⚙️' },
            ]}
          />
        </View>
      </View>
    </ScrollView>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ComponentShowcase.tsx
git commit -m "feat: add ComponentShowcase page"
```

---

### Task 13: Design System Documentation Files

**Files:**
- Create: `design.md`
- Create: `components.md`

**Interfaces:**
- Produces: Markdown documentation for design system and components

- [ ] **Step 1: Create design.md**

```markdown
# Design System Documentation

## Color Palette

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | #0066CC | Actions, highlights, active state |
| Success Green | #00AA44 | Positive metrics, completed status |
| Warning Orange | #FF9900 | Alerts, warnings, in-progress |
| Danger Red | #FF3333 | Errors, negative trends |
| Dark Gray | #333333 | Primary text |
| Medium Gray | #666666 | Secondary text |
| Light Gray | #CCCCCC | Borders, dividers |
| Background Primary | #FFFFFF | Main background |
| Background Secondary | #F5F5F5 | Card backgrounds, subtle sections |

### Dark Theme

- Primary bg: #1A1A1A
- Secondary bg: #2A2A2A
- Text inverted for contrast compliance

---

## Typography

| Scale | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 32px | 700 | Screen titles |
| Heading | 24px | 700 | Section headers, card titles |
| Subheading | 18px | 600 | Subsection headers |
| Body | 16px | 400 | Body text, descriptions |
| Label | 14px | 600 | Buttons, tags, filter labels |
| Caption | 12px | 400 | Meta text, timestamps |

**Font Family:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

---

## Spacing

Base unit: **8px**

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Button padding, small gaps |
| md | 16px | Section margins, card padding |
| lg | 24px | Major section spacing |
| xl | 32px | Large grouping |
| xxl | 48px | Screen edge margins |

All spacing uses multiples of 8px.

---

## Component Design Rules

| Component | Rule |
|-----------|------|
| Cards | 12px border-radius, 2px shadow, subtle border |
| Buttons | 8px border-radius, min 44px height (mobile) |
| Inputs | 8px border-radius, 16px padding |
| Charts | Responsive width, maintains aspect ratio |
| Tab Bars | Mobile: 56px height; Web: compact |
| Badges | Colored dot + label, status-based colors |

---

## Responsive Breakpoint

- **Mobile:** width < 768px (single column, full-width cards)
- **Web:** width >= 768px (multi-column, grids)

---

## Shadows

- Light: 2px elevation, opacity 0.05
- Used on cards and elevated components

---

## Borders

- Radius: 8-12px (components), 12px (cards)
- Color: Light Gray (#CCCCCC) for light borders
- Width: 1px for borders, 3px for active states
```

- [ ] **Step 2: Create components.md**

```markdown
# Components API Reference

## Button

```typescript
<Button
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  style?: ViewStyle
/>
```

**States:** Default, Hover, Active, Disabled

**Variants:**
- Primary: Blue background, white text
- Secondary: Secondary background, dark text

**Mobile vs Web:** Same size (min 44px height), consistent styling

---

## Card

```typescript
<Card
  children: React.ReactNode
  style?: ViewStyle
/>
```

**Styling:** 12px border-radius, subtle shadow, light gray border

**Usage:** Container for content, metrics, contact info

---

## Badge

```typescript
<Badge
  status: 'active' | 'inactive' | 'completed' | 'failed' | 'paused'
/>
```

**Displays:** Colored dot + status label

**Status Colors:**
- Active: Green
- Inactive: Gray
- Completed: Green
- Failed: Red
- Paused: Orange

---

## MetricCard

```typescript
<MetricCard
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
/>
```

**Displays:** Label, large value, trend indicator (↑/↓)

**Trend:** Positive = green, Negative = red

---

## Chart

```typescript
<Chart
  data: number[]
  height?: number
  labels?: string[]
/>
```

**Type:** Line chart with gradient fill

**Responsive:** Adapts to container width

---

## ContactList

```typescript
<ContactList
  contacts: Contact[]
  onSelectContact: (contact: Contact) => void
/>
```

**Item:** Name, action label (green), chevron indicator

**Interactions:** Tap to select

---

## FilterButton

```typescript
<FilterButton
  currentType: InfoType
  onSelect: (type: InfoType) => void
/>
```

**Displays:** Current info type, opens modal on tap

**Options:** QA, Emotion & Sentiment, Compliance

---

## TabBar

```typescript
<TabBar
  currentScreen: string
  onSelectScreen: (screen: string) => void
  tabs: { id: string; label: string; icon: string }[]
/>
```

**Mobile:** 56px height, icons + labels, bottom placement

**Web:** Compact height, top or side placement

**States:** Active tab underlined in blue

---

## PlatformToggle

```typescript
<PlatformToggle />
```

**Display:** Top-right corner, subtle button

**Toggles:** Mobile (📱) ↔ Web (💻)

**Persisted:** localStorage `platform_preference`

---

## Info Types

```typescript
type InfoType = 'qa' | 'emotion' | 'compliance';
```

- **QA:** Contact percentage, mailbox percentage, effectiveness ratio
- **Emotion:** Sentiment score, emotion breakdown, trend
- **Compliance:** Violations, coverage, alerts

---

## Contact Type

```typescript
interface Contact {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  status?: string;
  action: string;
}
```

---

## Dashboard Type

```typescript
interface Dashboard {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused' | 'completed' | 'failed';
  type: string;
  lastUpdated: string;
  createdAt: string;
}
```
```

- [ ] **Step 3: Commit**

```bash
git add design.md components.md
git commit -m "docs: add design system and component API documentation"
```

---

### Task 14: Vite Config Updates & Package Dependencies

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`

**Interfaces:**
- Produces: Vite-compatible setup for React Native Web

- [ ] **Step 1: Update package.json with all dependencies**

```json
{
  "name": "localization-proto",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-native": "^0.73.0",
    "react-native-web": "^0.19.9"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Update vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
```

- [ ] **Step 3: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Run npm install and start dev server**

```bash
npm install
npm run dev
```

Expected: Vite dev server running at http://localhost:5173 with app loaded

- [ ] **Step 5: Commit**

```bash
git add package.json vite.config.ts tsconfig.node.json
git commit -m "chore: update Vite config and dependencies"
```

---

### Task 15: Integration Testing & Platform Verification

**Files:** None (manual testing)

**Interfaces:**
- Produces: Verified working prototype on mobile and web

- [ ] **Step 1: Test Mobile View**

Run dev server: `npm run dev`
- Open http://localhost:5173
- Platform toggle should show 📱 (mobile)
- View should be single-column
- Tab bar at bottom (56px height)
- Test dashboard selection → navigate to campaign dashboard
- Test info type filter → metrics update
- Test contact selection → detail view
- Test settings access

Expected: All flows work, mobile layout responsive

- [ ] **Step 2: Toggle to Web View**

- Click platform toggle (top-right)
- Platform should change to 💻
- Layout should update to multi-column
- Tab bar should be compact
- All screens functional
- Metrics in grid layout

Expected: Web layout distinct but same content

- [ ] **Step 3: Test Info Type Switching**

- Dashboard view: QA selected
- Click filter button
- Select "Emotion & Sentiment"
- Metrics should update
- Chart and cards should reflect emotion data
- Switch to "Compliance"
- Verify compliance data displays

Expected: All three info types work, data switches correctly

- [ ] **Step 4: Test Navigation Flows**

- Dashboards → Campaign → Contact → Back → Campaign → Back → Dashboards
- Each navigation should work
- Tab bar navigation between screens
- Settings screen accessible from tab bar

Expected: All navigation flows working

- [ ] **Step 5: Verify Component Showcase (Optional)**

- Create route or mode to view ComponentShowcase
- All components render
- Buttons, cards, charts, badges visible

Expected: Component showcase page displays all components

- [ ] **Step 6: Commit**

```bash
git add . && git commit -m "test: verify integration and platform-specific layouts"
```

---

## Summary

**14 Tasks completed:**
1. Project initialization & Vite setup
2. Design tokens (colors, typography, spacing)
3. Context & hooks setup
4. Mock data creation
5. Base components (Button, Card, Badge)
6. Specialized components (MetricCard, Chart, ContactList, FilterButton)
7. Platform toggle & TabBar
8. Dashboards screen
9. Campaign Dashboard screen
10. Contact Details & Settings screens
11. Global styles & App.tsx
12. Component Showcase page
13. Design system documentation
14. Vite config updates & integration testing

**Deliverables:**
- ✅ Single React Native Web codebase
- ✅ Mobile and web platform switching with persistence
- ✅ Design system (colors, typography, spacing)
- ✅ 8+ reusable components
- ✅ 4 screens with full navigation
- ✅ Mock data for QA/Emotion/Compliance info types
- ✅ Component Showcase page
- ✅ design.md + components.md documentation

---
