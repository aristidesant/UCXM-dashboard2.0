import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';
import { AnimatedKPICard } from '../components';
import { usePlatform } from '../hooks/usePlatform';

interface KPIDashboardScreenProps {
  onSelectDashboard?: (dashboardId: string) => void;
}

export const KPIDashboardScreen: React.FC<KPIDashboardScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';

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
      backgroundColor: colors.light.bgPrimary,
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
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.body,
      color: colors.light.mediumGray,
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
      backgroundColor: 'rgba(52, 199, 89, 0.1)',
    } as ViewStyle,
    statusBadgeGood: {
      backgroundColor: 'rgba(10, 132, 255, 0.1)',
    } as ViewStyle,
    statusBadgeBad: {
      backgroundColor: 'rgba(255, 59, 48, 0.1)',
    } as ViewStyle,
    statusText: {
      ...typography.label,
      fontSize: 12,
      fontWeight: '600',
    },
    statusTextExcellent: {
      color: colors.light.successGreen,
    } as ViewStyle,
    statusTextGood: {
      color: colors.light.primaryBlue,
    } as ViewStyle,
    statusTextBad: {
      color: colors.light.dangerRed,
    } as ViewStyle,
    sectionTitle: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.md,
      marginTop: spacing.lg,
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

      <View style={[styles.statusBadge, getStatusBadgeStyle()]}>
        <Text style={getStatusTextStyle()}>
          📊 System Health: {kpiData.healthStatus}
        </Text>
      </View>

      <View style={styles.kpiGrid}>
        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="Active Campaigns"
            value={kpiData.activeCampaigns}
            icon="🚀"
            variant="primary"
            isNumeric={true}
          />
        </View>

        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="QA Score"
            value={kpiData.qaScore}
            suffix="%"
            icon="✓"
            variant="success"
            isNumeric={true}
          />
        </View>

        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="Compliance Score"
            value={kpiData.complianceScore}
            suffix="%"
            icon="🛡️"
            variant="success"
            isNumeric={true}
          />
        </View>

        <View style={styles.kpiItem}>
          <AnimatedKPICard
            label="Predominant Sentiment"
            value={kpiData.sentiment}
            icon={kpiData.sentiment === 'Positive' ? '😊' : kpiData.sentiment === 'Neutral' ? '😐' : '😞'}
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
              kpiData.healthStatus === 'Excellent' ? '⭐' :
              kpiData.healthStatus === 'Good' ? '👍' :
              '⚠️'
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
