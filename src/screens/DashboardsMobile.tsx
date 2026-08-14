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
import { colors, typography, spacing, borderRadius } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useAppContext } from '../context/AppContext';
import { Card, Badge } from '../components';
import { mockDashboards } from '../data/mockDashboards';
import { useTheme } from '../context/ThemeContext';

interface DashboardsMobileScreenProps {
  onSelectDashboard: (dashboardId: string) => void;
}

export const DashboardsMobileScreen: React.FC<DashboardsMobileScreenProps> = ({
  onSelectDashboard,
}) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const [search, setSearch] = React.useState('');

  const filteredDashboards = mockDashboards.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: 100,
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
      marginBottom: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,
    searchInputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.pureSurface,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    searchIcon: {
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      paddingVertical: spacing.md,
      color: themeColors.inkPrimary,
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 22,
    },
    dashboardsLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 22,
    },
    dashboardCount: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      marginBottom: spacing.lg,
      lineHeight: 18,
    },
    dashboardCard: {
      minHeight: 100,
      justifyContent: 'space-between',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
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
      marginBottom: spacing.xs,
      lineHeight: 18,
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
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      lineHeight: 22,
    },
    lastUpdateText: {
      fontSize: 11,
      fontWeight: '400',
      color: themeColors.mutedSlate,
      marginTop: spacing.lg,
      textAlign: 'center',
      marginBottom: spacing.lg,
      lineHeight: 16,
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
            <Search size={18} color={themeColors.mediumGray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar dashboards..."
              placeholderTextColor={themeColors.mediumGray}
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
