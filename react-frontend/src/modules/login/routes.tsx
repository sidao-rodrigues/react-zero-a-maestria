import { RouteObject } from 'react-router-dom';

import LoginScreen from '.';

export enum ELoginRoutesEnum {
  LOGIN = '/login',
}

export const loginRoutes: RouteObject[] = [
  {
    path: ELoginRoutesEnum.LOGIN,
    element: <LoginScreen />,
  },
];
