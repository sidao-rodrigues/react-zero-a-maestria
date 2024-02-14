import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';

import { URL_CATEGORY } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
// import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { ICategoryType } from './../../../shared/types/CategoryType';

export const useCategory = () => {
  // const { categories, setCategories } = useDataContext();
  const { categories, setCategories } = useCategoryReducer();
  const [categoriesFiltered, setCategoriesFiltered] = useState<ICategoryType[]>([]);
  const { request } = useRequests();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      request<ICategoryType[]>(URL_CATEGORY, EMethodsEnum.GET, setCategories);
    }
  }, []);

  useEffect(() => {
    setCategoriesFiltered([...categories]);
  }, [categories]);

  const handleOnChangeSearch: SearchProps['onSearch'] = (value: string) => {
    if (!value) {
      setCategoriesFiltered(categories);
    } else {
      setCategoriesFiltered([
        ...categories.filter((category) => new RegExp(value, 'i').test(category.name)),
      ]);
    }
  };

  return {
    categories: categoriesFiltered,
    handleOnChangeSearch,
  };
};
