import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  ViewStyle,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Search } from 'lucide-react';
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useAppContext } from '../context/AppContext';
import { Card, Badge } from '../components';
import { mockDashboards } from '../data/mockDashboards';

interface DashboardsMobileScreenProps {
  onSelectDashboard: (dashboardId: string) => void;
}

export const DashboardsMobileScreen: React.FC<DashboardsMobileScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [search, setSearch] = React.useState('');

  const filteredDashboards = mockDashboards.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: 100,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    searchContainer: {
      marginBottom: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    searchInputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.light.bgSecondary,
      borderRadius: 10,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: colors.light.lightGray,
    } as ViewStyle,
    searchIcon: {
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      paddingVertical: spacing.md,
      ...typography.body,
      color: colors.light.darkGray,
      fontSize: 16,
    },
    dashboardsLabel: {
      ...typography.subheading,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
      fontSize: 16,
      fontWeight: '600',
    },
    dashboardCount: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginBottom: spacing.lg,
      fontSize: 13,
    },
    dashboardCard: {
      minHeight: 100,
      justifyContent: 'space-between',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    } as ViewStyle,
    dashboardName: {
      ...typography.subheading,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
      fontSize: 16,
      fontWeight: '600',
    },
    dashboardMeta: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginBottom: spacing.xs,
      fontSize: 12,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xl,
    },
    emptyStateText: {
      ...typography.body,
      color: colors.light.mediumGray,
    },
    lastUpdateText: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginTop: spacing.lg,
      textAlign: 'center',
      marginBottom: spacing.lg,
      fontSize: 11,
    },
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
              Iniciada {new Date(item.lastUpdated).toLocaleDateString('es-ES')}
            </Text>
          </View>
        </View>
        <Text style={styles.dashboardMeta}>Tipo: {item.type}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.header}>Dashboards</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color={colors.light.mediumGray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar dashboards..."
              placeholderTextColor={colors.light.mediumGray}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <Text style={styles.dashboardsLabel}>Tus dashboards</Text>
        {filteredDashboards.length > 0 && (
          <Text style={styles.dashboardCount}>
            {filteredDashboards.length} dashboard{filteredDashboards.length !== 1 ? 's' : ''}
          </Text>
        )}

        {filteredDashboards.length > 0 ? (
          <FlatList
            data={filteredDashboards}
            renderItem={renderDashboard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={1}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No se encontraron dashboards
            </Text>
          </View>
        )}

        <Text style={styles.lastUpdateText}>
          Actualizado {new Date().toLocaleDateString('es-ES')} {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </ScrollView>
    </View>
  );
};
