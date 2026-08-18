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
import { ChevronLeft, FileText, Share2 } from 'lucide-react';
import { colors, spacing, typography, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import type { Call } from '../data/mockCalls';
import { CallInfoCard } from '../components/CallDetailsComponents/CallInfoCard';
import { CallMetadataCard } from '../components/CallDetailsComponents/CallMetadataCard';
import { AISummaryCard } from '../components/CallDetailsComponents/AISummaryCard';
import { AudioPlayer } from '../components/CallDetailsComponents/AudioPlayer';
import { EvaluationTypeSelector, EvaluationType } from '../components/EvaluationTypeSelector';

interface CallDetailsPageProps {
  call: Call;
  onBack: () => void;
}

export const CallDetailsPage: React.FC<CallDetailsPageProps> = ({ call, onBack }) => {
  const { effectiveTheme } = useTheme();
  const { isMobile } = usePlatform();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [evaluationType, setEvaluationType] = useState<EvaluationType>('operational');

  const getEvaluationContent = () => {
    switch (evaluationType) {
      case 'operational':
        return {
          title: 'Análisis Operacional',
          content: `Duración: ${call.duration}\nAHT: 3m 56s\nEscalaciones: 0\nContacto completado exitosamente.`,
        };
      case 'qa':
        return {
          title: 'Evaluación QA',
          content: `Score: 95/100\nPuntualidad: Excelente\nTono: Profesional\nCumplimiento: 100%\nConformidad: Sí`,
        };
      case 'sentiment':
        return {
          title: 'Análisis de Sentimiento',
          content: `Sentimiento Cliente: Muy Positivo\nSentimiento Agente: Profesional\nTono General: Positivo\nConfianza: Alta\nSatisfacción: Muy Satisfecho`,
        };
      case 'compliance':
        return {
          title: 'Cumplimiento Regulatorio',
          content: `Protección de Datos: Cumple\nGrabación: Consentimiento Presente\nDivulgación: Cumple\nRequisitos: Todos Cumplidos\nRiesgo: Bajo`,
        };
      case 'business':
        return {
          title: 'Insights de Negocio',
          content: `Oportunidad de Venta: No Identificada\nRetención: Seguro\nChurn Risk: Bajo\nUpsell: Potencial Futuro\nValor Lifetime: Alto`,
        };
      default:
        return {
          title: 'Análisis',
          content: 'Selecciona un tipo de evaluación',
        };
    }
  };

  const evaluation = getEvaluationContent();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: spacing.sm,
    } as ViewStyle,
    headerTitle: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    headerSubtitle: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      marginTop: spacing.xs,
    } as TextStyle,
    content: {
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingVertical: spacing.lg,
    } as ViewStyle,
    section: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    evaluationCard: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      marginBottom: spacing.lg,
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
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={{ padding: spacing.sm, marginLeft: -spacing.sm }}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={themeColors.steelSecondary} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Detalles de la llamada</Text>
            <Text style={styles.headerSubtitle}>{call.contactList}</Text>
          </View>
        </View>
      </View>

      {/* Evaluation Type Selector */}
      <EvaluationTypeSelector activeType={evaluationType} onSelectType={setEvaluationType} />

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Contact Info */}
          <View style={styles.section}>
            <CallInfoCard call={call} />
          </View>

          {/* Metadata */}
          <View style={styles.section}>
            <CallMetadataCard call={call} />
          </View>

          {/* Evaluation Content */}
          <View style={styles.section}>
            <View style={styles.evaluationCard}>
              <Text style={styles.evaluationTitle}>{evaluation.title}</Text>
              <Text style={styles.evaluationContent}>{evaluation.content}</Text>
            </View>
          </View>

          {/* AI Summary */}
          <View style={styles.section}>
            <AISummaryCard summary={call.aiSummary} />
          </View>

          {/* Audio Player */}
          <View style={styles.section}>
            <AudioPlayer recordingUrl={call.recordingUrl} duration={call.durationSeconds} />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <FileText size={20} color={themeColors.inkPrimary} strokeWidth={2} />
          <Text style={styles.actionButtonText}>Compartir PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Share2 size={20} color={themeColors.inkPrimary} strokeWidth={2} />
          <Text style={styles.actionButtonText}>Share link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
