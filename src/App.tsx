import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ViewStyle } from 'react-native';
import { PlatformProvider } from './context/PlatformContext';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlatformToggle, TabBar } from './components';
import {
  DashboardsScreen,
  CampaignDashboardScreen,
  ContactDetailsScreen,
  SettingsScreen,
  LoginScreen,
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
  const { platform } = usePlatform();
  const isMobile = platform === 'mobile';
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

  const tabs = [
    { id: 'dashboards', label: 'Dashboards', icon: '📊' },
    { id: 'campaign', label: 'Campaign', icon: '📈' },
    { id: 'contact', label: 'Contact', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
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
        return <DashboardsScreen onSelectDashboard={handleSelectDashboard} />;
      case 'campaign':
        return currentDashboard ? (
          <CampaignDashboardScreen
            onSelectContact={handleSelectContact}
            onBack={handleBack}
          />
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
        return <DashboardsScreen onSelectDashboard={handleSelectDashboard} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <LoginScreen onLoginSuccess={() => {}} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PlatformToggle />
        <View style={styles.content}>{renderScreen()}</View>
        <TabBar
          currentScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen as Screen)}
          tabs={tabs}
        />
      </View>
    </SafeAreaView>
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
