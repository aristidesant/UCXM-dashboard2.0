import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { usePlatform } from '../hooks/usePlatform';
import { colors } from '../design';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { platform, dimensions } = usePlatform();

  if (platform === 'desktop') {
    return <>{children}</>;
  }

  const bezelSize = dimensions.bezelWidth;
  const totalWidth = dimensions.width + bezelSize * 2;
  const totalHeight = dimensions.height + bezelSize * 2;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.light.bgSecondary,
      padding: 20,
    } as ViewStyle,
    deviceBezel: {
      width: totalWidth,
      height: totalHeight,
      borderRadius: dimensions.borderRadius,
      backgroundColor: '#1a1a1a',
      padding: bezelSize,
      overflow: 'hidden',
      elevation: 20,
    } as ViewStyle,
    screenContent: {
      flex: 1,
      borderRadius: Math.max(0, dimensions.borderRadius - bezelSize),
      backgroundColor: colors.light.bgPrimary,
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
