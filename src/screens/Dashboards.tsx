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

  const filteredDashboards = mockDashboards.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

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
          placeholderTextColor={themeColors.mediumGray}
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
