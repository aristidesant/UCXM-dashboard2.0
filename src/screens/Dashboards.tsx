import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useAppContext } from '../context/AppContext';
import { Card, Badge } from '../components';
import { mockDashboards } from '../data/mockDashboards';
import { useTheme } from '../context/ThemeContext';

interface DashboardsScreenProps {
  onSelectDashboard: (dashboardId: string) => void;
}

export const DashboardsScreen: React.FC<DashboardsScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [search, setSearch] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [selectedCampaignType, setSelectedCampaignType] = React.useState<string>('');
  const [selectedLineOfBusiness, setSelectedLineOfBusiness] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<{ from: string; to: string }>({ from: '', to: '' });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [expandedFilter, setExpandedFilter] = React.useState<string | null>(null);
  const itemsPerPage = 20;

  const uniqueStatuses = Array.from(new Set(mockDashboards.map(d => d.status))).sort();
  const uniqueCampaignTypes = Array.from(new Set(mockDashboards.map(d => d.campaignType))).sort();
  const uniqueLineOfBusiness = Array.from(new Set(mockDashboards.map(d => d.lineOfBusiness))).sort();

  const filteredDashboards = useMemo(() => {
    return mockDashboards.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !selectedStatus || d.status === selectedStatus;
      const matchesCampaignType = !selectedCampaignType || d.campaignType === selectedCampaignType;
      const matchesLineOfBusiness = !selectedLineOfBusiness || d.lineOfBusiness === selectedLineOfBusiness;

      let matchesDate = true;
      if (dateRange.from || dateRange.to) {
        const dashboardDate = new Date(d.lastUpdated);
        if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          matchesDate = matchesDate && dashboardDate >= fromDate;
        }
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          matchesDate = matchesDate && dashboardDate <= toDate;
        }
      }

      return matchesSearch && matchesStatus && matchesCampaignType && matchesLineOfBusiness && matchesDate;
    });
  }, [search, selectedStatus, selectedCampaignType, selectedLineOfBusiness, dateRange]);

  const paginatedDashboards = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDashboards.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDashboards, currentPage]);

  const totalPages = Math.ceil(filteredDashboards.length / itemsPerPage);

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
      lineHeight: 40,
      color: themeColors.inkPrimary,
      marginBottom: spacing.lg,
      letterSpacing: -0.02,
    },
    searchContainer: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      lineHeight: 22,
    },
    gridContainer: {
      gap: spacing.md,
    } as ViewStyle,
    dashboardCard: {
      minHeight: 120,
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    } as ViewStyle,
    dashboardName: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 22,
    },
    dashboardMeta: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.mutedSlate,
      marginBottom: spacing.sm,
      lineHeight: 18,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterBar: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
      flexWrap: 'wrap',
    } as ViewStyle,
    filterSelect: {
      flex: 1,
      minWidth: 150,
      height: 40,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    },
    tableContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: spacing.lg,
    } as ViewStyle,
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: themeColors.sunkenBase,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    tableHeaderCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableHeaderText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    tableCell: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableStatusCell: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    } as ViewStyle,
    tableCellText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    },
    tableRowTouchable: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: spacing.md,
    } as ViewStyle,
    paginationText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.mutedSlate,
    },
    paginationButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 6,
      backgroundColor: themeColors.sunkenBase,
    } as ViewStyle,
    paginationButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.inkPrimary,
    },
    paginationButtonDisabled: {
      opacity: 0.5,
    } as ViewStyle,
  });

  const renderDashboard = ({ item }: { item: typeof mockDashboards[0] }) => (
    <TouchableOpacity
      onPress={() => onSelectDashboard(item.id)}
      activeOpacity={0.7}
    >
      <Card style={styles.dashboardCard}>
        <View>
          <Text style={styles.dashboardName}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Badge status={item.status} />
            <Text style={styles.dashboardMeta}>
              Iniciada {new Date(item.lastUpdated).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={styles.dashboardMeta}>Tipo: {item.type}</Text>
      </Card>
    </TouchableOpacity>
  );

  const renderTableRow = (item: typeof mockDashboards[0]) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => onSelectDashboard(item.id)}
      activeOpacity={0.7}
      style={styles.tableRowTouchable}
    >
      <View style={[styles.tableCell, { flex: 2 }]}>
        <Text style={styles.tableCellText}>{item.name}</Text>
      </View>
      <View style={styles.tableStatusCell}>
        <Badge status={item.status} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboards</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar dashboards..."
          placeholderTextColor={themeColors.mediumGray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {!isMobile && (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterBar}>
              <TouchableOpacity
                style={[styles.filterSelect, { minWidth: 140 }]}
                onPress={() => setExpandedFilter(expandedFilter === 'status' ? null : 'status')}
              >
                <Text style={styles.tableCellText}>
                  {selectedStatus ? `Status: ${selectedStatus}` : 'Status: All'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterSelect, { minWidth: 160 }]}
                onPress={() => setExpandedFilter(expandedFilter === 'campaign' ? null : 'campaign')}
              >
                <Text style={styles.tableCellText}>
                  {selectedCampaignType ? `Campaign: ${selectedCampaignType}` : 'Campaign: All'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterSelect, { minWidth: 160 }]}
                onPress={() => setExpandedFilter(expandedFilter === 'lob' ? null : 'lob')}
              >
                <Text style={styles.tableCellText}>
                  {selectedLineOfBusiness ? `LOB: ${selectedLineOfBusiness}` : 'LOB: All'}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={[styles.filterSelect, { minWidth: 140 }]}
                placeholder="From: YYYY-MM-DD"
                placeholderTextColor={themeColors.mediumGray}
                value={dateRange.from}
                onChangeText={(text) => {
                  setDateRange({ ...dateRange, from: text });
                  setCurrentPage(1);
                }}
              />

              <TextInput
                style={[styles.filterSelect, { minWidth: 140 }]}
                placeholder="To: YYYY-MM-DD"
                placeholderTextColor={themeColors.mediumGray}
                value={dateRange.to}
                onChangeText={(text) => {
                  setDateRange({ ...dateRange, to: text });
                  setCurrentPage(1);
                }}
              />
            </View>
          </ScrollView>

          {expandedFilter === 'status' && (
            <View style={[styles.tableContainer, { marginBottom: spacing.md }]}>
              <TouchableOpacity
                style={styles.tableRow}
                onPress={() => {
                  setSelectedStatus('');
                  setExpandedFilter(null);
                  setCurrentPage(1);
                }}
              >
                <Text style={styles.tableCellText}>All</Text>
              </TouchableOpacity>
              {uniqueStatuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.tableRow}
                  onPress={() => {
                    setSelectedStatus(status);
                    setExpandedFilter(null);
                    setCurrentPage(1);
                  }}
                >
                  <Text style={[styles.tableCellText, selectedStatus === status && { fontWeight: '600' }]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {expandedFilter === 'campaign' && (
            <View style={[styles.tableContainer, { marginBottom: spacing.md }]}>
              <TouchableOpacity
                style={styles.tableRow}
                onPress={() => {
                  setSelectedCampaignType('');
                  setExpandedFilter(null);
                  setCurrentPage(1);
                }}
              >
                <Text style={styles.tableCellText}>All</Text>
              </TouchableOpacity>
              {uniqueCampaignTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.tableRow}
                  onPress={() => {
                    setSelectedCampaignType(type);
                    setExpandedFilter(null);
                    setCurrentPage(1);
                  }}
                >
                  <Text style={[styles.tableCellText, selectedCampaignType === type && { fontWeight: '600' }]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {expandedFilter === 'lob' && (
            <View style={[styles.tableContainer, { marginBottom: spacing.md }]}>
              <TouchableOpacity
                style={styles.tableRow}
                onPress={() => {
                  setSelectedLineOfBusiness('');
                  setExpandedFilter(null);
                  setCurrentPage(1);
                }}
              >
                <Text style={styles.tableCellText}>All</Text>
              </TouchableOpacity>
              {uniqueLineOfBusiness.map((lob) => (
                <TouchableOpacity
                  key={lob}
                  style={styles.tableRow}
                  onPress={() => {
                    setSelectedLineOfBusiness(lob);
                    setExpandedFilter(null);
                    setCurrentPage(1);
                  }}
                >
                  <Text style={[styles.tableCellText, selectedLineOfBusiness === lob && { fontWeight: '600' }]}>
                    {lob}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}


          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderCell, { flex: 2 }]}>
                <Text style={styles.tableHeaderText}>Dashboard Name</Text>
              </View>
              <View style={styles.tableStatusCell}>
                <Text style={styles.tableHeaderText}>Status</Text>
              </View>
            </View>

            {paginatedDashboards.map(renderTableRow)}

            {paginatedDashboards.length === 0 && (
              <View style={{ padding: spacing.lg, alignItems: 'center' }}>
                <Text style={styles.paginationText}>No dashboards found</Text>
              </View>
            )}
          </View>

          <View style={styles.paginationContainer}>
            <Text style={styles.paginationText}>
              {filteredDashboards.length === 0 ? '0' : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredDashboards.length)}`} of {filteredDashboards.length}
            </Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Text style={styles.paginationButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {isMobile && (
        <FlatList
          data={filteredDashboards}
          renderItem={renderDashboard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
        />
      )}
    </View>
  );
};
