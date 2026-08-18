import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { AnalysisType } from '../contexts/GlobalAnalyticsContext';

interface AnalysisTabSelectorProps {
  activeTab: AnalysisType;
  onSelectTab: (tab: AnalysisType) => void;
}

const ANALYSIS_TABS: { id: AnalysisType; label: string }[] = [
  { id: 'operation', label: 'Operacional' },
  { id: 'qa', label: 'QA' },
  { id: 'emotion', label: 'Emoción & Sentimiento' },
  { id: 'compliance', label: 'Cumplimiento' },
  { id: 'insights', label: 'Business Insights' },
];

export const AnalysisTabSelector: React.FC<AnalysisTabSelectorProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    scrollContainer: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    } as ViewStyle,
    tabsWrapper: {
      flexDirection: 'row',
      gap: spacing.sm,
    } as ViewStyle,
    tab: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    tabActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    tabInactive: {
      backgroundColor: 'transparent',
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    tabText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
    } as TextStyle,
    tabTextActive: {
      color: colors.light.canvasFrost,
    } as TextStyle,
    tabTextInactive: {
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.tabsWrapper}>
          {ANALYSIS_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id ? styles.tabActive : styles.tabInactive,
              ]}
              onPress={() => onSelectTab(tab.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id ? styles.tabTextActive : styles.tabTextInactive,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
