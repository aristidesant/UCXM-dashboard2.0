// src/context/PlatformContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

type Platform = 'mobile' | 'web';

interface PlatformContextType {
  platform: Platform;
  togglePlatform: () => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platform, setPlatform] = useState<Platform>(() => {
    if (typeof window === 'undefined') return 'web';
    const saved = localStorage.getItem('platform_preference') as Platform | null;
    return saved || 'mobile';
  });

  useEffect(() => {
    localStorage.setItem('platform_preference', platform);
  }, [platform]);

  const togglePlatform = () => {
    setPlatform(prev => (prev === 'mobile' ? 'web' : 'mobile'));
  };

  return (
    <PlatformContext.Provider value={{ platform, togglePlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatformContext = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatformContext must be used within PlatformProvider');
  }
  return context;
};
