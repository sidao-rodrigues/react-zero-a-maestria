import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_CATEGORY } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { ICategoryType } from '../../../shared/types/CategoryType';
import { ECategoryRoutesEnum } from '../routes';

interface ICategoryReq {
  name: string;
}

export const useInsertCategory = () => {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const { request } = useRequests();
  const { setCategories } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [name]);

  const insertCategory = async () => {
    setLoading(true);
    await request<ICategoryType, ICategoryReq>(URL_CATEGORY, EMethodsEnum.POST, undefined, {
      name,
    });

    await request<ICategoryType[]>(URL_CATEGORY, EMethodsEnum.GET, setCategories);
    setLoading(false);
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
    disabledButton,
    handleOnChangeName,
    insertCategory,
    handleOnClickCancel,
    loading,
  };
};
