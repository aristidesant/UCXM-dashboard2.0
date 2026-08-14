// src/context/PlatformContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Platform = 'mobile' | 'tablet' | 'desktop';

export interface PlatformDimensions {
  width: number;
  height: number;
  bezelWidth: number;
  borderRadius: number;
}

export const PLATFORM_DIMENSIONS: Record<Platform, PlatformDimensions> = {
  mobile: {
    width: 393,
    height: 852,
    bezelWidth: 12,
    borderRadius: 45,
  },
  tablet: {
    width: 768,
    height: 1024,
    bezelWidth: 8,
    borderRadius: 32,
  },
  desktop: {
    width: 0,
    height: 0,
    bezelWidth: 0,
    borderRadius: 0,
  },
};

interface PlatformContextType {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  dimensions: PlatformDimensions;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platform, setPlatformState] = useState<Platform>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const saved = localStorage.getItem('platform_preference') as Platform | null;
    return saved || 'mobile';
  });

  useEffect(() => {
    localStorage.setItem('platform_preference', platform);
  }, [platform]);

  const setPlatform = (newPlatform: Platform) => {
    setPlatformState(newPlatform);
  };

  const dimensions = PLATFORM_DIMENSIONS[platform];

  return (
    <PlatformContext.Provider value={{ platform, setPlatform, dimensions }}>
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
