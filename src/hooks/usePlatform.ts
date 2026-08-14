// src/hooks/usePlatform.ts

import { usePlatformContext } from '../context/PlatformContext';

export const usePlatform = () => {
  const { platform, setPlatform, dimensions } = usePlatformContext();
  return { platform, setPlatform, dimensions, isMobile: platform === 'mobile' };
};
