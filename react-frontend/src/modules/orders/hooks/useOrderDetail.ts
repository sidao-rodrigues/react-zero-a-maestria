import { useEffect } from 'react';

import { URL_ORDER_ID } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useOrderReducer } from '../../../store/reducers/orderReducer/useOrderReducer';

export const useOrderDetail = (orderId?: string) => {
  const { order, setOrder } = useOrderReducer();
  const { request, loading } = useRequests();

  useEffect(() => {
    request(`${URL_ORDER_ID.replace('{orderId}', orderId || '')}`, EMethodsEnum.GET, setOrder);
  }, []);

  return {
    order,
    loading,
  };
};
