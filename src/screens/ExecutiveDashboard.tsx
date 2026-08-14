import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components';
import {
  TrendingUp,
  Users,
  Zap,
  Activity,
  Target,
  Shield,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Smile,
} from 'lucide-react';

interface KPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: string;
  status?: 'healthy' | 'risky' | 'low';
}

const getStatusStyles = (status?: string, isDark?: boolean, themeColors?: any) => {
  switch (status) {
    case 'healthy':
      return {
        backgroundColor: isDark ? 'rgba(26, 211, 102, 0.15)' : 'rgba(27, 181, 74, 0.1)',
        color: isDark ? '#26D366' : '#1BB54A',
        borderColor: isDark ? 'rgba(26, 211, 102, 0.3)' : 'rgba(27, 181, 74, 0.2)',
        icon: <CheckCircle2 size={16} color={isDark ? '#26D366' : '#1BB54A'} />,
      };
    case 'risky':
      return {
        backgroundColor: isDark ? 'rgba(251, 191, 36, 0.15)' : 'rgba(245, 158, 11, 0.1)',
        color: isDark ? '#FBBF24' : '#F59E0B',
        borderColor: isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(245, 158, 11, 0.2)',
        icon: <AlertCircle size={16} color={isDark ? '#FBBF24' : '#F59E0B'} />,
      };
    case 'low':
      return {
        backgroundColor: isDark ? 'rgba(248, 113, 113, 0.15)' : 'rgba(229, 57, 53, 0.1)',
        color: isDark ? '#F87171' : '#E53935',
        borderColor: isDark ? 'rgba(248, 113, 113, 0.3)' : 'rgba(229, 57, 53, 0.2)',
        icon: <AlertCircle size={16} color={isDark ? '#F87171' : '#E53935'} />,
      };
    default:
      return {
        backgroundColor: isDark ? 'rgba(79, 168, 245, 0.15)' : 'rgba(0, 152, 212, 0.1)',
        color: isDark ? '#4FA8F5' : '#0098D4',
        borderColor: isDark ? 'rgba(79, 168, 245, 0.3)' : 'rgba(0, 152, 212, 0.2)',
        icon: null,
      };
  }
};

const KPICard: React.FC<KPICardProps> = ({
  icon,
  label,
  value,
  change,
  unit,
  trend = 'up',
  accentColor,
  status,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getTrendColor = () => {
    if (trend === 'up') return themeColors.success;
    if (trend === 'down') return themeColors.danger;
    return themeColors.info;
  };

  const trendColor = getTrendColor();
  const isTrendPositive = trend === 'up';
  const statusStyles = status ? getStatusStyles(status, isDark, themeColors) : null;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: isDark
        ? 'rgba(20, 26, 34, 0.65)'
        : 'rgba(255, 255, 255, 0.75)',
      borderRadius: 20,
      padding: 24,
      borderWidth: 1,
      borderColor: isDark
        ? 'rgba(27, 181, 74, 0.2)'
        : 'rgba(27, 181, 74, 0.15)',
      backdropFilter: 'blur(16px)',
      shadowColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 8,
    } as ViewStyle,
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: isDark ? 'rgba(107, 114, 128, 0.15)' : 'rgba(107, 114, 128, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(107, 114, 128, 0.25)' : 'rgba(107, 114, 128, 0.15)',
    } as ViewStyle,
    icon: {
      width: 24,
      height: 24,
      color: accentColor || themeColors.newtechGreen,
    },
    label: {
      fontSize: 10,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
      lineHeight: 14,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as any,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: spacing.md,
    } as ViewStyle,
    value: {
      fontSize: 20,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 28,
      letterSpacing: -0.01,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    unit: {
      fontSize: 12,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      marginLeft: 4,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    } as ViewStyle,
    trendText: {
      fontSize: 11,
      fontWeight: '500',
      color: trendColor,
      lineHeight: 16,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 7,
      paddingHorizontal: 11,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: statusStyles?.borderColor,
      backgroundColor: statusStyles?.backgroundColor,
      alignSelf: 'flex-start',
      marginTop: spacing.md,
    } as ViewStyle,
    statusText: {
      fontSize: 11,
      fontWeight: '600',
      color: statusStyles?.color,
      lineHeight: 15,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? <Text>{icon}</Text> : icon}
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {status ? (
        <View style={styles.statusBadge}>
          {statusStyles?.icon}
          <Text style={styles.statusText}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
        </View>
      ) : (
        change !== undefined && (
          <View style={styles.trendContainer}>
            {isTrendPositive ? (
              <TrendingUp size={16} color={trendColor} />
            ) : (
              <TrendingUp
                size={16}
                color={trendColor}
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            )}
            <Text style={styles.trendText}>
              {isTrendPositive ? '+' : ''}{change}% from last month
            </Text>
          </View>
        )
      )}
    </View>
  );
};

const NavBar: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    navbar: {
      backgroundColor: isDark
        ? 'rgba(20, 26, 34, 0.55)'
        : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(24px)',
      borderBottomWidth: 1,
      borderBottomColor: isDark
        ? 'rgba(27, 181, 74, 0.15)'
        : 'rgba(27, 181, 74, 0.12)',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    } as ViewStyle,
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: themeColors.inkPrimary,
      lineHeight: 28,
      letterSpacing: -0.01,
    },
    timeframe: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: isDark
        ? 'rgba(27, 181, 74, 0.15)'
        : 'rgba(27, 181, 74, 0.1)',
      borderRadius: 8,
      lineHeight: 16,
      borderWidth: 1,
      borderColor: isDark
        ? 'rgba(27, 181, 74, 0.3)'
        : 'rgba(27, 181, 74, 0.2)',
    },
  });

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Executive Dashboard</Text>
      <Text style={styles.timeframe}>Real-time</Text>
    </View>
  );
};

export const ExecutiveDashboardScreen: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const kpis = {
      qaScore: 87.5,
      complianceScore: 92.3,
    };

    Object.keys(kpis).forEach((key) => {
      setTimeout(() => {
        setAnimatedValues((prev) => ({
          ...prev,
          [key]: kpis[key as keyof typeof kpis],
        }));
      }, Math.random() * 600);
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0B0F14' : '#F7F8FA',
      backgroundImage: isDark
        ? `radial-gradient(circle at 95% 5%, rgba(38, 211, 102, 0.15) 0%, rgba(11, 15, 20, 0) 25%),
           radial-gradient(ellipse 900px 700px at 50% 120%, rgba(38, 211, 102, 0.1) 0%, rgba(11, 15, 20, 0) 45%),
           radial-gradient(ellipse 800px 900px at -20% 105%, rgba(38, 211, 102, 0.1) 0%, rgba(11, 15, 20, 0) 55%)`
        : `radial-gradient(circle at 95% 5%, rgba(27, 181, 74, 0.1) 0%, rgba(247, 248, 250, 0) 25%),
           radial-gradient(ellipse 900px 700px at 50% 120%, rgba(27, 181, 74, 0.08) 0%, rgba(247, 248, 250, 0) 45%),
           radial-gradient(ellipse 800px 900px at -20% 105%, rgba(27, 181, 74, 0.08) 0%, rgba(247, 248, 250, 0) 55%)`,
      paddingTop: spacing.lg,
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    } as ViewStyle,
    content: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
    } as ViewStyle,
    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: themeColors.steelSecondary,
      marginBottom: spacing.lg,
      marginTop: spacing.xl,
      letterSpacing: 0.8,
      textTransform: 'uppercase' as any,
      lineHeight: 18,
    },
    kpiGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.lg,
      marginBottom: spacing.lg,
    } as ViewStyle,
    fullWidthCard: {
      width: '100%',
    } as ViewStyle,
    chartCard: {
      height: 200,
      backgroundColor: isDark ? 'rgba(20, 26, 34, 0.7)' : 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(79, 168, 245, 0.2)' : 'rgba(0, 152, 212, 0.15)',
      backdropFilter: 'blur(10px)',
      padding: spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: isDark ? 'rgba(79, 168, 245, 0.1)' : 'rgba(0, 152, 212, 0.08)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 8,
    } as ViewStyle,
    chartPlaceholder: {
      textAlign: 'center',
      color: themeColors.steelSecondary,
      fontSize: 14,
      lineHeight: 20,
    },
    chartIcon: {
      width: 48,
      height: 48,
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
      opacity: 0.5,
    },
  });

  const mockKPIs = [
    {
      icon: <Target size={24} color={themeColors.steelSecondary} />,
      label: 'General QA Score',
      value: animatedValues.qaScore ? animatedValues.qaScore.toFixed(1) : '0',
      unit: '%',
      change: 5,
      trend: 'up' as const,
      accentColor: themeColors.newtechGreen,
    },
    {
      icon: <Smile size={24} color={themeColors.steelSecondary} />,
      label: 'Predominant Emotion',
      value: 'Satisfied',
      change: 12,
      trend: 'up' as const,
      accentColor: isDark ? '#4FA8F5' : '#0098D4',
    },
    {
      icon: <Shield size={24} color={themeColors.steelSecondary} />,
      label: 'Compliance Score',
      value: animatedValues.complianceScore ? animatedValues.complianceScore.toFixed(1) : '0',
      unit: '%',
      change: 3,
      trend: 'up' as const,
      accentColor: isDark ? '#FBBF24' : '#F59E0B',
    },
    {
      icon: <Activity size={24} color={themeColors.steelSecondary} />,
      label: 'Operation Health',
      value: 'System Running',
      status: 'healthy' as const,
      accentColor: themeColors.success,
    },
  ];

  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
        <View style={styles.kpiGrid}>
          {mockKPIs.map((kpi, idx) => (
            <KPICard key={idx} {...kpi} />
          ))}
        </View>

      </ScrollView>
    </View>
  );
};
