import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, FlatList } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
}

interface EmotionCampaignsViewProps {
  campaigns: Campaign[];
}

export const EmotionCampaignsView: React.FC<EmotionCampaignsViewProps> = ({
  campaigns,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    listContent: {
      paddingBottom: spacing.lg,
    } as ViewStyle,
    campaignRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      marginBottom: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    campaignName: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      flex: 1,
    } as TextStyle,
    statusBadge: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
    } as ViewStyle,
    statusText: {
      fontSize: fontSize.xs,
      fontWeight: '600',
      color: colors.light.canvasFrost,
    } as TextStyle,
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    emptyText: {
      fontSize: fontSize.sm,
      color: themeColors.steelSecondary,
    } as TextStyle,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.light.newtechGreen;
      case 'paused':
        return '#FFC53D';
      case 'completed':
        return '#8C8C8C';
      default:
        return themeColors.steelSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'paused':
        return 'Pausada';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  const renderCampaign = ({ item }: { item: Campaign }) => (
    <View style={styles.campaignRow}>
      <Text style={styles.campaignName}>{item.name}</Text>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
      </View>
    </View>
  );

  if (campaigns.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay campañas disponibles</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={campaigns}
        renderItem={renderCampaign}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
  );
};
