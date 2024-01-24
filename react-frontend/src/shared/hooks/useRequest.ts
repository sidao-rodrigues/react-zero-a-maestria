import axios from 'axios';
import { useState } from 'react';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

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
    return await axios({
      method: 'post',
      url,
      data: body,
    })
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        alert('Erro');
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
};
