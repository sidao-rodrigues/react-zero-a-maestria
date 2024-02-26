import { RouteObject } from 'react-router-dom';

import Order from '.';

export enum EOrderRoutesEnum {
  ORDER = '/order',
}

export const orderScreenRoutes: RouteObject[] = [
  {
    path: EOrderRoutesEnum.ORDER,
    element: <Order />,
  },
];
