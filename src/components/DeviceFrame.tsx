import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { usePlatform } from '../hooks/usePlatform';
import { colors } from '../design';
import { useTheme } from '../context/ThemeContext';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { platform, dimensions } = usePlatform();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  if (platform === 'desktop') {
    return <>{children}</>;
  }

  const bezelSize = dimensions.bezelWidth;
  const totalWidth = dimensions.width + bezelSize * 2;
  const totalHeight = dimensions.height + bezelSize * 2;

  const styles = StyleSheet.create({
    container: {
      minHeight: '100vh',
      alignItems: 'center',
      backgroundColor: themeColors.bgSecondary,
      paddingVertical: 40,
      paddingHorizontal: 20,
      overflowY: 'auto' as any,
    } as ViewStyle,
    deviceBezel: {
      width: totalWidth,
      height: totalHeight,
      borderRadius: dimensions.borderRadius,
      backgroundColor: '#1a1a1a',
      padding: bezelSize,
      overflow: 'hidden',
      elevation: 20,
      flexShrink: 0,
    } as ViewStyle,
    screenContent: {
      flex: 1,
      borderRadius: Math.max(0, dimensions.borderRadius - bezelSize),
      backgroundColor: themeColors.bgPrimary,
      overflow: 'hidden',
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.deviceBezel}>
        <View style={styles.screenContent}>{children}</View>
      </View>
    </View>
  );
};
