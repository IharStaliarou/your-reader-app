import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/providers/AuthProvider';

interface IProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({
  redirectPath = '/auth',
}: IProtectedRouteProps) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
