// src/context/AppContext.tsx

import React, { createContext, useContext, useState } from 'react';

export type InfoType = 'qa' | 'emotion' | 'compliance';

interface AppContextType {
  currentDashboard: string | null;
  setCurrentDashboard: (id: string) => void;
  currentInfoType: InfoType;
  setCurrentInfoType: (type: InfoType) => void;
  selectedContact: string | null;
  setSelectedContact: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDashboard, setCurrentDashboard] = useState<string | null>(null);
  const [currentInfoType, setCurrentInfoType] = useState<InfoType>('qa');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        currentDashboard,
        setCurrentDashboard,
        currentInfoType,
        setCurrentInfoType,
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
