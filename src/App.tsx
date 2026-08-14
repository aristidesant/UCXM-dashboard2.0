import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ViewStyle } from 'react-native';
import { Home, BarChart3, Briefcase, Settings } from 'lucide-react';
import { PlatformProvider } from './context/PlatformContext';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlatformToggle, TabBar, BottomNavBar, DeviceFrame } from './components';
import {
  DashboardsScreen,
  CampaignDashboardScreen,
  ContactDetailsScreen,
  SettingsScreen,
  LoginScreen,
  DashboardsMobileScreen,
  ExecutiveDashboardScreen,
} from './screens';
import { useAppContext } from './context/AppContext';
import { usePlatform } from './hooks/usePlatform';
import { useTheme } from './context/ThemeContext';
import { colors, spacing } from './design';
import { mockContacts } from './data/mockContacts';

type Screen = 'kpi' | 'dashboards' | 'campaign' | 'contact' | 'settings';

const AppContent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('kpi');
  const { currentDashboard, setCurrentDashboard } = useAppContext();
  const { platform, isMobile } = usePlatform();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const selectedContact = mockContacts.find((c) => c.id === selectedContactId);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    safeArea: {
      flex: 1,
      backgroundColor: themeColors.canvasFrost,
    } as ViewStyle,
    content: {
      flex: 1,
      position: 'relative',
    } as ViewStyle,
  });

  const navItems = [
    { id: 'kpi', icon: <Home size={24} color={currentScreen === 'kpi' ? themeColors.newtechGreen : themeColors.steelSecondary} /> },
    { id: 'dashboards', icon: <BarChart3 size={24} color={currentScreen === 'dashboards' ? themeColors.newtechGreen : themeColors.steelSecondary} /> },
    { id: 'campaign', icon: <Briefcase size={24} color={currentScreen === 'campaign' ? themeColors.newtechGreen : themeColors.steelSecondary} /> },
    { id: 'settings', icon: <Settings size={24} color={currentScreen === 'settings' ? themeColors.newtechGreen : themeColors.steelSecondary} /> },
  ];

  const handleSelectDashboard = (dashboardId: string) => {
    setCurrentDashboard(dashboardId);
    setCurrentScreen('campaign');
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setCurrentScreen('contact');
  };

  const handleBack = () => {
    if (currentScreen === 'contact') {
      setCurrentScreen('campaign');
      setSelectedContactId(null);
    } else if (currentScreen === 'campaign') {
      setCurrentScreen('dashboards');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'kpi':
        return <ExecutiveDashboardScreen />;
      case 'dashboards':
        return currentDashboard ? (
          <CampaignDashboardScreen
            onSelectContact={handleSelectContact}
            onBack={handleBack}
          />
        ) : isMobile ? (
          <DashboardsMobileScreen onSelectDashboard={handleSelectDashboard} />
        ) : (
          <DashboardsScreen onSelectDashboard={handleSelectDashboard} />
        );
      case 'campaign':
        return isMobile ? (
          <DashboardsMobileScreen onSelectDashboard={handleSelectDashboard} />
        ) : (
          <DashboardsScreen onSelectDashboard={handleSelectDashboard} />
        );
      case 'contact':
        return (
          <ContactDetailsScreen contact={selectedContact || null} onBack={handleBack} />
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return <ExecutiveDashboardScreen />;
    }
  };

  if (!isLoggedIn) {
    if (platform === 'desktop') {
      return (
        <View style={styles.container}>
          <PlatformToggle />
          <LoginScreen onLoginSuccess={() => {}} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <PlatformToggle />
        <DeviceFrame>
          <LoginScreen onLoginSuccess={() => {}} />
        </DeviceFrame>
      </View>
    );
  }

  if (platform === 'desktop') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <PlatformToggle />
          <View style={styles.content}>{renderScreen()}</View>
          <TabBar
            currentScreen={currentScreen}
            onSelectScreen={(screen) => setCurrentScreen(screen as Screen)}
            tabs={[
              { id: 'kpi', label: 'KPI', icon: '📊' },
              { id: 'dashboards', label: 'Dashboards', icon: '📈' },
              { id: 'campaign', label: 'Campaign', icon: '✓' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ]}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <PlatformToggle />
      <DeviceFrame>
        <View style={styles.container}>
          <View style={styles.content}>{renderScreen()}</View>
          <BottomNavBar
            items={navItems}
            activeItemId={currentScreen}
            onSelectItem={(id) => setCurrentScreen(id as Screen)}
          />
        </View>
      </DeviceFrame>
    </View>
  );
};

export const App: React.FC = () => {
  return (
    <PlatformProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </PlatformProvider>
  );
};

export default App;
