import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface TranscriptMessage {
  speaker: 'agent' | 'customer';
  text: string;
  timestamp: string;
}

interface TranscriptPanelProps {
  transcript?: TranscriptMessage[];
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({ transcript = [] }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const mockTranscript: TranscriptMessage[] = [
    {
      speaker: 'customer',
      text: 'Hola, tengo un problema con mi pedido. El paquete llegó dañado.',
      timestamp: '0:07',
    },
    {
      speaker: 'agent',
      text: "Lamento escuchar eso. Estaré encantado de ayudarte a resolver esto. ¿Puedes contarme más sobre el daño?",
      timestamp: '0:15',
    },
    {
      speaker: 'customer',
      text: "La caja está completamente aplastada y el artículo adentro está roto. He estado intentando comunicarme contigo durante dos días.",
      timestamp: '0:28',
    },
    {
      speaker: 'agent',
      text: "Entiendo completamente tu frustración. Voy a resolver esto para ti hoy. Déjame revisar los detalles de tu pedido.",
      timestamp: '0:42',
    },
    {
      speaker: 'customer',
      text: "Gracias, realmente lo aprecio. ¿Cuáles son mis opciones?",
      timestamp: '1:10',
    },
    {
      speaker: 'agent',
      text: 'Puedo enviarte un reemplazo inmediatamente con envío acelerado sin costo, o procesar un reembolso completo. ¿Cuál prefieres?',
      timestamp: '1:25',
    },
  ];

  const displayTranscript = transcript.length > 0 ? transcript : mockTranscript;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      overflow: 'hidden',
    } as ViewStyle,
    header: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
    } as ViewStyle,
    headerTitle: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    transcriptContainer: {
      flex: 1,
    } as ViewStyle,
    messageGroup: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    messageHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    } as ViewStyle,
    speaker: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      textTransform: 'uppercase',
    } as TextStyle,
    agentLabel: {
      color: colors.light.newtechGreen,
    } as TextStyle,
    customerLabel: {
      color: '#3B82F6',
    } as TextStyle,
    timestamp: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
    } as TextStyle,
    messageText: {
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      lineHeight: 20,
      fontWeight: '400',
    } as TextStyle,
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    emptyStateText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transcript</Text>
      </View>

      <ScrollView style={styles.transcriptContainer} showsVerticalScrollIndicator={false}>
        {displayTranscript.length > 0 ? (
          displayTranscript.map((message, index) => (
            <View key={index} style={styles.messageGroup}>
              <View style={styles.messageHeader}>
                <Text style={[styles.speaker, message.speaker === 'agent' ? styles.agentLabel : styles.customerLabel]}>
                  {message.speaker === 'agent' ? 'Agente' : 'Cliente'}
                </Text>
                <Text style={styles.timestamp}>{message.timestamp}</Text>
              </View>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Sin transcript disponible</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
