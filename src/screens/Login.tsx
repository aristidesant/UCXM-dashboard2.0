// src/screens/Login.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'lucide-react';
import { colors, typography, spacing, borderRadius } from '../design';
import { Button, Card } from '../components';
import { usePlatform } from '../hooks/usePlatform';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { login } = useAuth();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faceRecognitionMode, setFaceRecognitionMode] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      login(username, rememberMe);
      setLoading(false);
      onLoginSuccess();
    }, 500);
  };

  const handleFaceRecognition = () => {
    setFaceRecognitionMode(true);
    setError('');
    setLoading(true);

    // Auto-succeed face recognition after 2 seconds (simulated scan)
    setTimeout(() => {
      const mockUsername = 'Aristides Santana';
      login(mockUsername, rememberMe);
      setLoading(false);
      setFaceRecognitionMode(false);
      onLoginSuccess();
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
    } as ViewStyle,
    scrollContainer: {
      width: '100%',
      maxWidth: isMobile ? '100%' : 500,
    },
    loginCard: {
      padding: isMobile ? spacing.lg : spacing.xl,
    },
    header: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
      textAlign: 'center',
      lineHeight: 40,
      letterSpacing: -0.02,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.steelSecondary,
      marginBottom: spacing.lg,
      textAlign: 'center',
      lineHeight: 22,
    },
    inputContainer: {
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.sm,
      lineHeight: 18,
      textTransform: 'uppercase',
      letterSpacing: 0.06,
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDE2E8',
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      backgroundColor: themeColors.pureSurface,
      minHeight: 44,
      lineHeight: 20,
    },
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    rememberMeCheckbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: themeColors.newtechGreen,
      borderRadius: 4,
      marginRight: spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: rememberMe ? themeColors.newtechGreen : 'transparent',
    },
    rememberMeCheckmark: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
    rememberMeLabel: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      lineHeight: 22,
    },
    buttonContainer: {
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: themeColors.whisperBorder,
    },
    dividerText: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.mutedSlate,
      marginHorizontal: spacing.md,
      lineHeight: 18,
      textTransform: 'uppercase',
      letterSpacing: 0.06,
    },
    errorText: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.danger,
      marginBottom: spacing.md,
      textAlign: 'center',
      lineHeight: 18,
    },
    faceRecognitionModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    faceRecognitionContent: {
      alignItems: 'center',
      padding: spacing.lg,
    },
    cameraPreview: {
      width: 200,
      height: 250,
      borderRadius: 12,
      backgroundColor: themeColors.sunkenBase,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
      borderWidth: 2,
      borderColor: themeColors.newtechGreen,
    },
    scanningText: {
      fontSize: 15,
      fontWeight: '400',
      color: '#FFFFFF',
      marginTop: spacing.md,
      textAlign: 'center',
      lineHeight: 22,
    },
  });

  if (faceRecognitionMode) {
    return (
      <Modal
        visible={faceRecognitionMode}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!loading) setFaceRecognitionMode(false);
        }}
      >
        <View style={styles.faceRecognitionModal}>
          <View style={styles.faceRecognitionContent}>
            <View style={styles.cameraPreview}>
              {loading ? (
                <>
                  <ActivityIndicator size="large" color={themeColors.primaryBlue} />
                  <Text style={styles.scanningText}>Scanning face...</Text>
                </>
              ) : (
                <Camera size={32} color={themeColors.mutedSlate} strokeWidth={2} />
              )}
            </View>
            {!loading && (
              <Button
                title="Cancel"
                onPress={() => setFaceRecognitionMode(false)}
                variant="secondary"
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: 'center' }}
      >
        <Card style={styles.loginCard}>
          <Text style={styles.header}>Login</Text>
          <Text style={styles.subtitle}>Campaign Management System</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={themeColors.mediumGray}
              value={username}
              onChangeText={setUsername}
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.light.mediumGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.rememberMeCheckbox}
              onPress={() => setRememberMe(!rememberMe)}
              disabled={loading}
            >
              {rememberMe && <Text style={styles.rememberMeCheckmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.rememberMeLabel}>Remember me</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={loading ? 'Logging in...' : 'Login'}
              onPress={handleLogin}
              disabled={loading}
            />
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Face Recognition Login"
            onPress={handleFaceRecognition}
            variant="secondary"
            disabled={loading}
          />
        </Card>
      </ScrollView>
    </View>
  );
};
