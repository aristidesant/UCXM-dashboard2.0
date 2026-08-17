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
  CheckBox,
} from 'react-native';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { colors, spacing, typography } from '../design';
import { useTheme } from '../context/ThemeContext';
import { usePlatform } from '../hooks/usePlatform';
import { Call, getCallsForCampaign, getContactListsForCampaign } from '../data/mockCalls';

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

  const [selectedContactLists, setSelectedContactLists] = useState<string[]>([]);
  const [outcomeFilter, setOutcomeFilter] = useState<'todos' | 'efectivo' | 'no_efectivo'>('todos');
  const [contactListsExpanded, setContactListsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get available contact lists
  const contactLists = useMemo(() => getContactListsForCampaign(campaignId), [campaignId]);

  // Get all campaign calls
  const campaignCalls = useMemo(() => getCallsForCampaign(campaignId), [campaignId]);

  // Get filtered calls based on contact lists and outcome
  const allCalls = useMemo(() => {
    let filtered = campaignCalls;

    // Filter by selected contact lists (if any are selected)
    if (selectedContactLists.length > 0) {
      filtered = filtered.filter((call) => selectedContactLists.includes(call.contactList));
    }

    // Filter by outcome
    if (outcomeFilter === 'efectivo') {
      filtered = filtered.filter((call) => call.outcome === 'efectivo');
    } else if (outcomeFilter === 'no_efectivo') {
      filtered = filtered.filter((call) => call.outcome === 'no_efectivo');
    }

    return filtered;
  }, [campaignCalls, selectedContactLists, outcomeFilter]);

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
    filterSection: {
      gap: spacing.sm,
      marginBottom: spacing.md,
    } as ViewStyle,
    filterLabel: {
      ...typography.micro,
      color: themeColors.mutedSlate,
      textTransform: 'uppercase',
      fontWeight: '600',
    } as TextStyle,
    contactListsHeaderButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: themeColors.pureSurface,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      borderBottomLeftRadius: contactListsExpanded ? 0 : 8,
      borderBottomRightRadius: contactListsExpanded ? 0 : 8,
    } as ViewStyle,
    contactListsHeaderText: {
      ...typography.body,
      color: themeColors.inkPrimary,
      fontWeight: '600',
    } as TextStyle,
    contactListsSection: {
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: themeColors.pureSurface,
      gap: spacing.sm,
    } as ViewStyle,
    contactListsContainer: {
      gap: spacing.sm,
    } as ViewStyle,
    contactListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 6,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    contactListItemText: {
      ...typography.body,
      color: themeColors.inkPrimary,
      marginLeft: spacing.sm,
      flex: 1,
    } as TextStyle,
    outcomeButtonsContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
    } as ViewStyle,
    outcomeButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: themeColors.pureSurface,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    outcomeButtonActive: {
      backgroundColor: themeColors.newtechGreen,
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
    outcomeButtonText: {
      ...typography.micro,
      color: themeColors.mutedSlate,
      fontWeight: '600',
    } as TextStyle,
    outcomeButtonTextActive: {
      color: '#FFFFFF',
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

  const handleContactListToggle = (contactList: string) => {
    setSelectedContactLists((prev) =>
      prev.includes(contactList)
        ? prev.filter((item) => item !== contactList)
        : [...prev, contactList]
    );
    setCurrentPage(1);
  };

  const handleSelectAllContactLists = () => {
    if (selectedContactLists.length === contactLists.length) {
      // If all are selected, deselect all
      setSelectedContactLists([]);
    } else {
      // Select all
      setSelectedContactLists(contactLists);
    }
    setCurrentPage(1);
  };

  const handleOutcomeFilter = (outcome: 'todos' | 'efectivo' | 'no_efectivo') => {
    setOutcomeFilter(outcome);
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
      <ScrollView style={styles.filtersContainer}>
        {/* Contact Lists Filter - Collapsible */}
        <View style={styles.filterSection}>
          <TouchableOpacity
            style={styles.contactListsHeaderButton}
            onPress={() => setContactListsExpanded(!contactListsExpanded)}
            activeOpacity={0.7}
          >
            <Text style={styles.contactListsHeaderText}>Listas de Contacto</Text>
            <ChevronDown
              size={20}
              color={themeColors.inkPrimary}
              style={{ transform: [{ rotate: contactListsExpanded ? '180deg' : '0deg' }] }}
            />
          </TouchableOpacity>

          {contactListsExpanded && (
            <View style={styles.contactListsSection}>
              <View style={styles.contactListsContainer}>
                {/* "Todas" option */}
                <View style={styles.contactListItem}>
                  <CheckBox
                    value={selectedContactLists.length === contactLists.length && contactLists.length > 0}
                    onValueChange={handleSelectAllContactLists}
                    tintColor={themeColors.newtechGreen}
                    onCheckColor={themeColors.newtechGreen}
                  />
                  <Text style={styles.contactListItemText}>Todas</Text>
                </View>

                {/* Individual contact lists */}
                {contactLists.map((contactList) => (
                  <View key={contactList} style={styles.contactListItem}>
                    <CheckBox
                      value={selectedContactLists.includes(contactList)}
                      onValueChange={() => handleContactListToggle(contactList)}
                      tintColor={themeColors.newtechGreen}
                      onCheckColor={themeColors.newtechGreen}
                    />
                    <Text style={styles.contactListItemText}>{contactList}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Outcome Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Resultado de Llamada</Text>
          <View style={styles.outcomeButtonsContainer}>
            <TouchableOpacity
              style={[styles.outcomeButton, outcomeFilter === 'todos' && styles.outcomeButtonActive]}
              onPress={() => handleOutcomeFilter('todos')}
              activeOpacity={0.7}
            >
              <Text style={[styles.outcomeButtonText, outcomeFilter === 'todos' && styles.outcomeButtonTextActive]}>
                Todos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.outcomeButton, outcomeFilter === 'efectivo' && styles.outcomeButtonActive]}
              onPress={() => handleOutcomeFilter('efectivo')}
              activeOpacity={0.7}
            >
              <Text style={[styles.outcomeButtonText, outcomeFilter === 'efectivo' && styles.outcomeButtonTextActive]}>
                Efectivo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.outcomeButton, outcomeFilter === 'no_efectivo' && styles.outcomeButtonActive]}
              onPress={() => handleOutcomeFilter('no_efectivo')}
              activeOpacity={0.7}
            >
              <Text style={[styles.outcomeButtonText, outcomeFilter === 'no_efectivo' && styles.outcomeButtonTextActive]}>
                No Efectivo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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
