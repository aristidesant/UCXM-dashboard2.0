import React from 'react';
import { StyleSheet, View, ScrollView, Text, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card, Button } from '../components';
import { Contact } from '../data/mockContacts';
import { usePlatform } from '../hooks/usePlatform';
import { useTheme } from '../context/ThemeContext';

interface ContactDetailsScreenProps {
  contact: Contact | null;
  onBack: () => void;
}

export const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({
  contact,
  onBack,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.lg,
      lineHeight: 40,
      letterSpacing: -0.02,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: themeColors.sunkenBase,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
      alignSelf: 'center',
    },
    avatarText: {
      fontSize: 40,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
      lineHeight: 26,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    infoLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      lineHeight: 18,
    },
    infoValue: {
      fontSize: 15,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      lineHeight: 22,
    },
    actionButtonsContainer: {
      gap: spacing.md,
      marginTop: spacing.lg,
      marginBottom: spacing.xxl,
    } as ViewStyle,
  });

  if (!contact) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.header}>Contact not found</Text>
        <Button title="Back" onPress={onBack} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{contact.name}</Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{contact.avatar}</Text>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{contact.name}</Text>
          </View>
          {contact.role && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoValue}>{contact.role}</Text>
            </View>
          )}
          {contact.status && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{contact.status}</Text>
            </View>
          )}
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>Action</Text>
            <Text style={[styles.infoValue, { color: themeColors.successGreen }]}>
              {contact.action}
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button title={contact.action} onPress={() => {}} />
        <Button title="Back" onPress={onBack} variant="secondary" />
      </View>
    </ScrollView>
  );
};
