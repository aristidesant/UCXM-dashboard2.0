// src/components/FilterButton.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Settings, Check } from 'lucide-react';
import { colors, typography, spacing, borderRadius } from '../design';
import { InfoType } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

interface FilterButtonProps {
  currentType: InfoType;
  onSelect: (type: InfoType) => void;
}

const infoTypeLabels: Record<InfoType, string> = {
  operation: 'Operation',
  qa: 'QA',
  emotion: 'Emotion & Sentiment',
  compliance: 'Compliance',
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  currentType,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.sm,
      backgroundColor: themeColors.bgSecondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      ...typography.label,
      color: themeColors.darkGray,
      marginRight: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: themeColors.bgPrimary,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      paddingVertical: spacing.md,
    },
    optionItem: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.lightGray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    optionText: {
      ...typography.body,
      color: themeColors.darkGray,
    },
    checkmark: {
      ...typography.body,
      color: themeColors.primaryBlue,
      fontWeight: '700',
    },
  });

  const handleSelect = (type: InfoType) => {
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{infoTypeLabels[currentType]}</Text>
        <Settings size={18} color={themeColors.steelSecondary} strokeWidth={2} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {(['qa', 'emotion', 'compliance'] as InfoType[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.optionItem}
                onPress={() => handleSelect(type)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{infoTypeLabels[type]}</Text>
                {currentType === type && <Check size={18} color={themeColors.newtechGreen} strokeWidth={2} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};
