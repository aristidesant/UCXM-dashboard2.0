import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Eye, ChevronLeft, Phone } from 'lucide-react';
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
  ContactCardHeader,
  CallDetailModal,
  AnalysisTypeSelector,
  QAMetricsPanel,
  EmotionMetricsPanel,
  ComplianceMetricsPanel,
  BusinessInsightsPanel,
} from '../components';
import { CallsListScreen } from './CallsListScreen';
import { mockDashboards } from '../data/mockDashboards';
import { mockContacts } from '../data/mockContacts';
import { QAMetrics, EmotionMetrics, ComplianceMetrics, OperationMetrics } from '../data/mockMetrics';
import type { Call } from '../data/mockCalls';
import { mockCalls } from '../data/mockCalls';

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
  const [contactExpanded, setContactExpanded] = useState(false);
  const [operationSubTab, setOperationSubTab] = useState<'llamadas' | 'gestion' | 'calidad'>(
    'llamadas'
  );
  const [showCallsList, setShowCallsList] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [showAnalysisSelector, setShowAnalysisSelector] = useState(true);

  const metrics = useMockData(currentDashboard || '', infoType);
  const dashboard = mockDashboards.find((d) => d.id === currentDashboard);

  // Get total calls for this campaign
  const campaignCalls = mockCalls[currentDashboard as keyof typeof mockCalls] || [];
  const totalCalls = campaignCalls.length;

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
      gap: spacing.md,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: spacing.md,
    } as ViewStyle,
    backButton: {
      padding: spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 40,
      letterSpacing: -0.02,
    },
    viewCallsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: 'transparent',
    } as ViewStyle,
    viewCallsButtonText: {
      ...typography.label,
      color: themeColors.newtechGreen,
      fontSize: 14,
      fontWeight: '600',
    } as TextStyle,
    filterContainer: {
      marginBottom: spacing.md,
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
          <View style={{ marginBottom: spacing.xs }}>
            <OperationTabs
              activeTab={operationSubTab}
              onSelectTab={setOperationSubTab}
            />
          </View>
          {renderOperationContent()}
        </View>
      );
    }

    if (infoType === 'qa') {
      const qaMetrics = metrics as QAMetrics;
      return <QAMetricsPanel metrics={qaMetrics} />;
    }

    if (infoType === 'emotion') {
      const emotionMetrics = metrics as EmotionMetrics;
      return <EmotionMetricsPanel metrics={emotionMetrics} />;
    }

    if (infoType === 'compliance') {
      const complianceMetrics = metrics as ComplianceMetrics;
      return <ComplianceMetricsPanel metrics={complianceMetrics} />;
    }

    if (infoType === 'insights') {
      const insightsMetrics = metrics as any; // Type from BusinessInsightsMetrics
      return <BusinessInsightsPanel metrics={insightsMetrics} />;
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

  // Show CallsListScreen if requested
  if (showCallsList) {
    return (
      <CallsListScreen
        campaignId={currentDashboard || ''}
        campaignName={dashboard.name}
        onBack={() => setShowCallsList(false)}
        onSelectCall={(call) => {
          setSelectedCall(call);
        }}
      />
    );
  }

  // Show analysis type selector first, then detailed view
  if (showAnalysisSelector) {
    return (
      <View style={styles.container}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg }}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={onBack}
                activeOpacity={0.7}
              >
                <ChevronLeft size={24} color={themeColors.newtechGreen} />
              </TouchableOpacity>
              <Text style={styles.title}>{dashboard.name}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <AnalysisTypeSelector
            onSelectAnalysis={(analysisType) => {
              setInfoType(analysisType);
              setShowAnalysisSelector(false);
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedCall && (
        <CallDetailModal
          call={selectedCall}
          isVisible={!!selectedCall}
          onClose={() => setSelectedCall(null)}
        />
      )}

      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowAnalysisSelector(true)}
              activeOpacity={0.7}
            >
              <ChevronLeft size={24} color={themeColors.newtechGreen} />
            </TouchableOpacity>
            <Text style={styles.title}>{dashboard.name}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <TouchableOpacity
            style={styles.viewCallsButton}
            onPress={() => setShowCallsList(true)}
            activeOpacity={0.7}
          >
            <Phone size={16} color={themeColors.newtechGreen} />
            <Text style={styles.viewCallsButtonText}>
              Detalles de Contacto ({totalCalls})
            </Text>
          </TouchableOpacity>
        </View>

        <SegmentedControl
          activeAnalysis={infoType}
          onSelectAnalysis={setInfoType}
        />

        {renderIndicadores()}
      </View>
    </View>
  );
};
