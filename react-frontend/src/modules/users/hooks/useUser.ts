import { useEffect } from 'react';

import { URL_USER_ALL } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';

export const useUser = () => {
  const { users, setUsers } = useUserReducer();
  const { request, loading } = useRequests();

  useEffect(() => {
    request(URL_USER_ALL, EMethodsEnum.GET, setUsers);
  }, []);

  return {
    users,
    loading,
  };
};
