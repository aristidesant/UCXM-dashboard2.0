import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, Text } from 'react-native';
import {
  Zap,
  CheckSquare,
  Smile,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { colors, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

export type EvaluationType = 'operational' | 'qa' | 'sentiment' | 'compliance' | 'business';

interface EvaluationTypeSelectorProps {
  selectedType: EvaluationType;
  onSelectType: (type: EvaluationType) => void;
}

interface EvaluationTypeConfig {
  id: EvaluationType;
  icon: React.ComponentType<any>;
  label: string;
  color: string;
}

const getEvaluationColor = (type: EvaluationType): string => {
  switch (type) {
    case 'operational':
      return '#26D366'; // Bright Green
    case 'qa':
      return '#4A9EFF'; // Bright Cyan/Blue
    case 'sentiment':
      return '#FFD700'; // Bright Yellow
    case 'compliance':
      return '#FF6B6B'; // Bright Red/Pink
    case 'business':
      return '#A86FD8'; // Bright Purple
    default:
      return '#26D366';
  }
};

const EVALUATION_TYPES: EvaluationTypeConfig[] = [
  { id: 'operational', icon: Zap, label: 'Operacional', color: '#26D366' },
  { id: 'qa', icon: CheckSquare, label: 'QA', color: '#4A9EFF' },
  { id: 'sentiment', icon: Smile, label: 'Sentimiento', color: '#FFD700' },
  { id: 'compliance', icon: Shield, label: 'Cumplimiento', color: '#FF6B6B' },
  { id: 'business', icon: TrendingUp, label: 'Business Insights', color: '#A86FD8' },
];

export const EvaluationTypeSelector: React.FC<EvaluationTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getButtonStyles = (evalType: EvaluationType) => {
    const isActive = selectedType === evalType;
    const color = getEvaluationColor(evalType);

    return {
      container: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.md,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        backgroundColor: isActive
          ? isDark
            ? `${color}20`
            : `${color}15`
          : 'transparent',
        borderWidth: isActive ? 2 : 0,
        borderColor: isActive ? color : 'transparent',
      } as ViewStyle,
      iconColor: isActive ? color : themeColors.steelSecondary,
    };
  };

  const selectedLabel = EVALUATION_TYPES.find((t) => t.id === selectedType)?.label || '';

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        gap: spacing.sm,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: '500',
          color: themeColors.steelSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        Método de Evaluación
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {EVALUATION_TYPES.map((evalType) => {
          const IconComponent = evalType.icon;
          const { container: buttonStyle, iconColor } = getButtonStyles(evalType.id);

          return (
            <TouchableOpacity
              key={evalType.id}
              style={buttonStyle}
              onPress={() => onSelectType(evalType.id)}
              activeOpacity={0.7}
            >
              <IconComponent
                size={28}
                color={iconColor}
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: themeColors.steelSecondary,
          textTransform: 'capitalize',
        }}
      >
        {selectedLabel}
      </Text>
    </View>
  );
};
