// src/hooks/useInfoType.ts

import { useAppContext, InfoType } from '../context/AppContext';

export const useInfoType = () => {
  const { currentInfoType, setCurrentInfoType } = useAppContext();
  return {
    infoType: currentInfoType,
    setInfoType: setCurrentInfoType,
  };
};
