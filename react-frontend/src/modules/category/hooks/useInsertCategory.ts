import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { URL_CATEGORY, URL_CATEGORY_ID } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
// import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { ICategoryType } from '../../../shared/types/CategoryType';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { ECategoryRoutesEnum } from '../routes';

interface ICategoryReq {
  name: string;
}

export const useInsertCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [name, setName] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const { request, loading } = useRequests();
  // const { setCategories } = useDataContext();
  const { category, setCategory, setCategories } = useCategoryReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  useEffect(() => {
    if (!name) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [name]);

  useEffect(() => {
    if (categoryId) {
      request(
        URL_CATEGORY_ID.replace('{categoryId}', `${categoryId}`),
        EMethodsEnum.GET,
        setCategory,
      );
    } else {
      setCategory(undefined);
      setName('');
    }
  }, [categoryId]);

  const insertCategory = async () => {
    if (categoryId) {
      await request<ICategoryType, ICategoryReq>(
        URL_CATEGORY_ID.replace('{categoryId}', `${categoryId}`),
        EMethodsEnum.PUT,
        undefined,
        {
          name,
        },
      );
    } else {
      await request<ICategoryType, ICategoryReq>(URL_CATEGORY, EMethodsEnum.POST, undefined, {
        name,
      });
    }
    await request<ICategoryType[]>(URL_CATEGORY, EMethodsEnum.GET, setCategories);

    navigate(ECategoryRoutesEnum.CATEGORY);
  };

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOnClickCancel = () => {
    navigate(ECategoryRoutesEnum.CATEGORY);
  };

  return {
    name,
    categoryId,
    disabledButton,
    handleOnChangeName,
    insertCategory,
    handleOnClickCancel,
    loading,
  };
};
