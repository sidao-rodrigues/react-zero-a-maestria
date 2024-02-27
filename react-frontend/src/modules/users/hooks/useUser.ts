import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER_ALL } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { IUserType } from '../../login/types/UserType';
import { EUserRoutesEnum } from '../routes';

export const useUser = () => {
  const { users, setUsers } = useUserReducer();
  const [usersFiltered, setUsersFiltered] = useState<IUserType[]>([]);
  const { request, loading } = useRequests();
  const navigate = useNavigate();

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

  const handleGoToInsertAdmin = () => {
    navigate(EUserRoutesEnum.USER_INSERT);
  };

  return {
    users: usersFiltered,
    loading,
    handleOnChangeSearch,
    handleGoToInsertAdmin,
  };
};
