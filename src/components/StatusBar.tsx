import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Signal, Wifi, Battery, Clock } from 'lucide-react';
import { colors, spacing } from '../design';
import { useTheme } from '../context/ThemeContext';

export const StatusBar: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [time, setTime] = useState<string>('9:41');
  const [battery] = useState<number>(100);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: isDark
        ? 'rgba(11, 15, 20, 0.6)'
        : 'rgba(247, 248, 250, 0.6)',
      borderBottomWidth: 1,
      borderBottomColor: isDark
        ? 'rgba(27, 181, 74, 0.08)'
        : 'rgba(27, 181, 74, 0.06)',
    } as ViewStyle,
    timeSection: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    } as ViewStyle,
    time: {
      fontSize: 13,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      lineHeight: 18,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    statusSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    iconContainer: {
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    batteryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    } as ViewStyle,
    batteryText: {
      fontSize: 11,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      lineHeight: 14,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.timeSection}>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.statusSection}>
        <View style={styles.iconContainer}>
          <Signal size={14} color={themeColors.steelSecondary} />
        </View>

        <View style={styles.iconContainer}>
          <Wifi size={14} color={themeColors.steelSecondary} />
        </View>

        <View style={styles.batteryContainer}>
          <View style={styles.iconContainer}>
            <Battery size={14} color={themeColors.steelSecondary} />
          </View>
          <Text style={styles.batteryText}>{battery}%</Text>
        </View>
      </View>
    </View>
  );
};
