import axios from 'axios';
import { useState } from 'react';

import { connectionAPIPost } from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

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

  const postRequest = async <T>(url: string, body: T) => {
    setLoading(true);
    return await connectionAPIPost(url, body)
      .then((result) => {
        setNotification('Login realizado com sucesso', 'success');
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
};
