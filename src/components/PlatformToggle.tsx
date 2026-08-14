// src/components/PlatformToggle.tsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { usePlatform } from '../hooks/usePlatform';
import { colors, typography } from '../design';

export const PlatformToggle: React.FC = () => {
  const { platform, togglePlatform } = usePlatform();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1000,
    },
    button: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.light.bgSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.light.lightGray,
    },
    icon: {
      ...typography.caption,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={togglePlatform}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{platform === 'mobile' ? '📱' : '💻'}</Text>
      </TouchableOpacity>
    </View>
  );
};
