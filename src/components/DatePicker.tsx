import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Calendar } from 'lucide-react';
import { colors, spacing, borderRadius } from '../design';
import { useTheme } from '../context/ThemeContext';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minWidth?: number;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  minWidth = 140,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const handleDateChange = (newDate: string) => {
    onChange(newDate);
  };

  const currentDate = value ? new Date(value) : new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    } as ViewStyle,
    button: {
      height: 40,
      minWidth,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    buttonText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    } as TextStyle,
    icon: {
      marginLeft: spacing.sm,
    } as ViewStyle,
    picker: {
      position: 'absolute',
      top: 45,
      left: 0,
      backgroundColor: themeColors.canvasFrost,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      borderRadius: 8,
      overflow: 'hidden',
      zIndex: 100,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
      padding: spacing.md,
      minWidth: 280,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    } as ViewStyle,
    headerButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    } as ViewStyle,
    headerText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.inkPrimary,
    } as TextStyle,
    weekdayRow: {
      flexDirection: 'row',
      marginBottom: spacing.sm,
    } as ViewStyle,
    weekdayCell: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.xs,
    } as ViewStyle,
    weekdayText: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.steelSecondary,
    } as TextStyle,
    dayRow: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
    } as ViewStyle,
    dayCell: {
      flex: 1,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    } as ViewStyle,
    dayText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
    } as TextStyle,
    daySelected: {
      backgroundColor: themeColors.newtechGreen,
    } as ViewStyle,
    daySelectedText: {
      color: themeColors.canvasFrost,
      fontWeight: '600',
    } as TextStyle,
    dayToday: {
      borderWidth: 1,
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
  });

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;
    const lastDay = getDaysInMonth(newYear, newMonth);
    const currentDay = Math.min(currentDate.getDate(), lastDay);
    const newDate = new Date(newYear, newMonth, currentDay);
    handleDateChange(newDate.toISOString().split('T')[0]);
  };

  const handleNextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;
    const lastDay = getDaysInMonth(newYear, newMonth);
    const currentDay = Math.min(currentDate.getDate(), lastDay);
    const newDate = new Date(newYear, newMonth, currentDay);
    handleDateChange(newDate.toISOString().split('T')[0]);
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    handleDateChange(newDate.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const dayRows: (number | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    dayRows.push(days.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{value || label}</Text>
        <View style={styles.icon}>
          <Calendar size={16} color={themeColors.steelSecondary} strokeWidth={2} />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.picker}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handlePrevMonth}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>◀</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {monthNames[month]} {year}
            </Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleNextMonth}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>▶</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekdayRow}>
            {weekdays.map((day) => (
              <View key={day} style={styles.weekdayCell}>
                <Text style={styles.weekdayText}>{day}</Text>
              </View>
            ))}
          </View>

          {dayRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.dayRow}>
              {row.map((day, dayIndex) => (
                <View key={dayIndex} style={styles.dayCell}>
                  {day !== null && (
                    <TouchableOpacity
                      style={[
                        styles.dayCell,
                        value === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` &&
                          styles.daySelected,
                        day === new Date().getDate() &&
                          month === new Date().getMonth() &&
                          year === new Date().getFullYear() &&
                          !value &&
                          styles.dayToday,
                      ]}
                      onPress={() => handleSelectDay(day)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          value === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` &&
                            styles.daySelectedText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
