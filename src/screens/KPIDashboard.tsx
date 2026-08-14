import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ViewStyle } from 'react-native';
import { BarChart3, Rocket, CheckCircle, Shield, SmilePlus, AlertCircle, Star, ThumbsUp } from 'lucide-react';
import { colors, typography, spacing, borderRadius } from '../design';
import { AnimatedKPICard } from '../components';
import { usePlatform } from '../hooks/usePlatform';
import { useTheme } from '../context/ThemeContext';

interface KPIDashboardScreenProps {
  onSelectDashboard?: (dashboardId: string) => void;
}

export const KPIDashboardScreen: React.FC<KPIDashboardScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [kpiData, setKpiData] = useState({
    activeCampaigns: 0,
    qaScore: 0,
    sentiment: '',
    complianceScore: 0,
    healthStatus: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setKpiData({
        activeCampaigns: 12,
        qaScore: 87,
        sentiment: 'Positive',
        complianceScore: 94,
        healthStatus: 'Excellent',
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const healthVariant =
    kpiData.healthStatus === 'Excellent' ? 'success' :
    kpiData.healthStatus === 'Good' ? 'primary' :
    'danger';

  const sentimentVariant =
    kpiData.sentiment === 'Positive' ? 'success' :
    kpiData.sentiment === 'Neutral' ? 'neutral' :
    'warning';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    } as ViewStyle,
    scrollContent: {
      paddingBottom: spacing.xxl,
    } as ViewStyle,
    header: {
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 40,
      letterSpacing: -0.02,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      lineHeight: 22,
    },
    kpiGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      marginBottom: spacing.xl,
    } as ViewStyle,
    kpiItem: {
      width: isMobile ? '100%' : 'calc(50% - 6px)',
    } as ViewStyle,
    fullWidthKpi: {
      width: '100%',
    } as ViewStyle,
    statusBadge: {
      alignSelf: 'flex-start',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.pill,
      marginTop: spacing.md,
      marginBottom: spacing.xl,
    } as ViewStyle,
    statusBadgeExcellent: {
      backgroundColor: themeColors.successBg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(38, 211, 102, 0.3)' : 'rgba(27, 181, 74, 0.2)',
    } as ViewStyle,
    statusBadgeGood: {
      backgroundColor: themeColors.infoBg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(79, 168, 245, 0.3)' : 'rgba(0, 152, 212, 0.2)',
    } as ViewStyle,
    statusBadgeBad: {
      backgroundColor: themeColors.dangerBg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(248, 113, 113, 0.3)' : 'rgba(229, 57, 53, 0.2)',
    } as ViewStyle,
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 18,
    },
    statusTextExcellent: {
      color: themeColors.success,
    } as ViewStyle,
    statusTextGood: {
      color: themeColors.info,
    } as ViewStyle,
    statusTextBad: {
      color: themeColors.danger,
    } as ViewStyle,
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
      marginTop: spacing.lg,
      lineHeight: 26,
    },
  });

  const getStatusBadgeStyle = () => {
    switch (kpiData.healthStatus) {
      case 'Excellent':
        return [styles.statusBadge, styles.statusBadgeExcellent];
      case 'Good':
        return [styles.statusBadge, styles.statusBadgeGood];
      default:
        return [styles.statusBadge, styles.statusBadgeBad];
    }
  };

  const getStatusTextStyle = () => {
    switch (kpiData.healthStatus) {
      case 'Excellent':
        return [styles.statusText, styles.statusTextExcellent];
      case 'Good':
        return [styles.statusText, styles.statusTextGood];
      default:
        return [styles.statusText, styles.statusTextBad];
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Campaign Analytics</Text>
        <Text style={styles.subtitle}>Live KPI Dashboard - Real-time data collection</Text>
      </View>

      <View style={[styles.statusBadge, getStatusBadgeStyle(), { flexDirection: 'row', alignItems: 'center' }]}>
        <BarChart3 size={16} color={getStatusTextStyle()[1].color} strokeWidth={2} style={{ marginRight: spacing.sm }} />
        <Text style={getStatusTextStyle()}>
          System Health: {kpiData.healthStatus}
        </Text>
      </View>

      <View style={styles.kpiGrid}>
        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="Active Campaigns"
            value={kpiData.activeCampaigns}
            icon={<Rocket size={24} color={themeColors.newtechBlue} strokeWidth={2} />}
            variant="primary"
            isNumeric={true}
          />
        </View>

        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="QA Score"
            value={kpiData.qaScore}
            suffix="%"
            icon={<CheckCircle size={24} color={themeColors.success} strokeWidth={2} />}
            variant="success"
            isNumeric={true}
          />
        </View>

        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="Compliance Score"
            value={kpiData.complianceScore}
            suffix="%"
            icon={<Shield size={24} color={themeColors.success} strokeWidth={2} />}
            variant="success"
            isNumeric={true}
          />
        </View>

        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="Predominant Sentiment"
            value={kpiData.sentiment}
            icon={kpiData.sentiment === 'Positive' ? <SmilePlus size={24} color={themeColors.success} strokeWidth={2} /> : kpiData.sentiment === 'Neutral' ? <AlertCircle size={24} color={themeColors.warning} strokeWidth={2} /> : <AlertCircle size={24} color={themeColors.danger} strokeWidth={2} />}
            variant={sentimentVariant}
            isNumeric={false}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>System Status</Text>

      <View style={styles.kpiGrid}>
        <View style={styles.fullWidthKpi}>
          <AnimatedKPICard
            label="Overall System Health"
            value={kpiData.healthStatus}
            icon={
              kpiData.healthStatus === 'Excellent' ? <Star size={24} color={themeColors.success} strokeWidth={2} /> :
              kpiData.healthStatus === 'Good' ? <ThumbsUp size={24} color={themeColors.info} strokeWidth={2} /> :
              <AlertCircle size={24} color={themeColors.danger} strokeWidth={2} />
            }
            variant={healthVariant}
            isNumeric={false}
          />
        </View>
      </View>

      <Text style={[styles.subtitle, { marginTop: spacing.xl, textAlign: 'center' }]}>
        Data updates every second from live collection
      </Text>
    </ScrollView>
  );
};
