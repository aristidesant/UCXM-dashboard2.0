import React from 'react';
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
import { colors, typography, spacing } from '../design';
import { usePlatform } from '../hooks/usePlatform';
import { useAppContext } from '../context/AppContext';
import { Card, Badge } from '../components';
import { mockDashboards } from '../data/mockDashboards';

interface DashboardsScreenProps {
  onSelectDashboard: (dashboardId: string) => void;
}

export const DashboardsScreen: React.FC<DashboardsScreenProps> = ({
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
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    searchContainer: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.light.lightGray,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      ...typography.body,
      color: colors.light.darkGray,
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
      ...typography.subheading,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
    },
    dashboardMeta: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginBottom: spacing.sm,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
              Iniciada {new Date(item.lastUpdated).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={styles.dashboardMeta}>Tipo: {item.type}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboards</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar dashboards..."
          placeholderTextColor={colors.light.mediumGray}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        key={isMobile ? 'mobile' : 'web'}
        data={filteredDashboards}
        renderItem={renderDashboard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
        numColumns={isMobile ? 1 : 2}
        columnWrapperStyle={!isMobile ? { gap: spacing.md } : undefined}
      />
    </View>
  );
};
