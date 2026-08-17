import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  FlatList,
} from 'react-native';
import { ChevronLeft } from 'lucide-react';
import { colors, spacing, typography } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { Call, getCallsForCampaign, getAgentsForCampaign, getContactsForCampaign } from '../data/mockCalls';
import { FilterButton } from '../components';

interface CallsListScreenProps {
  campaignId: string;
  campaignName: string;
  onBack: () => void;
  onSelectCall?: (call: Call) => void;
}

export const CallsListScreen: React.FC<CallsListScreenProps> = ({
  campaignId,
  campaignName,
  onBack,
  onSelectCall,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get available agents and contacts
  const agents = useMemo(() => getAgentsForCampaign(campaignId), [campaignId]);
  const contacts = useMemo(() => getContactsForCampaign(campaignId), [campaignId]);

  // Get filtered calls
  const allCalls = useMemo(() => {
    let calls = getCallsForCampaign(campaignId, selectedAgent || undefined, selectedContact || undefined);
    return calls;
  }, [campaignId, selectedAgent, selectedContact]);

  // Pagination
  const totalPages = Math.ceil(allCalls.length / itemsPerPage);
  const paginatedCalls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allCalls.slice(startIndex, startIndex + itemsPerPage);
  }, [allCalls, currentPage]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      backgroundColor: themeColors.pureSurface,
    } as ViewStyle,
    headerTitle: {
      flex: 1,
      marginLeft: spacing.md,
    } as ViewStyle,
    backButton: {
      padding: spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    title: {
      ...typography.heading,
      color: themeColors.inkPrimary,
    } as TextStyle,
    subtitle: {
      ...typography.caption,
      color: themeColors.mutedSlate,
      marginTop: 4,
    } as TextStyle,
    filtersContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      gap: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      backgroundColor: themeColors.pureSurface,
    } as ViewStyle,
    filterRow: {
      flexDirection: 'row',
      gap: spacing.md,
    } as ViewStyle,
    filterSection: {
      flex: 1,
    } as ViewStyle,
    filterLabel: {
      ...typography.micro,
      color: themeColors.mutedSlate,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
    } as TextStyle,
    filterDropdown: {
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: themeColors.pureSurface,
      minHeight: 40,
      justifyContent: 'center',
    } as ViewStyle,
    filterDropdownText: {
      ...typography.body,
      color: selectedAgent || selectedContact ? themeColors.inkPrimary : themeColors.mutedSlate,
    } as TextStyle,
    contentContainer: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    } as ViewStyle,
    callsList: {
      flex: 1,
    } as ViewStyle,
    callRow: {
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      backgroundColor: themeColors.pureSurface,
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    callRowContent: {
      flex: 1,
      gap: 4,
    } as ViewStyle,
    callRowMain: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    contactName: {
      ...typography.label,
      color: themeColors.inkPrimary,
    } as TextStyle,
    statusBadge: {
      paddingVertical: 4,
      paddingHorizontal: spacing.sm,
      borderRadius: 6,
      overflow: 'hidden',
    } as ViewStyle,
    statusText: {
      ...typography.micro,
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '600',
    } as TextStyle,
    callMeta: {
      flexDirection: 'row',
      gap: spacing.md,
      marginTop: spacing.sm,
    } as ViewStyle,
    metaItem: {
      gap: 2,
    } as ViewStyle,
    metaLabel: {
      ...typography.caption,
      color: themeColors.mutedSlate,
      fontSize: 11,
    } as TextStyle,
    metaValue: {
      ...typography.caption,
      color: themeColors.inkPrimary,
      fontWeight: '600',
    } as TextStyle,
    disposition: {
      ...typography.caption,
      color: themeColors.newtechGreen,
      fontWeight: '500',
      marginTop: spacing.sm,
    } as TextStyle,
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: themeColors.whisperBorder,
      backgroundColor: themeColors.pureSurface,
    } as ViewStyle,
    paginationText: {
      ...typography.caption,
      color: themeColors.mutedSlate,
    } as TextStyle,
    paginationButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: themeColors.pureSurface,
      minWidth: 60,
      alignItems: 'center',
    } as ViewStyle,
    paginationButtonText: {
      ...typography.caption,
      color: themeColors.inkPrimary,
      fontWeight: '600',
    } as TextStyle,
    paginationButtonDisabled: {
      opacity: 0.5,
    } as ViewStyle,
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    } as ViewStyle,
    emptyStateText: {
      ...typography.body,
      color: themeColors.mutedSlate,
      textAlign: 'center',
    } as TextStyle,
  });

  const handleAgentSelect = (agent: string) => {
    setSelectedAgent(selectedAgent === agent ? null : agent);
    setCurrentPage(1);
  };

  const handleContactSelect = (contact: string) => {
    setSelectedContact(selectedContact === contact ? null : contact);
    setCurrentPage(1);
  };

  const handleCallPress = (call: Call) => {
    if (onSelectCall) {
      onSelectCall(call);
    }
  };

  const renderCallRow = ({ item }: { item: Call }) => (
    <TouchableOpacity
      style={styles.callRow}
      onPress={() => handleCallPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.callRowContent}>
        <View style={styles.callRowMain}>
          <Text style={styles.contactName}>{item.contactName}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: item.statusColor },
            ]}
          >
            <Text style={styles.statusText}>{item.statusLabel}</Text>
          </View>
        </View>

        <Text style={[typography.caption, { color: themeColors.mutedSlate }]}>
          {item.phoneNumber}
        </Text>

        <View style={styles.callMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Fecha</Text>
            <Text style={styles.metaValue}>{item.dateTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Duración</Text>
            <Text style={styles.metaValue}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>OLA</Text>
            <Text style={styles.metaValue}>{item.ola}</Text>
          </View>
        </View>

        <Text style={styles.disposition}>{item.disposition}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft size={24} color={themeColors.newtechGreen} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Llamadas</Text>
          <Text style={styles.subtitle}>{campaignName}</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Agente</Text>
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => {
                // In a real app, this would open a picker or dropdown
                // For now, we'll cycle through agents
                const currentIndex = agents.indexOf(selectedAgent || '');
                const nextIndex = (currentIndex + 1) % (agents.length + 1);
                setSelectedAgent(nextIndex === agents.length ? null : agents[nextIndex]);
                setCurrentPage(1);
              }}
            >
              <Text style={styles.filterDropdownText}>
                {selectedAgent || 'Todos'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Contacto</Text>
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => {
                // In a real app, this would open a picker or dropdown
                const currentIndex = contacts.indexOf(selectedContact || '');
                const nextIndex = (currentIndex + 1) % (contacts.length + 1);
                setSelectedContact(nextIndex === contacts.length ? null : contacts[nextIndex]);
                setCurrentPage(1);
              }}
            >
              <Text style={styles.filterDropdownText}>
                {selectedContact || 'Todos'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Calls List */}
      <View style={styles.contentContainer}>
        {paginatedCalls.length > 0 ? (
          <FlatList
            data={paginatedCalls}
            renderItem={renderCallRow}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.callsList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No hay llamadas que coincidan con los filtros seleccionados
            </Text>
          </View>
        )}
      </View>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>
          Mostrando {paginatedCalls.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} de{' '}
          {allCalls.length}
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.paginationButtonDisabled,
            ]}
            onPress={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            activeOpacity={0.7}
          >
            <Text style={styles.paginationButtonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.paginationButtonDisabled,
            ]}
            onPress={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            activeOpacity={0.7}
          >
            <Text style={styles.paginationButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
