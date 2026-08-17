import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, opacity, iconSize } from '../design';
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

  const NAVBAR_BORDER_RADIUS = 20;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: isDark ? `rgba(20, 26, 34, ${opacity.lg})` : `rgba(255, 255, 255, ${opacity['2xl']})`,
      backdropFilter: 'blur(28px)',
      borderWidth: 1,
      borderColor: isDark ? `rgba(27, 181, 74, ${opacity.xs})` : `rgba(27, 181, 74, ${opacity.xs})`,
      borderRadius: NAVBAR_BORDER_RADIUS,
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
      borderRadius: borderRadius.md,
      backgroundColor: 'transparent',
      transition: 'all 200ms ease-out',
    } as ViewStyle,
    activeIconContainer: {
      backgroundColor: isDark
        ? `rgba(27, 181, 74, ${opacity.sm})`
        : `rgba(27, 181, 74, ${opacity.xs})`,
      borderWidth: 1,
      borderColor: isDark
        ? `rgba(27, 181, 74, ${opacity.md})`
        : `rgba(27, 181, 74, ${opacity.sm})`,
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
                { opacity: isActive ? 1 : opacity.half },
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
