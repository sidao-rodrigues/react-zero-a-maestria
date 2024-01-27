import React, { createContext, useContext, useState } from 'react';

import { IProductType } from '../../modules/product/types/ProductType';

interface IDataContext {
  products?: IProductType[];
}

interface IDataContextProps {
  data: IDataContext;
  setData: (data: IDataContext) => void;
}

interface IDataProviderProps {
  children: React.ReactNode;
}

const DataContext = createContext({} as IDataContextProps);

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [data, setData] = useState<IDataContext>({});

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext);

  const setProducts = (products: IProductType[]) => {
    setData({
      ...data,
      products,
    });
  };

  return {
    products: data?.products || [],
    setProducts,
  };
};
