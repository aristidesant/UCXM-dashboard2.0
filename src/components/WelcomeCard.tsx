import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import { Card } from './Card';

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
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderRadius: borderRadius.lg,
      backgroundColor: isDark ? 'rgba(27, 181, 74, 0.08)' : 'rgba(27, 181, 74, 0.05)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(27, 181, 74, 0.2)' : 'rgba(27, 181, 74, 0.15)',
    } as ViewStyle,
    header: {
      marginBottom: spacing.md,
    } as ViewStyle,
    greeting: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 32,
    } as TextStyle,
    userName: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      color: themeColors.newtechGreen,
      lineHeight: 32,
    } as TextStyle,
    tagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: isDark ? 'rgba(27, 181, 74, 0.15)' : 'rgba(27, 181, 74, 0.1)',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      alignSelf: 'flex-start',
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
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, </Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.tagContainer}>
        <View style={styles.dot} />
        <Text style={styles.tagText}>Real time</Text>
      </View>
    </Card>
  );
};
