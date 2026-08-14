import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useInfoType } from '../hooks/useInfoType';
import { useMockData } from '../hooks/useMockData';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  Card,
  MetricCard,
  Chart,
  ContactList,
  FilterButton,
  AnalysisSidebar,
} from '../components';
import { mockDashboards } from '../data/mockDashboards';
import { mockContacts } from '../data/mockContacts';
import { QAMetrics, EmotionMetrics, ComplianceMetrics, OperationMetrics } from '../data/mockMetrics';

interface CampaignDashboardScreenProps {
  onSelectContact: (contactId: string) => void;
  onBack: () => void;
}

export const CampaignDashboardScreen: React.FC<CampaignDashboardScreenProps> = ({
  onSelectContact,
  onBack,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { infoType, setInfoType } = useInfoType();
  const { currentDashboard } = useAppContext();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [activeTab, setActiveTab] = useState<'indicadores' | 'contactos'>(
    'indicadores'
  );

  const metrics = useMockData(currentDashboard || '', infoType);
  const dashboard = mockDashboards.find((d) => d.id === currentDashboard);

  if (!metrics || !dashboard) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Dashboard not found</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      flexDirection: isMobile ? 'column' : 'row',
    } as ViewStyle,
    contentWrapper: {
      flex: 1,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 40,
      letterSpacing: -0.02,
    },
    filterContainer: {
      marginBottom: spacing.md,
    },
    tabContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    tab: {
      paddingVertical: spacing.sm,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      marginBottom: -1,
    } as ViewStyle,
    activeTab: {
      borderBottomColor: themeColors.newtechGreen,
    } as ViewStyle,
    tabText: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      lineHeight: 22,
    },
    activeTabText: {
      color: themeColors.newtechGreen,
      fontWeight: '600',
    },
    metricsGrid: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
      flexWrap: 'wrap',
    } as ViewStyle,
    metricColumn: {
      flex: isMobile ? 1 : 0.48,
    } as ViewStyle,
    fullWidth: {
      width: '100%',
    } as ViewStyle,
  });

  const renderIndicadores = () => {
    if (infoType === 'operation' && 'healthStatus' in metrics) {
      const operationMetrics = metrics as OperationMetrics;
      const getHealthBadgeColor = () => {
        switch (operationMetrics.healthStatus) {
          case 'Healthy':
            return themeColors.success;
          case 'At Risk':
            return themeColors.warning;
          case 'Critical':
            return themeColors.danger;
        }
      };

      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="System Health"
                value={operationMetrics.healthStatus}
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="System Uptime"
                value={`${operationMetrics.systemUptime.toFixed(2)}%`}
              />
            </View>
          </View>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="Performance Score"
                value={`${operationMetrics.performanceScore}%`}
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Resource Usage"
                value={`${operationMetrics.resourceUsage}%`}
              />
            </View>
          </View>
          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={operationMetrics.trend} height={200} />
          </View>
          <Card>
            {operationMetrics.alerts.map((alert, idx) => (
              <Text key={idx} style={[typography.body, { marginBottom: spacing.sm }]}>
                • {alert}
              </Text>
            ))}
          </Card>
        </ScrollView>
      );
    }

    if (infoType === 'qa' && 'contactPercentage' in metrics) {
      const qaMetrics = metrics as QAMetrics;
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="Porcentaje de Contacto"
                value={`${qaMetrics.contactPercentage.toFixed(1)}%`}
                trend={-30}
                trendLabel="vs 100.00%"
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Porcentaje de Buzón de Voz"
                value={`${qaMetrics.voiceMailboxPercentage.toFixed(1)}%`}
              />
            </View>
          </View>
          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={qaMetrics.trend} height={200} />
          </View>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <Card style={{ padding: spacing.md }}>
                <Text style={typography.caption}>Numerador</Text>
                <Text style={typography.heading}>{qaMetrics.results.effective}</Text>
              </Card>
            </View>
            <View style={styles.metricColumn}>
              <Card style={{ padding: spacing.md }}>
                <Text style={typography.caption}>Denominador</Text>
                <Text style={typography.heading}>{qaMetrics.results.ineffective}</Text>
              </Card>
            </View>
          </View>
        </ScrollView>
      );
    }

    if (infoType === 'emotion' && 'sentiment' in metrics) {
      const emotionMetrics = metrics as EmotionMetrics;
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <MetricCard
            label="Sentiment Score"
            value={emotionMetrics.score.toFixed(1)}
            trend={-5}
          />
          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={emotionMetrics.trend} height={200} />
          </View>
          <Card>
            {Object.entries(emotionMetrics.breakdown).map(([key, value]) => (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: themeColors.whisperBorder,
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: '400', color: themeColors.steelSecondary, lineHeight: 22 }}>{key}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: themeColors.inkPrimary, lineHeight: 22 }}>
                  {value}%
                </Text>
              </View>
            ))}
          </Card>
        </ScrollView>
      );
    }

    if (infoType === 'compliance' && 'violations' in metrics) {
      const complianceMetrics = metrics as ComplianceMetrics;
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard label="Violations" value={complianceMetrics.violations} />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard label="Coverage" value={`${complianceMetrics.coverage}%`} />
            </View>
          </View>
          <View style={[styles.fullWidth, { marginBottom: spacing.lg }]}>
            <Chart data={complianceMetrics.trend} height={200} />
          </View>
          <Card>
            {complianceMetrics.alerts.map((alert, idx) => (
              <Text key={idx} style={[typography.body, { marginBottom: spacing.sm }]}>
                • {alert}
              </Text>
            ))}
          </Card>
        </ScrollView>
      );
    }

    return null;
  };

  const renderContactos = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ContactList
        contacts={mockContacts}
        onSelectContact={(contact) => onSelectContact(contact.id)}
      />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {!isMobile && (
        <AnalysisSidebar
          activeAnalysis={infoType}
          onSelectAnalysis={setInfoType}
        />
      )}

      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{dashboard.name}</Text>
        </View>

        {isMobile && (
          <AnalysisSidebar
            activeAnalysis={infoType}
            onSelectAnalysis={setInfoType}
          />
        )}

        <View style={styles.tabContainer}>
          {['indicadores', 'contactos'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as 'indicadores' | 'contactos')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab === 'indicadores' ? 'Indicadores' : 'Detalles de contacto'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'indicadores' ? renderIndicadores() : renderContactos()}
      </View>
    </View>
  );
};
