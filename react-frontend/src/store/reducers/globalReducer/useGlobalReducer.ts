import { useDispatch } from 'react-redux';

import { IUserType } from '../../../modules/login/types/UserType';
import { ENotificationEnum } from '../../../shared/types/NotificationType';
import { useAppSelector } from '../../hooks';
import { setNotificationAction, setUserAction } from '.';

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user, notification } = useAppSelector((state) => state.globalReducer);

  const setNotification = (message: string, type: ENotificationEnum, description?: string) => {
    dispatch(
      setNotificationAction({
        message,
        type,
        description,
      }),
    );
  };

  const setUser = (user: IUserType) => {
    dispatch(setUserAction(user));
  };

  return {
    user,
    notification,
    setNotification,
    setUser,
  };
};
