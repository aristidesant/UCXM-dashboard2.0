import React, { useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface SentimentData {
  emotion: string;
  confidence: number;
  color: string;
}

interface EmotionSentimentDetailsCardProps {
  agentSentiment: SentimentData;
  customerSentiment: SentimentData;
}

export const EmotionSentimentDetailsCard: React.FC<EmotionSentimentDetailsCardProps> = ({
  agentSentiment,
  customerSentiment,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [agentView, setAgentView] = useState(true);
  const [emotionView, setEmotionView] = useState(true);
  const [recoveryView, setRecoveryView] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    } as ViewStyle,
    sectionTitle: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
      marginTop: spacing.md,
    } as TextStyle,
    toggleContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
    } as ViewStyle,
    toggleButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: themeColors.whisperBorder,
    } as ViewStyle,
    toggleButtonActive: {
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    toggleButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
    } as TextStyle,
    toggleButtonTextActive: {
      color: '#FFFFFF',
    } as TextStyle,
    cardContainer: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    sentimentCard: {
      alignItems: 'center',
      paddingVertical: spacing.md,
    } as ViewStyle,
    sentimentLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      marginBottom: spacing.sm,
      fontWeight: '500',
    } as TextStyle,
    sentimentEmotion: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
    } as TextStyle,
    sentimentConfidence: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
    } as TextStyle,
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.sm / 2,
    } as ViewStyle,
    gridItem: {
      width: '50%',
      paddingHorizontal: spacing.sm / 2,
      marginBottom: spacing.md,
    } as ViewStyle,
    barContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    } as ViewStyle,
    barLabel: {
      width: '30%',
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
    } as TextStyle,
    barTrack: {
      flex: 1,
      height: 8,
      backgroundColor: themeColors.whisperBorder,
      borderRadius: borderRadius.sm,
      marginHorizontal: spacing.sm,
      overflow: 'hidden',
    } as ViewStyle,
    barFill: {
      height: '100%',
      backgroundColor: colors.light.newtechGreen,
    } as ViewStyle,
    barPercentage: {
      width: '15%',
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      textAlign: 'right',
    } as TextStyle,
    inflectionItem: {
      borderLeftWidth: 3,
      borderLeftColor: colors.light.newtechGreen,
      paddingLeft: spacing.md,
      marginBottom: spacing.md,
      paddingVertical: spacing.sm,
    } as ViewStyle,
    inflectionTime: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      marginBottom: spacing.xs,
    } as TextStyle,
    inflectionQuote: {
      fontSize: fontSize.sm,
      fontStyle: 'italic',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
    } as TextStyle,
    inflectionDescription: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      textTransform: 'uppercase',
      fontWeight: '500',
    } as TextStyle,
    recoveryMetricRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    recoveryLabel: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    recoveryValue: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    positiveValue: {
      color: colors.light.newtechGreen,
    } as TextStyle,
    negativeValue: {
      color: '#FF6B6B',
    } as TextStyle,
    toneSection: {
      marginTop: spacing.md,
    } as ViewStyle,
    toneSectionTitle: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
    } as TextStyle,
    speechPatternGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.sm / 2,
    } as ViewStyle,
    speechPatternCard: {
      width: '50%',
      paddingHorizontal: spacing.sm / 2,
      marginBottom: spacing.md,
    } as ViewStyle,
    speechPatternMetric: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    speechPatternValue: {
      fontSize: fontSize.lg,
      fontWeight: '700',
      color: themeColors.inkPrimary,
    } as TextStyle,
    speechPatternLabel: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      marginTop: spacing.xs,
      fontWeight: '500',
    } as TextStyle,
  });

  // Mock data for different views
  const agentData = {
    sentiment: { positive: 45, neutral: 15, negative: 40 },
    emotions: { satisfaction: 42, frustration: 28, anger: 12, neutral: 18 },
    tone: { polite: 85, professional: 90, empathetic: 78 },
    recovery: { start: 0.2, peak: -0.8, end: 0.75, time: '42s', improvement: 55 },
  };

  const clientData = {
    sentiment: { positive: 30, neutral: 20, negative: 50 },
    emotions: { satisfaction: 25, frustration: 38, anger: 22, neutral: 15 },
    tone: { polite: 70, professional: 65, empathetic: 60 },
    recovery: { start: 0.15, peak: -0.95, end: 0.65, time: '58s', improvement: 80 },
  };

  const currentData = agentView ? agentData : clientData;

  return (
    <View style={styles.container}>
      {/* Sentiment Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <View style={styles.sentimentCard}>
              <Text style={styles.sentimentLabel}>Sentimiento Agente</Text>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: agentSentiment.color, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md }}>
                <Text style={{ ...styles.sentimentEmotion, color: '#FFFFFF', fontSize: fontSize.base }}>😐</Text>
              </View>
              <Text style={styles.sentimentEmotion}>{agentSentiment.emotion}</Text>
              <Text style={styles.sentimentConfidence}>Confianza: {agentSentiment.confidence}%</Text>
            </View>
          </View>

          <View style={styles.gridItem}>
            <View style={styles.sentimentCard}>
              <Text style={styles.sentimentLabel}>Sentimiento Cliente</Text>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: customerSentiment.color, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md }}>
                <Text style={{ ...styles.sentimentEmotion, color: '#FFFFFF', fontSize: fontSize.base }}>😞</Text>
              </View>
              <Text style={styles.sentimentEmotion}>{customerSentiment.emotion}</Text>
              <Text style={styles.sentimentConfidence}>Confianza: {customerSentiment.confidence}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Polaridad de Sentimiento */}
      <Text style={styles.sectionTitle}>Polaridad de Sentimiento</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, agentView && styles.toggleButtonActive]}
          onPress={() => setAgentView(true)}
        >
          <Text style={[styles.toggleButtonText, agentView && styles.toggleButtonTextActive]}>Agente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !agentView && styles.toggleButtonActive]}
          onPress={() => setAgentView(false)}
        >
          <Text style={[styles.toggleButtonText, !agentView && styles.toggleButtonTextActive]}>Cliente</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Positivo</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.sentiment.positive}%` }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.sentiment.positive}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Neutral</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.sentiment.neutral}%`, backgroundColor: '#9CA3AF' }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.sentiment.neutral}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Negativo</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.sentiment.negative}%`, backgroundColor: '#FF6B6B' }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.sentiment.negative}%</Text>
        </View>
      </View>

      {/* Tono y Comunicación */}
      <Text style={styles.sectionTitle}>Tono & Comunicación</Text>
      <View style={styles.cardContainer}>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Cortés</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.tone.polite}%` }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.tone.polite}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Profesional</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.tone.professional}%` }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.tone.professional}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Empático</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.tone.empathetic}%` }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.tone.empathetic}%</Text>
        </View>
      </View>

      {/* Distribución de Emociones */}
      <Text style={styles.sectionTitle}>Distribución de Emociones</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, emotionView && styles.toggleButtonActive]}
          onPress={() => setEmotionView(true)}
        >
          <Text style={[styles.toggleButtonText, emotionView && styles.toggleButtonTextActive]}>Agente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !emotionView && styles.toggleButtonActive]}
          onPress={() => setEmotionView(false)}
        >
          <Text style={[styles.toggleButtonText, !emotionView && styles.toggleButtonTextActive]}>Cliente</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Satisfacción</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.emotions.satisfaction}%` }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.emotions.satisfaction}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Frustración</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.emotions.frustration}%`, backgroundColor: '#FF9500' }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.emotions.frustration}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Ira</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.emotions.anger}%`, backgroundColor: '#FF6B6B' }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.emotions.anger}%</Text>
        </View>
        <View style={styles.barContainer}>
          <Text style={styles.barLabel}>Neutral</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${currentData.emotions.neutral}%`, backgroundColor: '#9CA3AF' }]} />
          </View>
          <Text style={styles.barPercentage}>{currentData.emotions.neutral}%</Text>
        </View>
      </View>

      {/* Recuperación Emocional */}
      <Text style={styles.sectionTitle}>Recuperación Emocional {!agentView && '(Cliente)'}</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, recoveryView && styles.toggleButtonActive]}
          onPress={() => setRecoveryView(true)}
        >
          <Text style={[styles.toggleButtonText, recoveryView && styles.toggleButtonTextActive]}>Agente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !recoveryView && styles.toggleButtonActive]}
          onPress={() => setRecoveryView(false)}
        >
          <Text style={[styles.toggleButtonText, !recoveryView && styles.toggleButtonTextActive]}>Cliente</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.recoveryMetricRow}>
          <Text style={styles.recoveryLabel}>Inicio</Text>
          <Text style={[styles.recoveryValue, styles.positiveValue]}>+{currentData.recovery.start}</Text>
        </View>
        <View style={styles.recoveryMetricRow}>
          <Text style={styles.recoveryLabel}>Pico Negativo</Text>
          <Text style={[styles.recoveryValue, styles.negativeValue]}>{currentData.recovery.peak}</Text>
        </View>
        <View style={styles.recoveryMetricRow}>
          <Text style={styles.recoveryLabel}>Final</Text>
          <Text style={[styles.recoveryValue, styles.positiveValue]}>+{currentData.recovery.end}</Text>
        </View>
        <View style={styles.recoveryMetricRow}>
          <Text style={styles.recoveryLabel}>Tiempo de Recuperación</Text>
          <Text style={styles.recoveryValue}>{currentData.recovery.time}</Text>
        </View>
        <View style={styles.recoveryMetricRow}>
          <Text style={styles.recoveryLabel}>Mejora de Sentimiento</Text>
          <Text style={[styles.recoveryValue, styles.positiveValue]}>+{currentData.recovery.improvement}%</Text>
        </View>
      </View>

      {/* Patrones de Habla */}
      <Text style={styles.sectionTitle}>Patrones de Habla</Text>
      <View style={styles.speechPatternGrid}>
        <View style={styles.speechPatternCard}>
          <View style={styles.speechPatternMetric}>
            <Text style={styles.speechPatternValue}>12</Text>
            <Text style={styles.speechPatternLabel}>Palabras Promedio Agente</Text>
          </View>
        </View>
        <View style={styles.speechPatternCard}>
          <View style={styles.speechPatternMetric}>
            <Text style={styles.speechPatternValue}>65</Text>
            <Text style={styles.speechPatternLabel}>Caracteres</Text>
          </View>
        </View>
        <View style={styles.speechPatternCard}>
          <View style={styles.speechPatternMetric}>
            <Text style={styles.speechPatternValue}>8</Text>
            <Text style={styles.speechPatternLabel}>Palabras Cliente</Text>
          </View>
        </View>
        <View style={styles.speechPatternCard}>
          <View style={styles.speechPatternMetric}>
            <Text style={styles.speechPatternValue}>42</Text>
            <Text style={styles.speechPatternLabel}>Caracteres</Text>
          </View>
        </View>
        <View style={styles.speechPatternCard}>
          <View style={styles.speechPatternMetric}>
            <Text style={styles.speechPatternValue}>3</Text>
            <Text style={styles.speechPatternLabel}>Silencios/Pausas</Text>
          </View>
        </View>
        <View style={styles.speechPatternCard}>
          <View style={styles.speechPatternMetric}>
            <Text style={styles.speechPatternValue}>2x</Text>
            <Text style={styles.speechPatternLabel}>Latencia Respuesta</Text>
          </View>
        </View>
      </View>

      {/* Puntos de Inflexión de Sentimiento */}
      <Text style={styles.sectionTitle}>Puntos de Inflexión de Sentimiento</Text>
      <View style={styles.cardContainer}>
        <View style={[styles.inflectionItem, { borderLeftColor: '#FF6B6B' }]}>
          <Text style={styles.inflectionTime}>0:07</Text>
          <Text style={styles.inflectionQuote}>"It arrived damaged."</Text>
          <Text style={styles.inflectionDescription}>Cliente - Problema Introducido</Text>
          <Text style={{ fontSize: fontSize.xs, color: '#FF6B6B', marginTop: spacing.xs }}>📉 -80%</Text>
        </View>

        <View style={[styles.inflectionItem, { borderLeftColor: colors.light.newtechGreen }]}>
          <Text style={styles.inflectionTime}>0:42</Text>
          <Text style={styles.inflectionQuote}>"I completely understand your frustration. I'm going to get this resolved for you today."</Text>
          <Text style={styles.inflectionDescription}>Agente - Empatía y Compromiso Triggers Recovery</Text>
          <Text style={{ fontSize: fontSize.xs, color: colors.light.newtechGreen, marginTop: spacing.xs }}>📈 +80%</Text>
        </View>

        <View style={[styles.inflectionItem, { borderLeftColor: colors.light.newtechGreen }]}>
          <Text style={styles.inflectionTime}>1:10</Text>
          <Text style={styles.inflectionQuote}>"Thank you, I appreciate that."</Text>
          <Text style={styles.inflectionDescription}>Cliente - Resolución Lograda</Text>
          <Text style={{ fontSize: fontSize.xs, color: colors.light.newtechGreen, marginTop: spacing.xs }}>📈 +75%</Text>
        </View>

        <View style={[styles.inflectionItem, { borderLeftColor: '#FF6B6B' }]}>
          <Text style={styles.inflectionTime}>0:28</Text>
          <Text style={styles.inflectionQuote}>"I've been trying to reach you for two days."</Text>
          <Text style={styles.inflectionDescription}>Cliente - Frustración Escalada por Tiempo de Espera</Text>
          <Text style={{ fontSize: fontSize.xs, color: '#FF6B6B', marginTop: spacing.xs }}>📉 -30%</Text>
        </View>
      </View>
    </View>
  );
};
