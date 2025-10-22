import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { setOnSignOutCallback } from '@/features/auth/api/auth.api';
import { toast } from 'react-toastify';

interface IAuthContextProps {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState(
    !!localStorage.getItem('accessToken')
  );
  const navigate = useNavigate();

  const signIn = useCallback(() => {
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    setIsSignedIn(false);
    toast.info('You have successfully signed out.');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    setOnSignOutCallback(signOut);

    return () => setOnSignOutCallback(null); // TODO: resolve conflict
  }, [signOut]);

  const value = useMemo(
    () => ({ isSignedIn, signIn, signOut }),
    [isSignedIn, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
