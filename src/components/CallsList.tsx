import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../design';
import { Call } from '../data/mockCalls';
import { useTheme } from '../context/ThemeContext';

interface CallsListProps {
  calls: Call[];
  onSelectCall: (call: Call) => void;
}

export const CallsList: React.FC<CallsListProps> = ({ calls, onSelectCall }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Get unique lists from calls
  const availableLists = useMemo(() => {
    const lists = new Set(calls.map((c) => c.contactList));
    return Array.from(lists).sort();
  }, [calls]);

  const [selectedLists, setSelectedLists] = useState<string[]>(availableLists);

  // Filter calls based on selected lists
  const filteredCalls = useMemo(() => {
    if (selectedLists.length === 0) return [];
    return calls.filter((c) => selectedLists.includes(c.contactList));
  }, [calls, selectedLists]);

  const handleListSelect = (listName: string) => {
    setSelectedLists((prev) =>
      prev.includes(listName)
        ? prev.filter((l) => l !== listName)
        : [...prev, listName]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      borderRadius: borderRadius.md,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
    } as ViewStyle,
    filterButtonText: {
      fontSize: fontSize.sm,
      fontWeight: '600',
      color: themeColors.steelSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,
    filterDropdown: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.md,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      overflow: 'hidden',
    } as ViewStyle,
    filterOption: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,
    filterOptionText: {
      fontSize: fontSize.sm,
      color: themeColors.inkPrimary,
      fontWeight: '500',
    } as TextStyle,
    callRow: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    callInfo: {
      flex: 1,
    } as ViewStyle,
    callName: {
      fontSize: fontSize.sm,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.xs,
    } as TextStyle,
    callDisposition: {
      fontSize: fontSize.xs,
      color: colors.light.newtechGreen,
      fontWeight: '500',
    } as TextStyle,
    chevron: {
      marginLeft: spacing.md,
    } as ViewStyle,
    scrollContent: {
      paddingBottom: spacing.lg,
    } as ViewStyle,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterExpanded(!isFilterExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.filterButtonText}>FILTRAR POR LISTA</Text>
        <ChevronDown
          size={20}
          color={themeColors.steelSecondary}
          strokeWidth={2}
          style={{ transform: [{ rotate: isFilterExpanded ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      {/* Filter Dropdown */}
      {isFilterExpanded && (
        <View style={styles.filterDropdown}>
          {availableLists.map((list) => (
            <TouchableOpacity
              key={list}
              style={styles.filterOption}
              onPress={() => handleListSelect(list)}
              activeOpacity={0.7}
            >
              <Text style={styles.filterOptionText}>{list}</Text>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: colors.light.newtechGreen,
                  backgroundColor: selectedLists.includes(list)
                    ? colors.light.newtechGreen
                    : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {selectedLists.includes(list) && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Calls List */}
      <View style={styles.scrollContent}>
        {filteredCalls.map((call) => (
          <TouchableOpacity
            key={call.id}
            style={styles.callRow}
            onPress={() => onSelectCall(call)}
            activeOpacity={0.7}
          >
            <View style={styles.callInfo}>
              <Text style={styles.callName}>{call.contactName}</Text>
              <Text style={styles.callDisposition}>{call.disposition}</Text>
            </View>
            <ChevronRight size={20} color={themeColors.steelSecondary} strokeWidth={2} style={styles.chevron} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
