import type { ReactNode } from 'react';
import { type RouteProps } from 'react-router-dom';

interface IAppRouteBase {
  id: string;
  path: string;
  element: ReactNode;
  isProtected?: boolean;
  children?: IAppRoute[];
}

export type IAppRoute = IAppRouteBase & Omit<RouteProps, 'children'>;
