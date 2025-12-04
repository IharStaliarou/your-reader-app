import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store/auth.store';
import { APP_PATHS } from '@/shared/constants/api.constants';

interface IProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({
  redirectPath = APP_PATHS.AUTH.SIGN_IN,
}: IProtectedRouteProps) => {
  const { isSignedIn } = useAuthStore((state) => state);
  if (!isSignedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
