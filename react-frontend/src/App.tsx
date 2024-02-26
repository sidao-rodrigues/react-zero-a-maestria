import type { Router as RemixRouter } from '@remix-run/router';
import { useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { categoryScreenRoutes } from './modules/category/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { orderScreenRoutes } from './modules/orders/routes';
import { productScreenRoutes } from './modules/product/routes';
import { URL_USER } from './shared/constants/urls';
import { EMethodsEnum } from './shared/enums/methods.enum';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useNotification } from './shared/hooks/useNotification';
import { useRequests } from './shared/hooks/useRequest';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...productScreenRoutes,
  ...categoryScreenRoutes,
  ...firstScreenRoutes,
  ...orderScreenRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();

    if (token) {
      request(URL_USER, EMethodsEnum.GET, setUser);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;

//figma
//https://figma.com/file/aIrW6zg90I0Kknq3lfdm33/Untitled?type=design&node-id=1-12&mode=design&t=tu%3C/LoginScreen%3EpA0LkFIomFhixb-0
