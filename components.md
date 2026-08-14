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
**Mobile vs Web:** Same size, consistent styling

## Card
```typescript
<Card children: React.ReactNode style?: ViewStyle />
```
**Styling:** 12px radius, subtle shadow, light gray border

## Badge
```typescript
<Badge status: 'active' | 'inactive' | 'completed' | 'failed' | 'paused' />
```
**Displays:** Colored dot + label

## MetricCard
```typescript
<MetricCard
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
/>
```
**Trend:** Positive = green, Negative = red

## Chart
```typescript
<Chart data: number[] height?: number labels?: string[] />
```
**Type:** Line chart with gradient fill, responsive

## ContactList
```typescript
<ContactList
  contacts: Contact[]
  onSelectContact: (contact: Contact) => void
/>
```
**Item:** Name, action label, chevron

## FilterButton
```typescript
<FilterButton currentType: InfoType onSelect: (type: InfoType) => void />
```
**Options:** QA, Emotion & Sentiment, Compliance

## TabBar
```typescript
<TabBar
  currentScreen: string
  onSelectScreen: (screen: string) => void
  tabs: { id: string; label: string; icon: string }[]
/>
```
**Mobile:** 56px height, icons + labels
**Web:** Compact, top/side placement

## PlatformToggle
```typescript
<PlatformToggle />
```
**Display:** Top-right, toggles 📱 ↔ 💻

## Info Types
```typescript
type InfoType = 'qa' | 'emotion' | 'compliance';
```
- **QA:** Contact percentage, mailbox percentage
- **Emotion:** Sentiment score, emotion breakdown
- **Compliance:** Violations, coverage, alerts
