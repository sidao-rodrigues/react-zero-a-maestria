import { useDispatch } from 'react-redux';

import { IUserType } from '../../../modules/login/types/UserType';
import { useAppSelector } from '../../hooks';
import { setUsersAction } from '.';

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { users } = useAppSelector((state) => state.userReducer);

  const setUsers = (users: IUserType[]) => {
    dispatch(setUsersAction(users));
  };

  return {
    users,
    setUsers,
  };
};
