import { useAuth } from '@/app/providers/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

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
