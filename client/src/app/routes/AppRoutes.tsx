import { Route, Routes } from 'react-router-dom';

import { type IAppRoute } from '@/shared/interfaces/routes.interface';
import { routeConfig } from './routeConfig';

/**
 * Recursive component for render IAppRoute.
 * @param route Object of route IAppRoute.
 */
const renderRoute = (route: IAppRoute) => {
  const { path, element, children, id } = route;

  return (
    <Route key={id} path={path} element={element}>
      {children && children.map(renderRoute)}
    </Route>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {routeConfig.map(renderRoute)}
      {/* TODO: add 404 page */}
    </Routes>
  );
};
