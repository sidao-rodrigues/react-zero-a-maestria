import React, { createContext, useContext, useEffect, useState } from 'react';

import { getAuthorizationToken, setAuthorizationToken } from '../functions/connection/auth';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface INotificationProps {
  message: string;
  type: NotificationType;
  description?: string;
}

interface IGlobalData {
  accessToken?: string;
  notification?: INotificationProps;
}

interface IGlobalContextProps {
  globalData: IGlobalData;
  setGlobalData: (globalData: IGlobalData) => void;
}

interface IGlobalProviderProps {
  children: React.ReactNode;
}

const GlobalContext = createContext({} as IGlobalContextProps);

export const GlobalProvider = ({ children }: IGlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<IGlobalData>({});

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    const token = getAuthorizationToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const setAccessToken = (accessToken: string) => {
    setAuthorizationToken(accessToken);
    setGlobalData({
      ...globalData,
      accessToken,
    });
  };

  const setNotification = (message: string, type: NotificationType, description?: string) => {
    setGlobalData({
      ...globalData,
      notification: {
        message,
        type,
        description,
      },
    });
  };

  return {
    notification: globalData?.notification,
    accessToken: globalData?.accessToken,
    setAccessToken,
    setNotification,
  };
};
