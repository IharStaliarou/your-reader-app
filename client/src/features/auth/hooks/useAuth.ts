import { useNavigate } from 'react-router-dom';

import { useSignOutMutation } from '@/features/auth/api/auth.api';

interface UseAuthResult {
  isAuthenticated: boolean;
  isSigningOut: boolean;
  signOut: () => void;
}

export const useAuth = (): UseAuthResult => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const { mutate, isPending } = useSignOutMutation();

  const signOut = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        navigate('/');
      },
    });
  };

  return {
    isAuthenticated,
    isSigningOut: isPending,
    signOut,
  };
};
