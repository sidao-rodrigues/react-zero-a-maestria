import { RouteObject } from 'react-router-dom';

import User from '.';
import UserInsert from './screens/UserInsert';

export enum EUserRoutesEnum {
  USER = '/user',
  USER_INSERT = '/user/insert',
}

export const userScreenRoutes: RouteObject[] = [
  {
    path: EUserRoutesEnum.USER,
    element: <User />,
  },
  {
    path: EUserRoutesEnum.USER_INSERT,
    element: <UserInsert />,
  },
];
