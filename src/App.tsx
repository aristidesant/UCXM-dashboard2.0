import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ViewStyle } from 'react-native';
import { LayoutGrid, CheckCircle, Shield, Lightbulb, Settings } from 'lucide-react';
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
} from './screens';
import { useAppContext } from './context/AppContext';
import { usePlatform } from './hooks/usePlatform';
import { colors, spacing } from './design';
import { mockContacts } from './data/mockContacts';

type Screen = 'dashboards' | 'campaign' | 'contact' | 'settings';

const AppContent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboards');
  const { currentDashboard, setCurrentDashboard } = useAppContext();
  const { platform, isMobile } = usePlatform();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const selectedContact = mockContacts.find((c) => c.id === selectedContactId);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
    } as ViewStyle,
    safeArea: {
      flex: 1,
      backgroundColor: colors.light.bgPrimary,
    } as ViewStyle,
    content: {
      flex: 1,
      position: 'relative',
    } as ViewStyle,
  });

  const navItems = [
    { id: 'dashboards', label: 'Dashboards', icon: <LayoutGrid size={24} color={currentScreen === 'dashboards' ? colors.light.primaryBlue : colors.light.mediumGray} /> },
    { id: 'campaign', label: 'Calidad', icon: <CheckCircle size={24} color={currentScreen === 'campaign' ? colors.light.primaryBlue : colors.light.mediumGray} /> },
    { id: 'contact', label: 'Cumplimiento', icon: <Shield size={24} color={currentScreen === 'contact' ? colors.light.primaryBlue : colors.light.mediumGray} /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb size={24} color={currentScreen === 'insights' ? colors.light.primaryBlue : colors.light.mediumGray} /> },
    { id: 'settings', label: 'Ajustes', icon: <Settings size={24} color={currentScreen === 'settings' ? colors.light.primaryBlue : colors.light.mediumGray} /> },
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
      case 'dashboards':
        return isMobile ? (
          <DashboardsMobileScreen onSelectDashboard={handleSelectDashboard} />
        ) : (
          <DashboardsScreen onSelectDashboard={handleSelectDashboard} />
        );
      case 'campaign':
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
      case 'contact':
        return (
          <ContactDetailsScreen contact={selectedContact || null} onBack={handleBack} />
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return isMobile ? (
          <DashboardsMobileScreen onSelectDashboard={handleSelectDashboard} />
        ) : (
          <DashboardsScreen onSelectDashboard={handleSelectDashboard} />
        );
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
      <DeviceFrame>
        <PlatformToggle />
        <LoginScreen onLoginSuccess={() => {}} />
      </DeviceFrame>
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
              { id: 'dashboards', label: 'Dashboards', icon: '📊' },
              { id: 'campaign', label: 'Campaign', icon: '📈' },
              { id: 'contact', label: 'Contact', icon: '👤' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ]}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <DeviceFrame>
      <PlatformToggle />
      <View style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>
        <BottomNavBar
          items={navItems}
          activeItemId={currentScreen}
          onSelectItem={(id) => setCurrentScreen(id as Screen)}
        />
      </View>
    </DeviceFrame>
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
