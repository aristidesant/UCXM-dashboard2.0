import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, ViewStyle, TouchableOpacity } from 'react-native';
import { Laptop, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { colors, typography, spacing } from '../design';
import { Card, Button } from '../components';
import { usePlatform } from '../hooks/usePlatform';
import { useTheme } from '../context/ThemeContext';

export const SettingsScreen: React.FC = () => {
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const { theme, setTheme, effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
      paddingHorizontal: isMobile ? spacing.md : spacing.lg,
      paddingTop: spacing.lg,
    } as ViewStyle,
    header: {
      fontSize: 32,
      fontWeight: '700',
      color: themeColors.inkPrimary,
      marginBottom: spacing.lg,
      lineHeight: 40,
      letterSpacing: -0.02,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.md,
      lineHeight: 26,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.whisperBorder,
    } as ViewStyle,
    settingLabel: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      lineHeight: 22,
    },
    profileCard: {
      marginBottom: spacing.md,
    },
    profileName: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.inkPrimary,
      marginBottom: spacing.xs,
      lineHeight: 26,
    },
    profileEmail: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.mutedSlate,
      lineHeight: 18,
    },
    versionText: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.mutedSlate,
      marginTop: spacing.lg,
      textAlign: 'center',
      lineHeight: 18,
    },
    themeOptions: {
      gap: spacing.md,
    } as ViewStyle,
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      backgroundColor: themeColors.sunkenBase,
      marginBottom: spacing.sm,
      borderWidth: 2,
      borderColor: 'transparent',
    } as ViewStyle,
    themeOptionActive: {
      backgroundColor: themeColors.greenSoft,
      borderColor: themeColors.newtechGreen,
    } as ViewStyle,
    themeOptionLabel: {
      fontSize: 15,
      fontWeight: '400',
      color: themeColors.inkPrimary,
      flex: 1,
      lineHeight: 22,
    },
    themeRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: themeColors.newtechGreen,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    themeRadioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: themeColors.newtechGreen,
    } as ViewStyle,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Ajustes</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        <Card style={styles.profileCard}>
          <Text style={styles.profileName}>Aristides Santana</Text>
          <Text style={styles.profileEmail}>aristides.santana@newtechsa.com</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
            <CheckCircle2 size={16} color={themeColors.success} strokeWidth={2} style={{ marginRight: spacing.xs }} />
            <Text style={[typography.caption, { color: themeColors.success }]}>
              Estado iniciada
            </Text>
          </View>
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
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[styles.settingLabel, { marginBottom: spacing.md }]}>Tema</Text>
            <View style={styles.themeOptions}>
              <TouchableOpacity
                style={[styles.themeOption, theme === 'system' && styles.themeOptionActive]}
                onPress={() => setTheme('system')}
              >
                <Laptop size={20} color={themeColors.steelSecondary} strokeWidth={2} style={{ marginRight: spacing.md }} />
                <Text style={styles.themeOptionLabel}>Sistema</Text>
                <View style={styles.themeRadio}>
                  {theme === 'system' && <View style={styles.themeRadioInner} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.themeOption, theme === 'light' && styles.themeOptionActive]}
                onPress={() => setTheme('light')}
              >
                <Sun size={20} color={themeColors.steelSecondary} strokeWidth={2} style={{ marginRight: spacing.md }} />
                <Text style={styles.themeOptionLabel}>Claro</Text>
                <View style={styles.themeRadio}>
                  {theme === 'light' && <View style={styles.themeRadioInner} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.themeOption, theme === 'dark' && styles.themeOptionActive]}
                onPress={() => setTheme('dark')}
              >
                <Moon size={20} color={themeColors.steelSecondary} strokeWidth={2} style={{ marginRight: spacing.md }} />
                <Text style={styles.themeOptionLabel}>Oscuro</Text>
                <View style={styles.themeRadio}>
                  {theme === 'dark' && <View style={styles.themeRadioInner} />}
                </View>
              </TouchableOpacity>
            </View>
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
