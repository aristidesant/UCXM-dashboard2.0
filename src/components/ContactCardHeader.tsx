import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  ScrollView,
  Animated,
  TextStyle,
} from 'react-native';
import { ChevronDown } from 'lucide-react';
import { colors, spacing, typography } from '../design';
import { useTheme } from '../context/ThemeContext';
import { ContactList } from './ContactList';
import type { Contact } from '../data/mockContacts';

interface ContactCardHeaderProps {
  contacts: Contact[];
  isExpanded: boolean;
  onToggle: () => void;
  onSelectContact: (contactId: string) => void;
  selectedContactId?: string;
}

export const ContactCardHeader: React.FC<ContactCardHeaderProps> = ({
  contacts,
  isExpanded,
  onToggle,
  onSelectContact,
  selectedContactId,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const firstContact = contacts[0];
  const contactCount = contacts.length;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      backgroundColor: themeColors.pureSurface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      overflow: 'hidden',
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      minHeight: 60,
      backgroundColor: themeColors.pureSurface,
    } as ViewStyle,
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: spacing.md,
    } as ViewStyle,
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: themeColors.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    avatarText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 18,
    },
    contactInfo: {
      flex: 1,
      gap: 4,
    } as ViewStyle,
    contactName: {
      ...typography.label,
      color: themeColors.inkPrimary,
    },
    contactMeta: {
      ...typography.caption,
      color: themeColors.mutedSlate,
    },
    expandButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    expandedContent: {
      borderTopWidth: 1,
      borderTopColor: themeColors.whisperBorder,
      backgroundColor: isDark
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(247, 248, 250, 0.5)',
      maxHeight: isExpanded ? 500 : 0,
      overflow: 'hidden',
    } as ViewStyle,
    expandedContentInner: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    expandedHeader: {
      marginBottom: spacing.md,
      paddingBottomWidth: 1,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    expandedTitle: {
      ...typography.heading,
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
    },
    expandedSubtitle: {
      ...typography.caption,
      color: themeColors.mutedSlate,
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(firstContact?.name || 'N/A')}
            </Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName} numberOfLines={1}>
              {firstContact?.name || 'No Contact Selected'}
            </Text>
            <Text style={styles.contactMeta} numberOfLines={1}>
              {contactCount} contact{contactCount !== 1 ? 's' : ''} • {firstContact?.role || 'Unknown'}
            </Text>
          </View>
        </View>
        <View style={styles.expandButton}>
          <View
            style={{
              transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
            }}
          >
            <ChevronDown
              size={20}
              color={themeColors.newtechGreen}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.expandedContentInner}>
            <View style={styles.expandedHeader}>
              <Text style={styles.expandedTitle}>Detalles de Contacto</Text>
              <Text style={styles.expandedSubtitle}>
                {contactCount} contact{contactCount !== 1 ? 's' : ''} available
              </Text>
            </View>
            <ContactList
              contacts={contacts}
              onSelectContact={(contact) => {
                onSelectContact(contact.id);
                // Optionally collapse after selection
                // onToggle();
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
