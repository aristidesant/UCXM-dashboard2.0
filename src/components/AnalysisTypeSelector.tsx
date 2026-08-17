import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Zap,
  CheckSquare,
  Smile,
  Shield,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { colors, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

export type AnalysisType = 'operation' | 'qa' | 'emotion' | 'compliance' | 'insights';

interface AnalysisTypeItem {
  id: AnalysisType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface AnalysisSelectorProps {
  onSelectAnalysis: (analysisType: AnalysisType) => void;
}

export const AnalysisTypeSelector: React.FC<AnalysisSelectorProps> = ({
  onSelectAnalysis,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const analysisTypes: AnalysisTypeItem[] = [
    {
      id: 'operation',
      label: 'Operacional',
      description: 'Llamadas, gestión y resultados',
      icon: <Zap size={28} color={themeColors.newtechGreen} />,
      color: themeColors.newtechGreen,
    },
    {
      id: 'qa',
      label: 'QA',
      description: 'Control de calidad y errores',
      icon: <CheckSquare size={28} color={themeColors.newtechBlue} />,
      color: themeColors.newtechBlue,
    },
    {
      id: 'emotion',
      label: 'Emoción y Sentimiento',
      description: 'Análisis emocional de agentes y clientes',
      icon: <Smile size={28} color="#FFB800" />,
      color: '#FFB800',
    },
    {
      id: 'compliance',
      label: 'Cumplimiento',
      description: 'Métricas de regulación y normas',
      icon: <Shield size={28} color="#FF6B6B" />,
      color: '#FF6B6B',
    },
    {
      id: 'insights',
      label: 'Business Insights',
      description: 'Análisis de negocio y tendencias',
      icon: <TrendingUp size={28} color="#7C3AED" />,
      color: '#7C3AED',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      gap: spacing.md,
    } as ViewStyle,
    card: {
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      marginBottom: spacing.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    cardContent: {
      flex: 1,
      marginRight: spacing.lg,
    } as ViewStyle,
    cardLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.xs,
      lineHeight: 26,
    } as TextStyle,
    cardDescription: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      lineHeight: 20,
    } as TextStyle,
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
      backgroundColor: isDark ? `rgba(255, 255, 255, 0.05)` : `rgba(0, 0, 0, 0.02)`,
    } as ViewStyle,
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    } as ViewStyle,
    chevron: {
      opacity: 0.4,
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {analysisTypes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => onSelectAnalysis(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.leftContent}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.chevron}>
              <ChevronRight size={24} color={themeColors.steelSecondary} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AnalysisTypeSelector;
