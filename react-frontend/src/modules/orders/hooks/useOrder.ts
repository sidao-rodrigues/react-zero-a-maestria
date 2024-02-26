import { useEffect } from 'react';

import { URL_ORDER_ALL } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useOrderReducer } from '../../../store/reducers/orderReducer/useOrderReducer';

export const useOrder = () => {
  const { request } = useRequests();
  const { orders, setOrders } = useOrderReducer();

  useEffect(() => {
    if (!orders || orders.length === 0) {
      request(URL_ORDER_ALL, EMethodsEnum.GET, setOrders);
    }
  }, []);

  return {
    orders,
  };
};
