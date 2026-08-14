import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Button, Card, Badge, MetricCard, Chart, ContactList, FilterButton, TabBar } from '../components';
import { usePlatform } from '../hooks/usePlatform';
import { mockContacts } from '../data/mockContacts';
import { InfoType } from '../context/AppContext';

export const ComponentShowcase: React.FC = () => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [selectedInfoType, setSelectedInfoType] = useState<InfoType>('operation');

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
    label: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
    componentRow: {
      gap: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Component Showcase</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Buttons</Text>
        <Text style={styles.label}>Primary</Text>
        <Button title="Primary Button" onPress={() => {}} />
        <Text style={styles.label}>Secondary</Text>
        <Button title="Secondary Button" onPress={() => {}} variant="secondary" />
        <Text style={styles.label}>Disabled</Text>
        <Button title="Disabled Button" onPress={() => {}} disabled />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Cards</Text>
        <Card>
          <Text style={typography.subheading}>Default Card</Text>
          <Text style={[typography.body, { marginTop: spacing.sm }]}>
            This is a card component with content inside.
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Badges</Text>
        <View style={styles.componentRow}>
          <Badge status="active" />
          <Badge status="inactive" />
          <Badge status="completed" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Metric Cards</Text>
        <MetricCard label="Contact Percentage" value="70%" trend={-30} trendLabel="vs 100%" />
        <MetricCard label="Score" value="8.5" trend={2} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Chart</Text>
        <Chart data={[0.2, 1, 3, 5, 5.5, 5.8, 4.5]} height={200} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Filter Button</Text>
        <FilterButton currentType={selectedInfoType} onSelect={setSelectedInfoType} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contact List</Text>
        <ContactList contacts={mockContacts.slice(0, 3)} onSelectContact={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Tab Bar</Text>
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
