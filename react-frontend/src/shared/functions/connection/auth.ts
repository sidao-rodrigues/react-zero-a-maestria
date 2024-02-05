import { ELoginRoutesEnum } from '../../../modules/login/routes';
import { IUserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER } from '../../constants/urls';
import { connectionAPIGet } from './connectionAPI';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();

  if (!token) {
    location.href = ELoginRoutesEnum.LOGIN;
  }

  await connectionAPIGet<IUserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
    location.href = ELoginRoutesEnum.LOGIN;
  });
  return null;
};

export const logout = (): void => {
  unsetAuthorizationToken();
  location.href = ELoginRoutesEnum.LOGIN;
};
