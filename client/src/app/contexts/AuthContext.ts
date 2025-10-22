import { createContext } from 'react';

interface IAuthContextProps {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined
);
