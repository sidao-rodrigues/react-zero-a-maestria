import { RouteObject } from 'react-router-dom';

import User from '.';

export enum EUserRoutesEnum {
  USER = '/user',
}

export const userScreenRoutes: RouteObject[] = [
  {
    path: EUserRoutesEnum.USER,
    element: <User />,
  },
];
