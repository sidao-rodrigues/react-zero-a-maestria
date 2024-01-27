import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productScreenRoutes } from './modules/product/routes';
import { useNotification } from './shared/hooks/useNotification';

const router: RemixRouter = createBrowserRouter([
  ...firstScreenRoutes,
  ...loginRoutes,
  ...productScreenRoutes,
]);

function App() {
  const { contextHolder } = useNotification();
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
