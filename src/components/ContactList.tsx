// src/components/ContactList.tsx

import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { ChevronDown } from 'lucide-react';
import { colors, typography, spacing, borderRadius, fontSize } from '../design';
import { Contact } from '../data/mockContacts';
import { Card } from './Card';
import { useTheme } from '../context/ThemeContext';
import { ContactListFilter } from './ContactListFilter';

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

  // Get unique lists from contacts
  const availableLists = useMemo(() => {
    const lists = new Set(contacts.map((c) => c.listName));
    return Array.from(lists).sort();
  }, [contacts]);

  // State for selected lists
  const [selectedLists, setSelectedLists] = useState<string[]>(availableLists);

  // State for filter expansion
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Handle list selection toggle
  const handleListSelect = (listName: string) => {
    setSelectedLists((prev) =>
      prev.includes(listName)
        ? prev.filter((l) => l !== listName)
        : [...prev, listName]
    );
  };

  // Filter contacts based on selected lists
  const filteredContacts = useMemo(() => {
    if (selectedLists.length === 0) return [];
    return contacts.filter((c) => selectedLists.includes(c.listName));
  }, [contacts, selectedLists]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      paddingBottom: spacing.lg,
    } as ViewStyle,
    filterHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderRadius: borderRadius.md,
      marginBottom: spacing.lg,
      marginHorizontal: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    } as ViewStyle,
    filterTitle: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: 18,
    } as TextStyle,
    chevronIcon: {
      fontSize: 18,
      color: themeColors.steelSecondary,
      fontWeight: '600',
    } as TextStyle,
    filterContent: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    } as ViewStyle,
    listContainer: {
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
    } as ViewStyle,
    contactItem: {
      padding: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: themeColors.bgSecondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    contactInfo: {
      flex: 1,
    } as ViewStyle,
    contactName: {
      ...typography.body,
      color: themeColors.darkGray,
      fontWeight: '600',
      marginBottom: spacing.xs,
    } as TextStyle,
    contactAction: {
      ...typography.caption,
      color: themeColors.successGreen,
      fontWeight: '600',
    } as TextStyle,
    chevron: {
      ...typography.body,
      color: themeColors.mediumGray,
    } as TextStyle,
    emptyState: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      textAlign: 'center',
    } as ViewStyle,
    emptyStateText: {
      fontSize: fontSize.sm,
      fontWeight: '500',
      color: themeColors.steelSecondary,
      textAlign: 'center',
      lineHeight: 18,
    } as TextStyle,
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Collapsible Filter Header */}
      <TouchableOpacity
        style={styles.filterHeader}
        onPress={() => setIsFilterExpanded(!isFilterExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.filterTitle}>Filtrar por Lista</Text>
        <ChevronDown
          size={20}
          color={themeColors.steelSecondary}
          strokeWidth={2}
          style={{
            transform: [{ rotate: isFilterExpanded ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>

      {/* Filter Content - Collapsed by Default */}
      {isFilterExpanded && (
        <View style={styles.filterContent}>
          <ContactListFilter
            availableLists={availableLists}
            selectedLists={selectedLists}
            onListSelect={handleListSelect}
          />
        </View>
      )}

      {filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No hay contactos en las listas seleccionadas
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
