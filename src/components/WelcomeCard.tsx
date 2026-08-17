import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';

interface WelcomeCardProps {
  userName?: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName = 'User' }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.lg,
      paddingVertical: spacing.md,
    } as ViewStyle,
    greeting: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      flex: 1,
    } as ViewStyle,
    greetingText: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      lineHeight: 32,
    } as TextStyle,
    userName: {
      fontSize: fontSize.xl,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      lineHeight: 32,
    } as TextStyle,
    tagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    } as ViewStyle,
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: themeColors.newtechGreen,
      opacity: isBlinking ? 1 : 0.3,
    } as ViewStyle,
    tagText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.newtechGreen,
      lineHeight: 18,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Bienvenido, </Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.tagContainer}>
        <View style={styles.dot} />
        <Text style={styles.tagText}>Tiempo real</Text>
      </View>
    </View>
  );
};
