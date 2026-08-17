import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'clamp(100%, 1200px, 95vw)',
  padding = true,
}) => {
  const { platform } = usePlatform();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const isDesktop = platform === 'desktop';

  const containerStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    maxWidth: isDesktop ? '90%' : '100%',
    alignSelf: 'center',
    paddingHorizontal: padding ? (isDesktop ? spacing.xl : spacing.lg) : 0,
    backgroundColor: themeColors.canvasFrost,
  };

  return <View style={containerStyle}>{children}</View>;
};

export default ResponsiveContainer;
