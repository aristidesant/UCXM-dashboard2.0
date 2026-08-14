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
import { colors, typography, spacing, borderRadius } from '../design';
import { InfoType } from '../context/AppContext';

interface FilterButtonProps {
  currentType: InfoType;
  onSelect: (type: InfoType) => void;
}

const infoTypeLabels: Record<InfoType, string> = {
  qa: 'QA',
  emotion: 'Emotion & Sentiment',
  compliance: 'Compliance',
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  currentType,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = StyleSheet.create({
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.light.bgSecondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      ...typography.label,
      color: colors.light.darkGray,
      marginRight: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.light.bgPrimary,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      paddingVertical: spacing.md,
    },
    optionItem: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    optionText: {
      ...typography.body,
      color: colors.light.darkGray,
    },
    checkmark: {
      ...typography.body,
      color: colors.light.primaryBlue,
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
        <Text style={styles.buttonText}>⚙️</Text>
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
                {currentType === type && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};
