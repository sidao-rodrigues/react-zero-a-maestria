import React, { createContext, useContext, useState } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface INotificationProps {
  message: string;
  type: NotificationType;
  description?: string;
}

interface IGlobalData {
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
    setNotification,
  };
};
