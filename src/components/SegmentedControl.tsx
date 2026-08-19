import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle, Dimensions } from 'react-native';
import { Shield, CheckCircle, Smile, Activity, TrendingUp } from 'lucide-react';
import { colors, spacing, typography } from '../design';
import { useTheme } from '../context/ThemeContext';
import { InfoType } from '../context/AppContext';

interface SegmentedControlProps {
  activeAnalysis: InfoType;
  onSelectAnalysis: (id: InfoType) => void;
}

interface Analysis {
  id: InfoType;
  label: string;
  icon: React.ReactNode;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  activeAnalysis,
  onSelectAnalysis,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [hoveredAnalysis, setHoveredAnalysis] = useState<InfoType | null>(null);

  const displayLabel = hoveredAnalysis || activeAnalysis;

  const analyses: Analysis[] = [
    {
      id: 'operation',
      label: 'Operacional',
      icon: <Activity size={18} />,
    },
    {
      id: 'qa',
      label: 'QA',
      icon: <CheckCircle size={18} />,
    },
    {
      id: 'emotion',
      label: 'Emoción y Sentimiento',
      icon: <Smile size={18} />,
    },
    {
      id: 'compliance',
      label: 'Cumplimiento',
      icon: <Shield size={18} />,
    },
    {
      id: 'insights',
      label: 'Oportunidades de Negocio',
      icon: <TrendingUp size={18} />,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: isDark ? 'rgba(20, 26, 34, 0.4)' : 'rgba(255, 255, 255, 0.5)',
      borderRadius: 8,
      padding: spacing.xs,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.md,
      gap: spacing.xs,
      justifyContent: 'center',
    } as ViewStyle,
    segment: {
      width: 44,
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      borderWidth: 1.5,
      borderColor: 'transparent',
    } as ViewStyle,
    activeSegment: {
      backgroundColor: isDark
        ? 'rgba(27, 181, 74, 0.25)'
        : 'rgba(27, 181, 74, 0.18)',
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
    inactiveSegment: {
      backgroundColor: 'transparent',
      borderColor: isDark ? 'rgba(200, 204, 211, 0.15)' : 'rgba(99, 115, 129, 0.12)',
    } as ViewStyle,
    icon: {
      opacity: 0.7,
    } as ViewStyle,
    activeIcon: {
      opacity: 1,
    } as ViewStyle,
    labelContainer: {
      marginTop: spacing.md,
      minHeight: 24,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    label: {
      fontSize: 13,
      fontWeight: '500',
      color: themeColors.inkPrimary,
      lineHeight: 18,
    } as ViewStyle,
  });

  const currentLabel = analyses.find(a => a.id === displayLabel)?.label || '';

  return (
    <View>
      <View style={styles.container}>
        {analyses.map((analysis) => {
          const isActive = analysis.id === activeAnalysis;
          return (
            <View
              key={analysis.id}
              // @ts-ignore - Web event support
              onMouseEnter={() => setHoveredAnalysis(analysis.id)}
              onMouseLeave={() => setHoveredAnalysis(null)}
              // @ts-ignore - Web style support
              style={{ cursor: 'pointer' }}
            >
              <TouchableOpacity
                style={[
                  styles.segment,
                  isActive ? styles.activeSegment : styles.inactiveSegment,
                ]}
                onPress={() => onSelectAnalysis(analysis.id)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityLabel={analysis.label}
              >
                <View style={[styles.icon, isActive && styles.activeIcon]}>
                  {React.cloneElement(analysis.icon as React.ReactElement, {
                    color: isActive ? themeColors.newtechGreen : themeColors.steelSecondary,
                  })}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{currentLabel}</Text>
      </View>
    </View>
  );
};
