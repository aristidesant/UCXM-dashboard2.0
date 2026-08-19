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

  const renderEvaluationContent = () => {
    switch (selectedEvaluationType) {
      case 'operation':
        return (
          <OperationalEvaluationCard
            duration={call.duration}
            ahtTarget="5m 00s"
            escalations={0}
            result="Exitoso"
          />
        );
      case 'qa':
        return <QAEvaluationCard ecn={90} enc={85} ecc={100} ecuf={98} />;
      case 'emotion':
        return (
          <SentimentEvaluationCard
            agentSentiment="professional"
            agentEmotion="joy"
            clientSentiment="satisfaction"
            clientEmotion="satisfaction"
            agentTone={{ professional: 45, empathetic: 30, polite: 20, casual: 5 }}
          />
        );
      case 'compliance':
        return <ComplianceEvaluationCard riskLevel="Bajo" />;
      case 'insights':
        return (
          <BusinessEvaluationCard
            salesOpportunity="No identificada"
            retention="Alta"
            churnRisk="Bajo"
            upsellPotential="Futuro"
          />
        );
      default:
        return <OperationalEvaluationCard />;
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
      paddingHorizontal: !isMobile ? spacing.lg : 0,
      paddingBottom: !isMobile ? spacing.lg : 0,
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
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    headerPhone: {
      fontSize: fontSize.xs,
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
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    metaValue: {
      fontSize: fontSize.xs,
      color: themeColors.inkPrimary,
      fontWeight: '600',
    } as TextStyle,
    contentWrapper: {
      flex: 1,
      flexDirection: 'column',
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
      width: !isMobile ? 280 : '100%',
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
        {/* Desktop: Audio Player on Left Side (Fixed Width) */}
        {!isMobile && (
          <View style={styles.audioPlayerContainer}>
            <AudioPlayer recordingUrl={call.recordingUrl} duration={call.durationSeconds} />
          </View>
        )}

        {/* Right Column: Evaluation Selector + Scrollable Content */}
        <View style={styles.contentWrapper}>
          {/* Evaluation Type Selector */}
          <SegmentedControl activeAnalysis={selectedEvaluationType} onSelectAnalysis={setSelectedEvaluationType} />

          {/* Scrollable Content */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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

      {/* Mobile: Audio Player at Bottom */}
      {isMobile && (
        <View style={styles.audioPlayerContainer}>
          <AudioPlayer recordingUrl={call.recordingUrl} duration={call.durationSeconds} />
        </View>
      )}
    </View>
  );
};
