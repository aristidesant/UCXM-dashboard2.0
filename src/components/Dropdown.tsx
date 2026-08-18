import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ChevronDown } from 'lucide-react';
import { colors, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  minWidth?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  minWidth = 150,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : label;

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    } as ViewStyle,
    button: {
      height: 40,
      minWidth,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    buttonText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    } as TextStyle,
    chevron: {
      marginLeft: spacing.sm,
    } as ViewStyle,
    dropdown: {
      position: 'absolute',
      top: 45,
      left: 0,
      right: 0,
      minWidth,
      backgroundColor: themeColors.canvasFrost,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      overflow: 'hidden',
      zIndex: 9999,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
    } as ViewStyle,
    option: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    optionLast: {
      borderBottomWidth: 0,
    } as ViewStyle,
    optionText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    } as TextStyle,
    optionSelected: {
      fontWeight: '600',
      color: themeColors.newtechGreen,
    } as TextStyle,
  });

  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{displayLabel}</Text>
        <View style={styles.chevron}>
          <ChevronDown
            size={16}
            color={themeColors.steelSecondary}
            strokeWidth={2}
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSelectOption('')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                value === '' && styles.optionSelected,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                index === options.length - 1 && styles.optionLast,
              ]}
              onPress={() => handleSelectOption(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  value === option.value && styles.optionSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
