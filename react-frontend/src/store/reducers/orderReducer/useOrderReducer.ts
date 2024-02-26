import { useDispatch } from 'react-redux';

import { IOrderType } from '../../../shared/types/OrderType';
import { useAppSelector } from '../../hooks';
import { setOrderActions, setOrdersActions } from '.';

export const useOrderReducer = () => {
  const dispatch = useDispatch();
  const { orders, order } = useAppSelector((state) => state.orderReducer);

  const setOrders = (orders: IOrderType[]) => {
    dispatch(setOrdersActions(orders));
  };

  const setOrder = (order: IOrderType) => {
    dispatch(setOrderActions(order));
  };

  return {
    orders,
    order,
    setOrders,
    setOrder,
  };
};
