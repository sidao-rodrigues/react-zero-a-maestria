import { RouteObject } from 'react-router-dom';

import Product from './screens/Product';
import ProductInsert from './screens/ProductInsert';

export enum EProductRoutesEnum {
  PRODUCT = '/product',
  PRODUCT_INSERT = '/product/insert',
  PRODUCT_EDIT = '/product/:productId',
}

export const productScreenRoutes: RouteObject[] = [
  {
    path: EProductRoutesEnum.PRODUCT,
    element: <Product />,
  },
  {
    path: EProductRoutesEnum.PRODUCT_INSERT,
    element: <ProductInsert />,
  },
  {
    path: EProductRoutesEnum.PRODUCT_EDIT,
    element: <ProductInsert />,
  },
];
