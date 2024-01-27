import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthType } from '../../modules/login/types/AuthType';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { ERROR_INVALID_LOGIN } from '../constants/errorsStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { connectionAPIPost } from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setNotification } = useGlobalContext();

  const getRequest = async (url: string) => {
    setLoading(true);
    return await axios({
      method: 'get',
      url,
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        alert('Erro');
      })
      .finally(() => setLoading(false));
  };

  const postRequest = async <T, S>(url: string, body: S): Promise<T | undefined> => {
    setLoading(true);
    return connectionAPIPost<T, S>(url, body)
      .then((result) => {
        setNotification('Login realizado com sucesso', 'success');
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      })
      .finally(() => setLoading(false));
  };

  const authRequest = async <S>(body: S): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType, S>(URL_AUTH, body)
      .then((result: AuthType) => {
        setAuthorizationToken(result.accessToken);
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch(() => setNotification(ERROR_INVALID_LOGIN, 'error'))
      .finally(() => setLoading(false));
  };

  return {
    loading,
    authRequest,
    getRequest,
    postRequest,
  };
};
