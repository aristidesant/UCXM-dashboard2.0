import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing } from '../design';

interface NavItem {
  id: string;
  label: string;
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
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.light.bgPrimary,
      borderTopWidth: 1,
      borderTopColor: colors.light.lightGray,
      height: 68,
      paddingBottom: spacing.sm,
      paddingTop: spacing.xs,
      justifyContent: 'space-around',
      alignItems: 'center',
    } as ViewStyle,
    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xs,
      gap: 4,
    } as ViewStyle,
    iconContainer: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    label: {
      fontSize: 10,
      fontWeight: '500',
      color: colors.light.mediumGray,
      textAlign: 'center',
    },
    activeLabel: {
      color: colors.light.primaryBlue,
      fontWeight: '600',
    },
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
            <View style={[styles.iconContainer, { opacity: isActive ? 1 : 0.6 }]}>
              {item.icon}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
