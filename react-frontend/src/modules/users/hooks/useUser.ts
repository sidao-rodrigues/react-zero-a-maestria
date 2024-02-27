import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';

import { URL_USER_ALL } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { IUserType } from '../../login/types/UserType';

export const useUser = () => {
  const { users, setUsers } = useUserReducer();
  const [usersFiltered, setUsersFiltered] = useState<IUserType[]>([]);
  const { request, loading } = useRequests();

  useEffect(() => {
    request(URL_USER_ALL, EMethodsEnum.GET, setUsers);
  }, []);

  useEffect(() => {
    setUsersFiltered([...users]);
  }, [users]);

  const handleOnChangeSearch: SearchProps['onSearch'] = (value: string) => {
    if (!value) {
      setUsersFiltered(users);
    } else {
      setUsersFiltered([...users.filter((user) => new RegExp(value, 'i').test(user.name))]);
    }
  };

  return {
    users: usersFiltered,
    loading,
    handleOnChangeSearch,
  };
};
