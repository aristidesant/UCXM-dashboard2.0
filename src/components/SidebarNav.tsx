import React from 'react';
import { View, TouchableOpacity, ViewStyle, Text, TextStyle } from 'react-native';
import { Home, Briefcase, TrendingUp, Settings } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';

export type ScreenType = 'home' | 'dashboards' | 'analytics' | 'qa' | 'settings' | 'contact';

interface NavItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  screen: ScreenType;
}

interface SidebarNavProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: Home, label: 'Home', screen: 'home' },
  { id: 'dashboards', icon: Briefcase, label: 'Dashboards', screen: 'dashboards' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics', screen: 'analytics' },
  { id: 'settings', icon: Settings, label: 'Settings', screen: 'settings' },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeScreen, onNavigate }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const containerStyle: ViewStyle = {
    width: 120,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(16px)',
    borderRightWidth: 1,
    borderRightColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    flexDirection: 'column',
    gap: spacing.md,
    justifyContent: 'flex-start',
  };

  return (
    <View style={containerStyle}>
      {NAV_ITEMS.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeScreen === item.screen;

        const itemStyle: ViewStyle = {
          width: '100%',
          minHeight: 80,
          borderRadius: borderRadius.md,
          backgroundColor: isActive
            ? isDark
              ? 'rgba(27, 181, 74, 0.15)'
              : 'rgba(27, 181, 74, 0.1)'
            : 'transparent',
          borderLeftWidth: isActive ? 3 : 0,
          borderLeftColor: isActive ? themeColors.newtechGreen : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: spacing.xs,
          paddingVertical: spacing.sm,
          gap: spacing.xs,
          paddingLeft: isActive ? 2 : 5,
        };

        const labelStyle: TextStyle = {
          fontSize: 10,
          fontWeight: '500',
          color: isActive ? themeColors.newtechGreen : themeColors.steelSecondary,
          textAlign: 'center',
        };

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onNavigate(item.screen)}
            activeOpacity={0.7}
            style={itemStyle}
          >
            <IconComponent
              size={24}
              color={isActive ? themeColors.newtechGreen : themeColors.steelSecondary}
              strokeWidth={1.5}
            />
            <Text style={labelStyle} numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SidebarNav;
