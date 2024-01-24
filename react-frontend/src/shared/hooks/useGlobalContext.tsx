import React, { createContext, useContext, useState } from 'react';

interface IGlobalData {
  accessToken?: string;
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

  const setAccessToken = (accessToken: string) => {
    setGlobalData({
      ...globalData,
      accessToken,
    });
  };

  return {
    accessToken: globalData.accessToken,
    setAccessToken,
  };
};
