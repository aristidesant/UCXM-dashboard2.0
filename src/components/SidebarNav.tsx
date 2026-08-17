import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Home, FileText, BarChart3, CheckSquare, Settings, User } from 'lucide-react';
import { colors, spacing, borderRadius } from '../design';
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
  { id: 'campaigns', icon: FileText, label: 'Campaigns', screen: 'dashboards' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', screen: 'analytics' },
  { id: 'qa', icon: CheckSquare, label: 'QA', screen: 'qa' },
  { id: 'settings', icon: Settings, label: 'Settings', screen: 'settings' },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeScreen, onNavigate }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const containerStyle: ViewStyle = {
    width: 80,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(16px)',
    borderRightWidth: 1,
    borderRightColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    flexDirection: 'column',
    gap: spacing.md,
    justifyContent: 'flex-start',
  };

  return (
    <View style={containerStyle}>
      {NAV_ITEMS.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeScreen === item.screen;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onNavigate(item.screen)}
            activeOpacity={0.7}
            style={{
              width: '100%',
              height: 60,
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
              paddingLeft: isActive ? 2 : 5,
            }}
          >
            <IconComponent
              size={32}
              color={isActive ? themeColors.newtechGreen : themeColors.steelSecondary}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SidebarNav;
