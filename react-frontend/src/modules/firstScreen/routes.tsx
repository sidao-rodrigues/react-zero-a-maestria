import { RouteObject } from 'react-router-dom';

import FirstScreen from '.';
import PageNotFound from './screens/PageNotFound';

export enum EFirstScreenRoutesEnum {
  FIRST_SCREEN = '/',
}

export const firstScreenRoutes: RouteObject[] = [
  {
    path: EFirstScreenRoutesEnum.FIRST_SCREEN,
    element: <FirstScreen />,
    errorElement: <PageNotFound />,
  },
];
