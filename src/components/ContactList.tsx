// src/components/ContactList.tsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';
import { Contact } from '../data/mockContacts';
import { Card } from './Card';
import { useTheme } from '../context/ThemeContext';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onSelectContact,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    listContainer: {
      gap: spacing.sm,
    },
    contactItem: {
      padding: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: themeColors.bgSecondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      ...typography.body,
      color: themeColors.darkGray,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    contactAction: {
      ...typography.caption,
      color: themeColors.successGreen,
      fontWeight: '600',
    },
    chevron: {
      ...typography.body,
      color: themeColors.mediumGray,
    },
  });

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => onSelectContact(item)}
      activeOpacity={0.7}
    >
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactAction}>{item.action}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderContact}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};
