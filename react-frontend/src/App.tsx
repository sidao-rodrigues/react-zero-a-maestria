import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productScreenRoutes } from './modules/product/routes';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { useNotification } from './shared/hooks/useNotification';

function App() {
  const { contextHolder } = useNotification();
  const { user, setUser } = useGlobalContext();

  const routes: RouteObject[] = [...loginRoutes];
  const routesLoggedIn: RouteObject[] = [...productScreenRoutes, ...firstScreenRoutes].map(
    (route) => ({
      ...route,
      loader: () => verifyLoggedIn(setUser, user),
    }),
  );

  const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

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
