import { useDispatch } from 'react-redux';

import { IOrderType } from '../../../shared/types/OrderType';
import { useAppSelector } from '../../hooks';
import { setOrdersActions } from '.';

export const useOrderReducer = () => {
  const dispatch = useDispatch();
  const { orders } = useAppSelector((state) => state.orderReducer);

  const setOrders = (orders: IOrderType[]) => {
    dispatch(setOrdersActions(orders));
  };

  return {
    orders,
    setOrders,
  };
};
