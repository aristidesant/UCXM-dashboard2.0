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

  // Background gradient is now handled by CSS div in App.tsx, so just provide the bezel frame
  const styles = StyleSheet.create({
    deviceBezel: {
      width: totalWidth,
      height: totalHeight,
      borderRadius: dimensions.borderRadius,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      padding: bezelSize - 1, // Adjust for border width
      overflow: 'hidden',
      elevation: 20,
    } as ViewStyle,
    screenContent: {
      flex: 1,
      borderRadius: Math.max(0, dimensions.borderRadius - bezelSize),
      backgroundColor: 'transparent',
      overflow: 'hidden',
      margin: 0,
    } as ViewStyle,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      }}
    >
      <View style={styles.deviceBezel}>
        <View style={styles.screenContent}>{children}</View>
      </View>
    </View>
  );
};
