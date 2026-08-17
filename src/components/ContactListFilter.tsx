import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';

interface ContactListFilterProps {
  availableLists: string[];
  selectedLists: string[];
  onListSelect: (listName: string) => void;
}

export const ContactListFilter: React.FC<ContactListFilterProps> = ({
  availableLists,
  selectedLists,
  onListSelect,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    } as ViewStyle,
    title: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      marginBottom: spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    } as ViewStyle,
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: borderRadius.sm,
      borderWidth: 2,
      borderColor: themeColors.primaryBlue,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    checkboxChecked: {
      backgroundColor: themeColors.primaryBlue,
    } as ViewStyle,
    checkmark: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    } as TextStyle,
    label: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.inkPrimary,
      flex: 1,
      lineHeight: 18,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar por Lista</Text>
      {availableLists.map((listName) => (
        <TouchableOpacity
          key={listName}
          style={styles.checkboxContainer}
          onPress={() => onListSelect(listName)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              selectedLists.includes(listName) && styles.checkboxChecked,
            ]}
          >
            {selectedLists.includes(listName) && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          <Text style={styles.label}>{listName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
