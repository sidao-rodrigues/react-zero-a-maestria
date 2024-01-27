import { RouteObject } from 'react-router-dom';

import ProductScreen from '.';

export enum EProductRoutesEnum {
  PRODUCT = '/product',
}

export const productScreenRoutes: RouteObject[] = [
  {
    path: EProductRoutesEnum.PRODUCT,
    element: <ProductScreen />,
  },
];
