import { RouteObject } from 'react-router-dom';

import Category from './';
import CategoryInsert from './screens/CategoryInsert';

export enum ECategoryRoutesEnum {
  CATEGORY = '/category',
  CATEGORY_INSERT = '/category/insert',
}

export const categoryScreenRoutes: RouteObject[] = [
  {
    path: ECategoryRoutesEnum.CATEGORY,
    element: <Category />,
  },
  {
    path: ECategoryRoutesEnum.CATEGORY_INSERT,
    element: <CategoryInsert />,
  },
];
