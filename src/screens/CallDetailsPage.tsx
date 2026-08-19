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
import { ChevronLeft, FileText, Share2, Calendar, Clock, Layers } from 'lucide-react';
import { colors, spacing, typography, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import type { Call } from '../data/mockCalls';
import {
  AISummaryCard,
  AudioPlayer,
  SentimentEvaluationCard,
  EmotionSentimentDetailsCard,
  TranscriptPanel,
  OperationalEvaluationCard,
  QAEvaluationCard,
  ComplianceEvaluationCard,
  BusinessEvaluationCard,
} from '../components/CallDetailsComponents';
import { SegmentedControl } from '../components/SegmentedControl';
import { InfoType } from '../context/AppContext';

interface CallDetailsPageProps {
  call: Call;
  onBack: () => void;
}

export const CallDetailsPage: React.FC<CallDetailsPageProps> = ({ call, onBack }) => {
  const { effectiveTheme } = useTheme();
  const { isMobile } = usePlatform();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [selectedEvaluationType, setSelectedEvaluationType] = useState<InfoType>('operation');

  const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );

  const renderEvaluationContent = () => {
    switch (selectedEvaluationType) {
      case 'operation':
        return (
          <View style={styles.metricsGrid}>
            <MetricCard label="Duración" value={call.duration} />
            <MetricCard label="AHT Objetivo" value="5m 00s" />
            <MetricCard label="Escalaciones" value={0} />
            <MetricCard label="Resultado" value="Exitoso" />
          </View>
        );
      case 'qa':
        return (
          <View style={styles.metricsGrid}>
            <MetricCard label="Error crítico de negocio" value="92" />
            <MetricCard label="Error no crítico" value="87" />
            <MetricCard label="Error crítico de cumplimiento" value="100" />
            <MetricCard label="Error crítico usuario final" value="99" />
          </View>
        );
      case 'emotion':
        if (!isMobile) {
          return (
            <EmotionSentimentDetailsCard
              agentSentiment={{
                emotion: 'Neutral',
                confidence: 85,
                color: '#9CA3AF',
              }}
              customerSentiment={{
                emotion: 'Frustration',
                confidence: 90,
                color: '#FF7A7A',
              }}
            />
          );
        }
        return (
          <View style={styles.metricsGrid}>
            <MetricCard label="Sentimiento Agente" value="Professional" />
            <MetricCard label="Emoción Agente" value="Alegría" />
            <MetricCard label="Sentimiento Cliente" value="Satisfecho" />
            <MetricCard label="Emoción Cliente" value="Satisfecho" />
          </View>
        );
      case 'compliance':
        return (
          <View style={styles.metricsGrid}>
            <MetricCard label="Nivel de Riesgo" value="Bajo" />
            <MetricCard label="Cumplimiento" value="95%" />
            <MetricCard label="Violaciones" value={0} />
            <MetricCard label="Auditoría" value="Aprobada" />
          </View>
        );
      case 'insights':
        return (
          <View style={styles.metricsGrid}>
            <MetricCard label="Oportunidad de Venta" value="No identificada" />
            <MetricCard label="Retención" value="Alta" />
            <MetricCard label="Riesgo de Churn" value="Bajo" />
            <MetricCard label="Potencial Upsell" value="Futuro" />
          </View>
        );
      default:
        return (
          <View style={styles.metricsGrid}>
            <MetricCard label="Duración" value={call.duration} />
            <MetricCard label="AHT Objetivo" value="5m 00s" />
          </View>
        );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      flexDirection: 'column',
    } as ViewStyle,
    mainContent: {
      flex: 1,
      flexDirection: isMobile ? 'column' : 'row',
      marginHorizontal: !isMobile ? spacing.lg : 0,
      marginBottom: !isMobile ? spacing.lg : 0,
      gap: !isMobile ? spacing.md : 0,
    } as ViewStyle,
    header: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
      marginHorizontal: isMobile ? spacing.md : spacing.lg,
      marginTop: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginBottom: spacing.sm,
    } as ViewStyle,
    backButton: {
      padding: spacing.sm,
      marginLeft: -spacing.sm,
    } as ViewStyle,
    headerContent: {
      flex: 1,
      gap: spacing.xs,
    } as ViewStyle,
    headerName: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    headerPhone: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '400',
    } as TextStyle,
    statusBadge: {
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    statusText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: '#FFFFFF',
    } as TextStyle,
    headerActions: {
      flexDirection: 'row',
      gap: spacing.sm,
      alignItems: 'center',
    } as ViewStyle,
    iconButton: {
      padding: spacing.sm,
      marginRight: -spacing.sm,
    } as ViewStyle,
    headerMeta: {
      flexDirection: 'row',
      gap: spacing.md,
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: spacing.sm,
    } as ViewStyle,
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    } as ViewStyle,
    metaLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    metaValue: {
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      fontWeight: '600',
    } as TextStyle,
    contentWrapper: {
      flex: 1,
      flexDirection: 'column',
    } as ViewStyle,
    selectorContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: !isMobile ? borderRadius.lg : 0,
      borderWidth: !isMobile ? 1 : 0,
      borderColor: !isMobile ? themeColors.whisperBorder : 'transparent',
      paddingHorizontal: !isMobile ? spacing.md : 0,
      paddingVertical: !isMobile ? spacing.md : 0,
      marginBottom: !isMobile ? spacing.md : 0,
    } as ViewStyle,
    contentArea: {
      flex: 1,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: !isMobile ? borderRadius.lg : 0,
      borderWidth: !isMobile ? 1 : 0,
      borderColor: !isMobile ? themeColors.whisperBorder : 'transparent',
      overflow: 'hidden',
    } as ViewStyle,
    content: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    } as ViewStyle,
    section: {
      marginBottom: spacing.md,
    } as ViewStyle,
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.sm / 2,
    } as ViewStyle,
    metricCard: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      marginRight: spacing.sm,
      flex: 1,
      minWidth: '45%',
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    metricLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
      marginBottom: spacing.sm,
    } as TextStyle,
    metricValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    evaluationCard: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      marginBottom: spacing.md,
    } as ViewStyle,
    evaluationTitle: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: colors.light.newtechGreen,
      marginBottom: spacing.md,
    } as TextStyle,
    evaluationContent: {
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      lineHeight: 22,
      fontWeight: '400',
    } as TextStyle,
    actionsContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingBottom: spacing.lg,
      marginTop: spacing.md,
    } as ViewStyle,
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      gap: spacing.sm,
    } as ViewStyle,
    actionButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    audioPlayerContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderTopWidth: isMobile ? 1 : 0,
      borderLeftWidth: !isMobile ? 1 : 0,
      borderTopColor: isMobile ? themeColors.whisperBorder : 'transparent',
      borderLeftColor: !isMobile ? themeColors.whisperBorder : 'transparent',
      borderRadius: !isMobile ? borderRadius.lg : 0,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      width: !isMobile ? 380 : '100%',
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      {/* Header with Call Details */}
      <View style={styles.header}>
        {/* Top Row - Back, Contact Info, Actions */}
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <ChevronLeft size={24} color={themeColors.steelSecondary} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerName}>{call.contactName}</Text>
                <Text style={styles.headerPhone}>{call.phoneNumber}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{call.statusLabel}</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <FileText size={22} color={themeColors.steelSecondary} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Share2 size={22} color={themeColors.steelSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Row - Metadata */}
        <View style={styles.headerMeta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color={themeColors.steelSecondary} strokeWidth={2} />
            <Text style={styles.metaValue}>{call.dateTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={themeColors.steelSecondary} strokeWidth={2} />
            <Text style={styles.metaValue}>{call.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Layers size={14} color={themeColors.steelSecondary} strokeWidth={2} />
            <Text style={styles.metaValue}>{call.ola}</Text>
          </View>
          {call.disposition && (
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Resultado:</Text>
              <Text style={[styles.metaValue, { color: colors.light.newtechGreen }]}>{call.disposition}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Main Content Area (2-column on desktop, single column on mobile) */}
      <View style={styles.mainContent}>
        {/* Desktop: Audio Player + Transcript on Left Side (Fixed Width) */}
        {!isMobile && (
          <View style={{ width: 380, flexDirection: 'column', gap: spacing.md }}>
            <View style={styles.audioPlayerContainer}>
              <AudioPlayer recordingUrl={call.recordingUrl} duration={call.durationSeconds} />
            </View>
            <View style={{ flex: 1 }}>
              <TranscriptPanel />
            </View>
          </View>
        )}

        {/* Right Column: Evaluation Selector + Scrollable Content */}
        <View style={styles.contentWrapper}>
          {/* Evaluation Type Selector */}
          <View style={styles.selectorContainer}>
            <SegmentedControl
              activeAnalysis={selectedEvaluationType}
              onSelectAnalysis={setSelectedEvaluationType}
              showLabels={!isMobile}
            />
          </View>

          {/* Scrollable Content */}
          <View style={styles.contentArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                {/* Evaluation Content */}
                <View style={styles.section}>{renderEvaluationContent()}</View>

                {/* AI Summary */}
                <View style={styles.section}>
                  <AISummaryCard summary={call.aiSummary} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Mobile: Audio Player at Bottom */}
      {isMobile && (
        <View style={styles.audioPlayerContainer}>
          <AudioPlayer recordingUrl={call.recordingUrl} duration={call.durationSeconds} />
        </View>
      )}
    </View>
  );
};
