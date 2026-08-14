// src/hooks/usePlatform.ts

import { usePlatformContext } from '../context/PlatformContext';

export const usePlatform = () => {
  return usePlatformContext();
};
