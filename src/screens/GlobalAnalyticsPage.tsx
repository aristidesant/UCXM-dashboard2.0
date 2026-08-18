import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Sliders } from 'lucide-react';
import { colors, spacing, typography, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { useGlobalAnalytics } from '../hooks/useGlobalAnalytics';
import { GlobalFiltersDrawer } from '../components/GlobalFiltersDrawer';
import { AnalysisTabSelector } from '../components/AnalysisTabSelector';
import {
  OperationalMetricsView,
  QAMetricsView,
  ComplianceMetricsView,
  InsightsMetricsView,
} from '../components';
import { EmotionAnalyticsPage } from './EmotionAnalyticsPage';

export const GlobalAnalyticsPage: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const { isMobile } = usePlatform();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const { filters, selectedAnalysis, setSelectedAnalysis, getFilterSummary, clearFilters } =
    useGlobalAnalytics();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const responsivePadding = isMobile ? spacing.md : spacing.lg;
  const responsiveGap = isMobile ? spacing.sm : spacing.md;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      flexDirection: 'column',
    } as ViewStyle,
    contentWrapper: {
      flex: 1,
      paddingHorizontal: responsivePadding,
      paddingVertical: spacing.md,
    } as ViewStyle,
    header: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    headerTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 40,
      letterSpacing: -0.02,
      marginBottom: spacing.sm,
    } as TextStyle,
    headerSubtitle: {
      ...typography.body,
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    filterSummary: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
      marginBottom: spacing.md,
    } as TextStyle,
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
      marginTop: spacing.md,
      alignSelf: 'flex-start',
    } as ViewStyle,
    filterButtonText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    contentContainer: {
      flex: 1,
    } as ViewStyle,
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    emptyText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  const renderContent = () => {
    switch (selectedAnalysis) {
      case 'operation':
        return <OperationalMetricsView />;
      case 'qa':
        return <QAMetricsView />;
      case 'emotion':
        return <EmotionAnalyticsPage />;
      case 'compliance':
        return <ComplianceMetricsView />;
      case 'insights':
        return <InsightsMetricsView />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Análisis General</Text>
          <Text style={styles.headerSubtitle}>Métricas agregadas de todas las campañas</Text>
          <Text style={styles.filterSummary}>{getFilterSummary()}</Text>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterDrawer(true)}
            activeOpacity={0.7}
          >
            <Sliders size={16} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.filterButtonText}>Modificar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Drawer */}
      <GlobalFiltersDrawer
        visible={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
      />

      {/* Analysis Tab Selector */}
      <AnalysisTabSelector activeTab={selectedAnalysis} onSelectTab={setSelectedAnalysis} />

      {/* Content */}
      <ScrollView style={[styles.contentWrapper, styles.contentContainer]} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};
