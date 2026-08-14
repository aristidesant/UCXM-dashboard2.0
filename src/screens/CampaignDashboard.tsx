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
  SegmentedControl,
  OperationTabs,
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
  const [operationSubTab, setOperationSubTab] = useState<'llamadas' | 'gestion' | 'calidad'>(
    'llamadas'
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
      flexDirection: 'column',
    } as ViewStyle,
    contentWrapper: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: 0,
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

  const renderOperationContent = () => {
    const operationMetrics = metrics as OperationMetrics;

    if (operationSubTab === 'llamadas') {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={[styles.metricsGrid, { marginTop: 0 }]}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="Total Llamadas Salientes"
                value={`${(operationMetrics.calls.totalOutgoing / 1000).toFixed(1)}k`}
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Total Llamadas Contestadas"
                value={`${(operationMetrics.calls.totalAnswered / 1000).toFixed(1)}k`}
              />
            </View>
          </View>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.heading, { marginBottom: spacing.md, color: themeColors.inkPrimary }]}>Llamadas por Idioma</Text>
            <View style={{ gap: spacing.md }}>
              {operationMetrics.calls.byLanguage.map((lang, idx) => (
                <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: spacing.sm, borderBottomWidth: idx < operationMetrics.calls.byLanguage.length - 1 ? 1 : 0, borderBottomColor: themeColors.whisperBorder }}>
                  <Text style={[typography.body, { color: themeColors.steelSecondary }]}>{lang.language}</Text>
                  <View style={{ flexDirection: 'row', gap: spacing.lg }}>
                    <Text style={[typography.body, { color: themeColors.inkPrimary }]}>{lang.quantity}</Text>
                    <Text style={[typography.body, { color: themeColors.steelSecondary }]}>{lang.percentage}%</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </ScrollView>
      );
    }

    if (operationSubTab === 'gestion') {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={[styles.metricsGrid, { marginTop: 0 }]}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="Tasa de Escalación"
                value={`${operationMetrics.management.escalationRate.value}%`}
                trend={operationMetrics.management.escalationRate.trend}
                trendLabel={`${Math.abs(operationMetrics.management.escalationRate.trend)}% vs ayer`}
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Tasa de Conversión"
                value={`${operationMetrics.management.conversionRate.value}%`}
                trend={operationMetrics.management.conversionRate.trend}
                trendLabel={`${Math.abs(operationMetrics.management.conversionRate.trend)}% vs ayer`}
              />
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={[styles.metricColumn, !isMobile && { marginRight: spacing.md }]}>
              <MetricCard
                label="Tasa de Contacto"
                value={`${operationMetrics.management.contactRate.value}%`}
                trend={operationMetrics.management.contactRate.trend}
                trendLabel={`${Math.abs(operationMetrics.management.contactRate.trend)}% vs ayer`}
              />
            </View>
            <View style={styles.metricColumn}>
              <MetricCard
                label="Tiempo Promedio de Manejo"
                value={`${operationMetrics.management.averageHandleTime.minutes}:${String(operationMetrics.management.averageHandleTime.seconds).padStart(2, '0')}`}
                trend={operationMetrics.management.averageHandleTime.trend}
                trendLabel={`${Math.abs(operationMetrics.management.averageHandleTime.trend)}% vs ayer`}
              />
            </View>
          </View>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.heading, { marginBottom: spacing.md, color: themeColors.inkPrimary }]}>Llamadas por Disposición</Text>
            <View style={{ gap: spacing.md }}>
              {operationMetrics.management.callsByDisposition.map((disp, idx) => (
                <View key={idx} style={{ gap: spacing.sm }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[typography.body, { color: themeColors.steelSecondary }]}>{disp.disposition}</Text>
                    <Text style={[typography.body, { color: themeColors.inkPrimary }]}>{disp.count} ({disp.percentage}%)</Text>
                  </View>
                  <View style={{ height: 8, backgroundColor: themeColors.whisperBorder, borderRadius: 4, overflow: 'hidden' }}>
                    <View style={{ height: '100%', width: `${disp.percentage}%`, backgroundColor: themeColors.newtechGreen }} />
                  </View>
                </View>
              ))}
            </View>
          </Card>

          <MetricCard
            label="Cierre en Primera Llamada"
            value={`${operationMetrics.management.firstCallResolution.value}%`}
            trend={operationMetrics.management.firstCallResolution.trend}
            trendLabel={`${Math.abs(operationMetrics.management.firstCallResolution.trend)}% vs ayer`}
          />
        </ScrollView>
      );
    }

    if (operationSubTab === 'calidad') {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 0 }}>
            <MetricCard
            label="Satisfacción"
            value={`${operationMetrics.quality.satisfaction.rating}/${operationMetrics.quality.satisfaction.maxRating}`}
            trend={operationMetrics.quality.satisfaction.trend}
            trendLabel={`${Math.abs(operationMetrics.quality.satisfaction.trend)}% vs ayer`}
          />
          </View>
        </ScrollView>
      );
    }
  };

  const renderIndicadores = () => {
    if (infoType === 'operation' && 'calls' in metrics) {
      return (
        <View style={{ flex: 1 }}>
          <OperationTabs
            activeTab={operationSubTab}
            onSelectTab={setOperationSubTab}
          />
          {renderOperationContent()}
        </View>
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
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{dashboard.name}</Text>
        </View>

        <SegmentedControl
          activeAnalysis={infoType}
          onSelectAnalysis={setInfoType}
        />

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
