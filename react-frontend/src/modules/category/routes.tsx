import { RouteObject } from 'react-router-dom';

import Category from './';

export enum ECategoryRoutesEnum {
  CATEGORY = '/category',
  CATEGORY_INSERT = '/category/insert',
}

export const categoryScreenRoutes: RouteObject[] = [
  {
    path: ECategoryRoutesEnum.CATEGORY,
    element: <Category />,
  },
];
