import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';

interface NavItem {
  id: string;
  label?: string;
  icon: React.ReactNode;
}

interface BottomNavBarProps {
  items: NavItem[];
  activeItemId: string;
  onSelectItem: (itemId: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  items,
  activeItemId,
  onSelectItem,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: isDark ? 'rgba(20, 26, 34, 0.65)' : 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(28px)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(27, 181, 74, 0.15)' : 'rgba(27, 181, 74, 0.12)',
      borderRadius: 20,
      height: 64,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    } as ViewStyle,
    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
    } as ViewStyle,
    iconContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: 'transparent',
      transition: 'all 200ms ease-out',
    } as ViewStyle,
    activeIconContainer: {
      backgroundColor: isDark
        ? 'rgba(27, 181, 74, 0.2)'
        : 'rgba(27, 181, 74, 0.15)',
      borderWidth: 1,
      borderColor: isDark
        ? 'rgba(27, 181, 74, 0.3)'
        : 'rgba(27, 181, 74, 0.25)',
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.id === activeItemId;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onSelectItem(item.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                isActive && styles.activeIconContainer,
                { opacity: isActive ? 1 : 0.5 },
              ]}
            >
              {item.icon}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
