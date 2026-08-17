import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { Shield, CheckCircle, Smile, Activity } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize, lineHeight, opacity, iconSize } from '../design';
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

const SIDEBAR_WIDTH = 240;

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
      icon: <Shield size={iconSize.md} color={themeColors.steelSecondary} />,
    },
    {
      id: 'qa',
      label: 'QA',
      icon: <CheckCircle size={iconSize.md} color={themeColors.steelSecondary} />,
    },
    {
      id: 'emotion',
      label: 'Emotion',
      icon: <Smile size={iconSize.md} color={themeColors.steelSecondary} />,
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: <Activity size={iconSize.md} color={themeColors.steelSecondary} />,
    },
  ];

  const brandGreenOpacity = isDark ? opacity.lg : opacity.md;

  const styles = StyleSheet.create({
    container: {
      width: SIDEBAR_WIDTH,
      backgroundColor: isDark
        ? `rgba(20, 26, 34, ${opacity['2xl']})`
        : `rgba(255, 255, 255, ${opacity['4xl']})`,
      backdropFilter: 'blur(24px)',
      borderRightWidth: 1,
      borderRightColor: `rgba(27, 181, 74, ${brandGreenOpacity})`,
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
      borderRadius: borderRadius.lg,
      gap: spacing.md,
      borderWidth: 1,
      borderColor: 'transparent',
      transition: 'all 200ms ease-out',
    } as ViewStyle,
    activeButton: {
      backgroundColor: `rgba(27, 181, 74, ${opacity.xl})`,
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
    inactiveButton: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    label: {
      fontSize: fontSize.base,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      lineHeight: lineHeight.normal,
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
            <View style={{ opacity: isActive ? 1 : opacity.half }}>
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
