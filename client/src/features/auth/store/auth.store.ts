import { create } from 'zustand';

import { APP_PATHS } from '@/shared/constants/api.constants';

interface IAuthState {
  isSignedIn: boolean;
  isSigningOut: boolean;

  setIsSignedIn: (isSignedIn: boolean) => void;
  startSignOut: () => void;
  finishSignOut: () => void;
}

const getInitialAuthStatus = () => !!localStorage.getItem('accessToken');

export const useAuthStore = create<IAuthState>((set) => ({
  isSignedIn: getInitialAuthStatus(),
  isSigningOut: false,

  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),

  startSignOut: () => set({ isSigningOut: true }),
  finishSignOut: () => set({ isSigningOut: false }),
}));

export const signOutCleanupGlobal = () => {
  localStorage.removeItem('accessToken');
  useAuthStore.getState().setIsSignedIn(false);

  window.location.href = APP_PATHS.HOME;
};
