import React from 'react';
import { GlobalAnalyticsProvider } from '../contexts/GlobalAnalyticsContext';
import { GlobalAnalyticsPage } from './GlobalAnalyticsPage';

export const AnalyticsPage: React.FC = () => {
  return (
    <GlobalAnalyticsProvider>
      <GlobalAnalyticsPage />
    </GlobalAnalyticsProvider>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      flexDirection: 'column',
    } as ViewStyle,
    contentWrapper: {
      flex: 1,
      paddingHorizontal: responsivePadding,
      paddingTop: 0,
    } as ViewStyle,
    header: {
      marginBottom: spacing.lg,
      marginTop: spacing.lg,
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
    headerCaption: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: themeColors.newtechGreen,
      marginTop: spacing.md,
    } as ViewStyle,
    filterButtonText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
  });

  const renderOperationContent = () => {
    const operationMetrics = aggregatedMetrics.operation;

    if (operationSubTab === 'llamadas') {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: responsiveGap }}>
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: responsiveGap }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                    borderRadius: borderRadius.lg,
                    padding: responsivePadding,
                    borderWidth: 1,
                    borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
                  }}
                >
                  <Text style={{ fontSize: fontSize.sm, color: themeColors.steelSecondary, marginBottom: spacing.sm }}>
                    Total de Llamadas Salientes
                  </Text>
                  <Text style={{ fontSize: fontSize.xl, fontWeight: '700', color: themeColors.inkPrimary }}>
                    {(operationMetrics.calls.totalOutgoing / 1000).toFixed(1)}k
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                    borderRadius: borderRadius.lg,
                    padding: responsivePadding,
                    borderWidth: 1,
                    borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
                  }}
                >
                  <Text style={{ fontSize: fontSize.sm, color: themeColors.steelSecondary, marginBottom: spacing.sm }}>
                    Total Contestadas
                  </Text>
                  <Text style={{ fontSize: fontSize.xl, fontWeight: '700', color: themeColors.inkPrimary }}>
                    {(operationMetrics.calls.totalAnswered / 1000).toFixed(1)}k
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
              }}
            >
              <Text style={{ fontSize: fontSize.sm, fontWeight: '600', color: themeColors.steelSecondary, marginBottom: spacing.md }}>
                Llamadas por Idioma
              </Text>
              {operationMetrics.calls.byLanguage.map((lang, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: spacing.sm,
                    borderBottomWidth: idx < operationMetrics.calls.byLanguage.length - 1 ? 1 : 0,
                    borderBottomColor: themeColors.whisperBorder,
                  }}
                >
                  <Text style={{ ...typography.body, color: themeColors.steelSecondary }}>
                    {lang.language}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: spacing.lg }}>
                    <Text style={{ ...typography.body, color: themeColors.inkPrimary }}>
                      {lang.quantity}
                    </Text>
                    <Text style={{ ...typography.body, color: themeColors.steelSecondary }}>
                      {lang.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      );
    }

    if (operationSubTab === 'gestion') {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: responsiveGap }}>
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: responsiveGap, flexWrap: 'wrap' }}>
              {[
                { label: 'Tasa de Escalación', value: `${operationMetrics.management.escalationRate.value}%`, trend: operationMetrics.management.escalationRate.trend },
                { label: 'Tasa de Conversión', value: `${operationMetrics.management.conversionRate.value}%`, trend: operationMetrics.management.conversionRate.trend },
                { label: 'Tasa de Contacto', value: `${operationMetrics.management.contactRate.value}%`, trend: operationMetrics.management.contactRate.trend },
              ].map((metric, idx) => (
                <View key={idx} style={{ flex: 1, minWidth: isMobile ? '100%' : 150 }}>
                  <View
                    style={{
                      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                      borderRadius: borderRadius.lg,
                      padding: responsivePadding,
                      borderWidth: 1,
                      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
                    }}
                  >
                    <Text style={{ fontSize: fontSize.xs, color: themeColors.steelSecondary, marginBottom: spacing.sm }}>
                      {metric.label}
                    </Text>
                    <Text style={{ fontSize: isMobile ? fontSize.lg : fontSize.xl, fontWeight: '700', color: themeColors.inkPrimary, marginBottom: spacing.xs }}>
                      {metric.value}
                    </Text>
                    <Text style={{ fontSize: fontSize.xs, color: metric.trend > 0 ? themeColors.newtechGreen : '#FF6B6B' }}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}% vs ayer
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View
              style={{
                backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                borderRadius: borderRadius.lg,
                padding: responsivePadding,
                borderWidth: 1,
                borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
              }}
            >
              <Text style={{ fontSize: fontSize.sm, fontWeight: '600', color: themeColors.steelSecondary, marginBottom: spacing.md }}>
                Llamadas por Disposición
              </Text>
              {operationMetrics.management.callsByDisposition.map((disp, idx) => (
                <View key={idx} style={{ gap: spacing.sm, marginBottom: spacing.md }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: fontSize.sm, color: themeColors.steelSecondary }}>
                      {disp.disposition}
                    </Text>
                    <Text style={{ fontSize: fontSize.sm, fontWeight: '600', color: themeColors.inkPrimary }}>
                      {disp.count} ({disp.percentage}%)
                    </Text>
                  </View>
                  <View style={{ height: 8, backgroundColor: themeColors.whisperBorder, borderRadius: 4, overflow: 'hidden' }}>
                    <View
                      style={{
                        height: '100%',
                        width: `${disp.percentage}%`,
                        backgroundColor: themeColors.newtechGreen,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      );
    }

    if (operationSubTab === 'calidad') {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: spacing.md }}>
            <View
              style={{
                backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
              }}
            >
              <Text style={{ fontSize: fontSize.sm, color: themeColors.steelSecondary, marginBottom: spacing.sm }}>
                Satisfacción General
              </Text>
              <Text style={{ fontSize: fontSize.xl, fontWeight: '700', color: themeColors.inkPrimary, marginBottom: spacing.xs }}>
                {operationMetrics.quality.satisfaction.rating}/{operationMetrics.quality.satisfaction.maxRating}
              </Text>
              <Text style={{ fontSize: fontSize.xs, color: operationMetrics.quality.satisfaction.trend > 0 ? themeColors.newtechGreen : '#FF6B6B' }}>
                {operationMetrics.quality.satisfaction.trend > 0 ? '+' : ''}{operationMetrics.quality.satisfaction.trend}% vs ayer
              </Text>
            </View>

            <View
              style={{
                backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
              }}
            >
              <Text style={{ fontSize: fontSize.sm, fontWeight: '600', color: themeColors.steelSecondary, marginBottom: spacing.md }}>
                Cierre en Primera Llamada
              </Text>
              <Text style={{ fontSize: fontSize.xl, fontWeight: '700', color: themeColors.inkPrimary, marginBottom: spacing.xs }}>
                {operationMetrics.management.firstCallResolution.value}%
              </Text>
              <Text style={{ fontSize: fontSize.xs, color: operationMetrics.management.firstCallResolution.trend > 0 ? themeColors.newtechGreen : '#FF6B6B' }}>
                {operationMetrics.management.firstCallResolution.trend > 0 ? '+' : ''}{operationMetrics.management.firstCallResolution.trend}% vs ayer
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }

    return <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} />;
  };

  const renderIndicadores = () => {
    if (infoType === 'operation') {
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
      return <QAMetricsPanel metrics={aggregatedMetrics.qa} />;
    }

    if (infoType === 'emotion') {
      return <EmotionAnalyticsPage />;
    }

    if (infoType === 'compliance') {
      return <ComplianceMetricsPanel metrics={aggregatedMetrics.compliance} />;
    }

    if (infoType === 'insights') {
      return <BusinessInsightsPanel metrics={aggregatedMetrics.insights} />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Análisis General</Text>
          <Text style={styles.headerSubtitle}>
            Métricas agregadas de todas las campañas
          </Text>
          <Text style={styles.headerCaption}>
            Datos en tiempo real
          </Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
            activeOpacity={0.7}
          >
            <Sliders size={16} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.filterButtonText}>Filtros</Text>
          </TouchableOpacity>
        </View>

        <SegmentedControl
          activeAnalysis={infoType}
          onSelectAnalysis={setInfoType}
        />

        {renderIndicadores()}

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={(appliedFilters) => {
            setFilters((prev) => ({
              ...prev,
              ...appliedFilters,
            }));
          }}
        />
      </View>
    </View>
  );
};

export default AnalyticsPage;
