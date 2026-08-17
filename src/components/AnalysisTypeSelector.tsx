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
      padding: spacing.lg,
    } as ViewStyle,
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      justifyContent: 'space-between',
    } as ViewStyle,
    card: {
      width: '48%',
      backgroundColor: isDark ? themeColors.canvasDark : themeColors.canvasLight,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: isDark ? themeColors.whisperBorder : themeColors.lightGray,
      padding: spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
    } as ViewStyle,
    cardContent: {
      alignItems: 'center',
      width: '100%',
    } as ViewStyle,
    cardLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
      textAlign: 'center',
      lineHeight: 22,
    } as TextStyle,
    cardDescription: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      textAlign: 'center',
      lineHeight: 16,
    } as TextStyle,
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? `rgba(255, 255, 255, 0.05)` : `rgba(0, 0, 0, 0.02)`,
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {analysisTypes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => onSelectAnalysis(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AnalysisTypeSelector;
