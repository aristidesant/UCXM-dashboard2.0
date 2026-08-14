import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../design';
import { Card, Button } from '../components';
import { usePlatform } from '../hooks/usePlatform';

export const SettingsScreen: React.FC = () => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      ...typography.display,
      color: colors.light.darkGray,
      marginBottom: spacing.lg,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.md,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.light.lightGray,
    } as ViewStyle,
    settingLabel: {
      ...typography.body,
      color: colors.light.darkGray,
    },
    profileCard: {
      marginBottom: spacing.md,
    },
    profileName: {
      ...typography.heading,
      color: colors.light.darkGray,
      marginBottom: spacing.xs,
    },
    profileEmail: {
      ...typography.caption,
      color: colors.light.mediumGray,
    },
    versionText: {
      ...typography.caption,
      color: colors.light.mediumGray,
      marginTop: spacing.lg,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Ajustes</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        <Card style={styles.profileCard}>
          <Text style={styles.profileName}>Aristides Santana</Text>
          <Text style={styles.profileEmail}>aristides.santana@newtechsa.com</Text>
          <Text style={[typography.caption, { color: colors.light.successGreen, marginTop: spacing.sm }]}>
            Estado iniciada
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Cambiar cliente</Text>
            <Text>›</Text>
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Cambiar contraseña</Text>
            <Text>›</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <Card>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Inicio de sesión biométrico</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.light.lightGray, true: colors.light.successGreen }}
              thumbColor={colors.light.bgPrimary}
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Tema</Text>
            <Text style={typography.caption}>☀️ Claro</Text>
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>Idioma</Text>
            <Text style={typography.caption}>🇪🇸 Español</Text>
          </View>
        </Card>
      </View>

      <Button title="Cerrar sesión" onPress={() => {}} variant="secondary" style={{ marginBottom: spacing.xxl }} />
      <Text style={styles.versionText}>v1.0.0</Text>
    </ScrollView>
  );
};
