import React from 'react';
import { StyleSheet, View, ScrollView, Text, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card, Button } from '../components';
import { Contact } from '../data/mockContacts';
import { usePlatform } from '../hooks/usePlatform';

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.light.bgSecondary,
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
      ...typography.subheading,
      color: colors.light.darkGray,
      marginBottom: spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
    } as ViewStyle,
    infoLabel: {
      ...typography.caption,
      color: colors.light.mediumGray,
    },
    infoValue: {
      ...typography.body,
      color: colors.light.darkGray,
      fontWeight: '600',
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
            <Text style={[styles.infoValue, { color: colors.light.successGreen }]}>
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
