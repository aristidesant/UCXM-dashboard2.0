import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Play, Pause, Volume2, SkipForward, SkipBack, Menu } from 'lucide-react';
import { colors, spacing, borderRadius, fontSize } from '../../design';
import { useTheme } from '../../context/ThemeContext';

interface AudioPlayerProps {
  recordingUrl: string;
  duration: number; // in seconds
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ recordingUrl, duration }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark ? themeColors.sunkenBase : themeColors.pureSurface,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: themeColors.whisperBorder,
    } as ViewStyle,
    timelineContainer: {
      marginBottom: spacing.lg,
    } as ViewStyle,
    timeline: {
      height: 4,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      borderRadius: 2,
      overflow: 'hidden',
      marginBottom: spacing.md,
    } as ViewStyle,
    timelineProgress: {
      height: '100%',
      backgroundColor: colors.light.newtechGreen,
      width: `${(currentTime / duration) * 100}%`,
    } as ViewStyle,
    timeLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    } as ViewStyle,
    timeText: {
      fontSize: fontSize.xs,
      color: themeColors.steelSecondary,
      fontWeight: '500',
    } as TextStyle,
    controlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    } as ViewStyle,
    speedButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: playbackSpeed !== 1 ? 2 : 0,
      borderColor: colors.light.newtechGreen,
    } as ViewStyle,
    speedText: {
      fontSize: fontSize.xs,
      fontWeight: '700',
      color: playbackSpeed !== 1 ? colors.light.newtechGreen : themeColors.steelSecondary,
    } as TextStyle,
    skipButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    playButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.light.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    menuButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? themeColors.canvasDark : colors.light.sunkenBase,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
  });

  const handlePlaybackSpeed = () => {
    const speeds = [1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    setPlaybackSpeed(speeds[(currentIndex + 1) % speeds.length]);
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(currentTime + 10, duration));
  };

  const handleSkipBackward = () => {
    setCurrentTime(Math.max(currentTime - 10, 0));
  };

  return (
    <View style={styles.container}>
      {/* Timeline */}
      <View style={styles.timelineContainer}>
        <View style={styles.timeline}>
          <View style={styles.timelineProgress} />
        </View>
        <View style={styles.timeLabels}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.speedButton} onPress={handlePlaybackSpeed} activeOpacity={0.7}>
          <Text style={styles.speedText}>{playbackSpeed}x</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkipBackward} activeOpacity={0.7}>
          <SkipBack size={20} color={themeColors.steelSecondary} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={0.7}
        >
          {isPlaying ? (
            <Pause size={28} color="white" strokeWidth={2} fill="white" />
          ) : (
            <Play size={28} color="white" strokeWidth={2} fill="white" style={{ marginLeft: 2 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkipForward} activeOpacity={0.7}>
          <SkipForward size={20} color={themeColors.steelSecondary} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Menu size={20} color={themeColors.steelSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
