import { useEffect } from 'react';

import { URL_CATEGORY } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';

export const useCategory = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      request(URL_CATEGORY, EMethodsEnum.GET, setCategories);
    }
  }, []);

  return {
    categories,
  };
};
