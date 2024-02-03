import { RouteObject } from 'react-router-dom';

import ProductScreen from '.';
import ProductInsert from './screens/ProductInsert';

export enum EProductRoutesEnum {
  PRODUCT = '/product',
  PRODUCT_INSERT = '/product/inser',
}

export const productScreenRoutes: RouteObject[] = [
  {
    path: EProductRoutesEnum.PRODUCT,
    element: <ProductScreen />,
  },
  {
    path: EProductRoutesEnum.PRODUCT_INSERT,
    element: <ProductInsert />,
  },
];
