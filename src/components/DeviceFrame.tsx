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
    deviceBezel: {
      width: totalWidth,
      height: totalHeight,
      borderRadius: dimensions.borderRadius,
      backgroundColor: 'transparent',
      padding: bezelSize,
      overflow: 'hidden',
      elevation: 20,
    } as ViewStyle,
    screenContent: {
      flex: 1,
      borderRadius: Math.max(0, dimensions.borderRadius - bezelSize),
      backgroundColor: 'transparent',
      overflow: 'hidden',
    } as ViewStyle,
  });

  const backgroundGradient = isDark
    ? `radial-gradient(circle at 95% 5%, rgba(38, 211, 102, 0.15) 0%, rgba(11, 15, 20, 0) 25%),
       radial-gradient(ellipse 900px 700px at 50% 120%, rgba(38, 211, 102, 0.1) 0%, rgba(11, 15, 20, 0) 45%),
       radial-gradient(ellipse 800px 900px at -20% 105%, rgba(38, 211, 102, 0.1) 0%, rgba(11, 15, 20, 0) 55%)`
    : `radial-gradient(circle at 95% 5%, rgba(27, 181, 74, 0.1) 0%, rgba(247, 248, 250, 0) 25%),
       radial-gradient(ellipse 900px 700px at 50% 120%, rgba(27, 181, 74, 0.08) 0%, rgba(247, 248, 250, 0) 45%),
       radial-gradient(ellipse 800px 900px at -20% 105%, rgba(27, 181, 74, 0.08) 0%, rgba(247, 248, 250, 0) 55%)`;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.canvasFrost,
        backgroundImage: backgroundGradient,
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
