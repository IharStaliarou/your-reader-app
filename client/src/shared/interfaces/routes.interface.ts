import { type RouteProps } from 'react-router-dom';

interface IAppRouteBase {
  id: string;
  path: string;
  element: React.ReactNode;
  isProtected?: boolean;
  children?: IAppRoute[];
}

export type IAppRoute = IAppRouteBase & Omit<RouteProps, 'children'>;
