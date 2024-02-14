import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { EFirstScreenRoutesEnum } from '../../modules/firstScreen/routes';
import { IAuthType } from '../../modules/login/types/AuthType';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { ERROR_INVALID_LOGIN } from '../constants/errorsStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  TMethodType,
} from '../functions/connection/connectionAPI';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalReducer();

  const request = async <T, S = null>(
    url: string,
    method: TMethodType,
    saveGlobal?: (object: T) => void,
    body?: S | unknown,
  ): Promise<T | undefined> => {
    setLoading(true);
    return await ConnectionAPI.connect<T, S>(url, method, body)
      .then((result: T) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      })
      .finally(() => setLoading(false));
  };

  const authRequest = async <S>(navigate: NavigateFunction, body: S): Promise<void> => {
    setLoading(true);
    return await connectionAPIPost<IAuthType, S>(URL_AUTH, body)
      .then((result: IAuthType) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(EFirstScreenRoutesEnum.FIRST_SCREEN);
      })
      .catch(() => setNotification(ERROR_INVALID_LOGIN, 'error'))
      .finally(() => setLoading(false));
  };

  return {
    loading,
    authRequest,
    request,
  };
};
