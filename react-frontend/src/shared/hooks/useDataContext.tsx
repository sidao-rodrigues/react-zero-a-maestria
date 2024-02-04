import React, { createContext, useContext, useState } from 'react';

import { ICategoryType } from '../types/CategoryType';
import { IProductType } from '../types/ProductType';

interface IDataContext {
  products?: IProductType[];
  categories?: ICategoryType[];
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

  const setCategories = (categories: ICategoryType[]) => {
    setData({
      ...data,
      categories,
    });
  };

  return {
    products: data?.products || [],
    categories: data?.categories || [],
    setProducts,
    setCategories,
  };
};
