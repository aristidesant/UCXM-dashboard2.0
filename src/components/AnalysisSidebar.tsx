import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { Shield, CheckCircle, Smile, Activity } from 'lucide-react';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';
import { InfoType } from '../context/AppContext';

interface Analysis {
  id: InfoType;
  label: string;
  icon: React.ReactNode;
}

interface AnalysisSidebarProps {
  activeAnalysis: InfoType;
  onSelectAnalysis: (id: InfoType) => void;
}

export const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
  activeAnalysis,
  onSelectAnalysis,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const analyses: Analysis[] = [
    {
      id: 'operation',
      label: 'Operation',
      icon: <Shield size={24} color={themeColors.steelSecondary} />,
    },
    {
      id: 'qa',
      label: 'QA',
      icon: <CheckCircle size={24} color={themeColors.steelSecondary} />,
    },
    {
      id: 'emotion',
      label: 'Emotion',
      icon: <Smile size={24} color={themeColors.steelSecondary} />,
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: <Activity size={24} color={themeColors.steelSecondary} />,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      width: 240,
      backgroundColor: isDark ? 'rgba(20, 26, 34, 0.65)' : 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(24px)',
      borderRightWidth: 1,
      borderRightColor: isDark ? 'rgba(27, 181, 74, 0.15)' : 'rgba(27, 181, 74, 0.12)',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      gap: spacing.md,
      flexDirection: 'column',
      shadowColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)',
      shadowOffset: { width: 4, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 8,
    } as ViewStyle,
    analysisButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderRadius: 12,
      gap: spacing.md,
      borderWidth: 1,
      borderColor: 'transparent',
      transition: 'all 200ms ease-out',
    } as ViewStyle,
    activeButton: {
      backgroundColor: isDark
        ? 'rgba(27, 181, 74, 0.2)'
        : 'rgba(27, 181, 74, 0.15)',
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
    inactiveButton: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      lineHeight: 20,
    },
    activeLabel: {
      color: themeColors.newtechGreen,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      {analyses.map((analysis) => {
        const isActive = analysis.id === activeAnalysis;
        return (
          <TouchableOpacity
            key={analysis.id}
            style={[
              styles.analysisButton,
              isActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => onSelectAnalysis(analysis.id)}
            activeOpacity={0.7}
          >
            <View style={{ opacity: isActive ? 1 : 0.6 }}>
              {React.cloneElement(analysis.icon as React.ReactElement, {
                color: isActive ? themeColors.newtechGreen : themeColors.steelSecondary,
              })}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {analysis.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
