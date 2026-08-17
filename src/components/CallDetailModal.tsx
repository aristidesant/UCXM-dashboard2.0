import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Modal,
} from 'react-native';
import { X, Play, Pause, Volume2 } from 'lucide-react';
import { colors, spacing, typography, borderRadius, opacity, fontSize } from '../design';
import { useTheme } from '../context/ThemeContext';
import type { Call } from '../data/mockCalls';

interface CallDetailModalProps {
  call: Call | null;
  isVisible: boolean;
  onClose: () => void;
}

export const CallDetailModal: React.FC<CallDetailModalProps> = ({
  call,
  isVisible,
  onClose,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [playbackTime, setPlaybackTime] = useState(0);

  if (!call) return null;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? `rgba(0, 0, 0, ${opacity['4xl']})` : `rgba(0, 0, 0, ${opacity.md})`,
    } as ViewStyle,
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
    } as ViewStyle,
    content: {
      backgroundColor: themeColors.pureSurface,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      maxHeight: '90%',
      overflow: 'hidden',
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    headerTitle: {
      ...typography.heading,
      color: themeColors.inkPrimary,
    } as TextStyle,
    closeButton: {
      padding: spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    } as ViewStyle,
    section: {
      marginBottom: spacing.lg,
      paddingBottomWidth: 1,
      paddingBottom: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    sectionTitle: {
      ...typography.heading,
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
    } as TextStyle,
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
    } as ViewStyle,
    infoLabel: {
      ...typography.caption,
      color: themeColors.mutedSlate,
    } as TextStyle,
    infoValue: {
      ...typography.label,
      color: themeColors.inkPrimary,
    } as TextStyle,
    contactCard: {
      backgroundColor: isDark ? `rgba(27, 181, 74, ${opacity.xs})` : `rgba(27, 181, 74, ${opacity.xs})`,
      borderWidth: 1,
      borderColor: themeColors.newtechGreen,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,
    contactName: {
      ...typography.heading,
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
    } as TextStyle,
    statusBadge: {
      alignSelf: 'flex-start',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
      marginBottom: spacing.md,
    } as ViewStyle,
    statusText: {
      ...typography.micro,
      color: '#FFFFFF',
      fontSize: fontSize.xs,
      fontWeight: '600',
    } as TextStyle,
    recordingSection: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    playbackContainer: {
      backgroundColor: isDark ? `rgba(255, 255, 255, ${opacity.xs})` : `rgba(0, 0, 0, ${opacity.xs})`,
      borderRadius: borderRadius.md,
      padding: spacing.md,
    } as ViewStyle,
    playbackControls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.lg,
      marginVertical: spacing.md,
    } as ViewStyle,
    playButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: themeColors.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    speedButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.sm,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      backgroundColor: themeColors.sunkenBase,
    } as ViewStyle,
    speedButtonText: {
      ...typography.caption,
      color: themeColors.inkPrimary,
      fontWeight: '600',
    } as TextStyle,
    timelineContainer: {
      marginVertical: spacing.md,
    } as ViewStyle,
    timeline: {
      height: 4,
      backgroundColor: themeColors.sunkenBase,
      borderRadius: 2,
      overflow: 'hidden',
    } as ViewStyle,
    timelineFill: {
      height: '100%',
      backgroundColor: themeColors.newtechGreen,
      width: '45%',
    } as ViewStyle,
    timeLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
    } as ViewStyle,
    timeLabel: {
      ...typography.caption,
      color: themeColors.mutedSlate,
      fontSize: fontSize.xs,
    } as TextStyle,
    summaryText: {
      ...typography.body,
      color: themeColors.steelSecondary,
      lineHeight: 24,
    } as TextStyle,
    transcriptText: {
      ...typography.caption,
      color: themeColors.steelSecondary,
      lineHeight: 20,
    } as TextStyle,
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
      marginTop: spacing.md,
    } as ViewStyle,
    actionButtonText: {
      ...typography.label,
      color: themeColors.newtechGreen,
      marginLeft: spacing.sm,
    } as TextStyle,
  });

  const getTotalDuration = () => '3:55'; // From call data
  const getCurrentTime = () => {
    const minutes = Math.floor(playbackTime / 60);
    const seconds = playbackTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Detalles de la Llamada</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                <X size={24} color={themeColors.inkPrimary} />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Contact Card */}
              <View style={styles.contactCard}>
                <Text style={styles.contactName}>{call.contactName}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: call.statusColor },
                  ]}
                >
                  <Text style={styles.statusText}>{call.statusLabel}</Text>
                </View>
                <Text style={[typography.caption, { color: themeColors.mutedSlate }]}>
                  {call.phoneNumber}
                </Text>
              </View>

              {/* Call Info Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Fecha</Text>
                  <Text style={styles.infoValue}>{call.dateTime}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Duración</Text>
                  <Text style={styles.infoValue}>{call.duration}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Agente</Text>
                  <Text style={styles.infoValue}>{call.agentName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Idioma</Text>
                  <Text style={styles.infoValue}>{call.language}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Resultado</Text>
                  <Text style={[styles.infoValue, { color: themeColors.newtechGreen }]}>
                    {call.disposition}
                  </Text>
                </View>
                {call.features.length > 0 && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Características</Text>
                    <Text style={styles.infoValue}>{call.features.join(', ')}</Text>
                  </View>
                )}
              </View>

              {/* Recording Section */}
              <View style={styles.recordingSection}>
                <Text style={styles.sectionTitle}>Grabación</Text>
                <View style={styles.playbackContainer}>
                  <View style={styles.playbackControls}>
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => setIsPlaying(!isPlaying)}
                      activeOpacity={0.7}
                    >
                      {isPlaying ? (
                        <Pause size={24} color="#FFFFFF" />
                      ) : (
                        <Play size={24} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.speedButton}
                      onPress={() => {
                        const speeds = ['1x', '1.5x', '2x'];
                        const currentIndex = speeds.indexOf(playbackSpeed);
                        setPlaybackSpeed(speeds[(currentIndex + 1) % speeds.length]);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.speedButtonText}>{playbackSpeed}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Timeline */}
                  <View style={styles.timelineContainer}>
                    <View style={styles.timeline}>
                      <View style={styles.timelineFill} />
                    </View>
                    <View style={styles.timeLabels}>
                      <Text style={styles.timeLabel}>{getCurrentTime()}</Text>
                      <Text style={styles.timeLabel}>{getTotalDuration()}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* AI Summary Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resumen IA</Text>
                <Text style={styles.summaryText}>{call.aiSummary}</Text>
              </View>

              {/* Transcript Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Transcripción</Text>
                <Text style={styles.transcriptText}>{call.transcriptText}</Text>
              </View>

              {/* Actions */}
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Text style={styles.actionButtonText}>📄 Compartir PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Text style={styles.actionButtonText}>🔗 Compartir enlace</Text>
              </TouchableOpacity>

              {/* Bottom Padding */}
              <View style={{ height: spacing.lg }} />
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};
