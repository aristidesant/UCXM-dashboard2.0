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
import { colors, typography, spacing, borderRadius } from '../design';
import { Button, Card } from '../components';
import { usePlatform } from '../hooks/usePlatform';
import { useAuth } from '../context/AuthContext';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const { login } = useAuth();

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
      backgroundColor: colors.light.bgPrimary,
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
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    subtitle: {
      ...typography.body,
      color: colors.light.mediumGray,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: spacing.lg,
    },
    label: {
      ...typography.label,
      color: colors.light.darkGray,
      marginBottom: spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.light.lightGray,
      borderRadius: borderRadius.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      ...typography.body,
      color: colors.light.darkGray,
      backgroundColor: colors.light.bgSecondary,
      minHeight: 44,
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
      borderColor: colors.light.primaryBlue,
      borderRadius: 4,
      marginRight: spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: rememberMe ? colors.light.primaryBlue : 'transparent',
    },
    rememberMeCheckmark: {
      color: colors.light.bgPrimary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    rememberMeLabel: {
      ...typography.body,
      color: colors.light.darkGray,
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
      backgroundColor: colors.light.lightGray,
    },
    dividerText: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginHorizontal: spacing.md,
    },
    errorText: {
      ...typography.caption,
      color: colors.light.dangerRed,
      marginBottom: spacing.md,
      textAlign: 'center',
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
      borderRadius: borderRadius.md,
      backgroundColor: colors.light.bgSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
      borderWidth: 2,
      borderColor: colors.light.primaryBlue,
    },
    scanningText: {
      ...typography.body,
      color: colors.light.bgPrimary,
      marginTop: spacing.md,
      textAlign: 'center',
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
                  <ActivityIndicator size="large" color={colors.light.primaryBlue} />
                  <Text style={styles.scanningText}>Scanning face...</Text>
                </>
              ) : (
                <Text style={{ ...typography.body, color: colors.light.mediumGray }}>
                  📷 Camera Preview
                </Text>
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
              placeholderTextColor={colors.light.mediumGray}
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
            title="🔓 Face Recognition Login"
            onPress={handleFaceRecognition}
            variant="secondary"
            disabled={loading}
          />
        </Card>
      </ScrollView>
    </View>
  );
};
