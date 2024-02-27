import { NavigateFunction, redirect } from 'react-router-dom';

import { ELoginRoutesEnum } from '../../../modules/login/routes';
import { IUserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER } from '../../constants/urls';
import { IUserTokenType } from '../../types/UsertTokenType';
import { connectionAPIGet } from './connectionAPI';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const getUserInfoByToken = (): IUserTokenType | undefined => {
  const token = getAuthorizationToken();
  const tokenSplited = token?.split('.');

  if (tokenSplited && tokenSplited.length > 1) {
    return JSON.parse(window.atob(tokenSplited[1]));
  }
};

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(ELoginRoutesEnum.LOGIN);
  }

  const user = await connectionAPIGet<IUserType>(URL_USER).catch(() => unsetAuthorizationToken());

  if (!user) {
    return redirect(ELoginRoutesEnum.LOGIN);
  }

  return null;
};

export const logout = (navigate: NavigateFunction): void => {
  unsetAuthorizationToken();
  navigate(ELoginRoutesEnum.LOGIN);
};
