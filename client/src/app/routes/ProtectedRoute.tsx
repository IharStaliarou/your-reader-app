import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store/auth.store';

interface IProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({
  redirectPath = '/auth',
}: IProtectedRouteProps) => {
  const { isSignedIn } = useAuthStore((state) => state);
  if (!isSignedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
