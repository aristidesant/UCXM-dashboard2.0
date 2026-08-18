import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';

export type EvaluationType = 'operational' | 'qa' | 'sentiment' | 'compliance' | 'business';

interface EvaluationTypeSelectorProps {
  activeType: EvaluationType;
  onSelectType: (type: EvaluationType) => void;
}

const EVALUATION_TYPES: Array<{ id: EvaluationType; label: string; icon: string }> = [
  { id: 'operational', label: 'Operacional', icon: '⚙️' },
  { id: 'qa', label: 'QA', icon: '✓' },
  { id: 'sentiment', label: 'Emoción', icon: '😊' },
  { id: 'compliance', label: 'Cumplimiento', icon: '📋' },
  { id: 'business', label: 'Business', icon: '💼' },
];

export const EvaluationTypeSelector: React.FC<EvaluationTypeSelectorProps> = ({
  activeType,
  onSelectType,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    scrollContent: {
      gap: spacing.sm,
    } as ViewStyle,
    tab: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    tabActive: {
      backgroundColor: colors.light.newtechGreen,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    tabText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      whiteSpace: 'nowrap',
    } as TextStyle,
    tabTextActive: {
      color: colors.light.canvasFrost,
    } as TextStyle,
    icon: {
      fontSize: fontSize.sm,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {EVALUATION_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.tab, activeType === type.id && styles.tabActive]}
            onPress={() => onSelectType(type.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{type.icon}</Text>
            <Text style={[styles.tabText, activeType === type.id && styles.tabTextActive]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
