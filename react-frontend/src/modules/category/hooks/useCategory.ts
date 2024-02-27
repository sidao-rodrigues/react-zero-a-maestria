import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_CATEGORY, URL_CATEGORY_ID } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
// import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { ECategoryRoutesEnum } from '../routes';
import { ICategoryType } from './../../../shared/types/CategoryType';

export const useCategory = () => {
  // const { categories, setCategories } = useDataContext();
  const navigate = useNavigate();
  const { request } = useRequests();
  const { categories, setCategories } = useCategoryReducer();
  const [categoryIdDelete, setCategoryIdDelete] = useState<number | undefined>();
  const [categoriesFiltered, setCategoriesFiltered] = useState<ICategoryType[]>([]);

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

  const handleOnClickCategory: React.MouseEventHandler<HTMLElement> = (): void => {
    navigate(ECategoryRoutesEnum.CATEGORY_INSERT);
  };

  const handleOpenModalDelete = (categoryId: number) => {
    setCategoryIdDelete(categoryId);
  };

  const handleCloseModalDelete = () => {
    setCategoryIdDelete(undefined);
  };

  const handleConfirmDeleteCategory = async () => {
    await request(
      URL_CATEGORY_ID.replace('{categoryId}', `${categoryIdDelete}`),
      EMethodsEnum.DELETE,
      undefined,
      undefined,
      `Categoria (${categoryIdDelete}) excluída com sucesso!`,
    );
    await request<ICategoryType[]>(URL_CATEGORY, EMethodsEnum.GET, setCategories);
    setCategoryIdDelete(undefined);
  };

  const handleGoToEditCategory = (categoryId: number) => {
    navigate(ECategoryRoutesEnum.CATEGORY_EDIT.replace(':categoryId', `${categoryId}`));
  };

  return {
    categories: categoriesFiltered,
    openModalDelete: !!categoryIdDelete,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDeleteCategory,
    handleGoToEditCategory,
  };
};
