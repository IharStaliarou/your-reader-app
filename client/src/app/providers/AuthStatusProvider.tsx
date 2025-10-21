import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setOnLogoutCallback } from '@/features/auth/api/auth.api';

interface AuthStatusProviderProps {
  children: React.ReactNode;
}

const AuthStatusProvider: React.FC<AuthStatusProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      navigate('/');
    };

    setOnLogoutCallback(handleLogout);

    return () => setOnLogoutCallback(null); // TODO: resolve conflict
  }, [navigate]);

  return <>{children}</>;
};

export default AuthStatusProvider;
