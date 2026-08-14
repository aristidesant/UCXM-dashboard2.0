// src/components/ContactList.tsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';
import { Contact } from '../data/mockContacts';
import { Card } from './Card';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onSelectContact,
}) => {
  const styles = StyleSheet.create({
    listContainer: {
      gap: spacing.sm,
    },
    contactItem: {
      padding: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: colors.light.bgSecondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      ...typography.body,
      color: colors.light.darkGray,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    contactAction: {
      ...typography.caption,
      color: colors.light.successGreen,
      fontWeight: '600',
    },
    chevron: {
      ...typography.body,
      color: colors.light.mediumGray,
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
