import { RouteObject } from 'react-router-dom';

import Order from '.';
import OrderDetail from './screen/OrderDatail';

export enum EOrderRoutesEnum {
  ORDER = '/order',
  ORDER_ID = '/order/:orderId',
}

export const orderScreenRoutes: RouteObject[] = [
  {
    path: EOrderRoutesEnum.ORDER,
    element: <Order />,
  },
  {
    path: EOrderRoutesEnum.ORDER_ID,
    element: <OrderDetail />,
  },
];
