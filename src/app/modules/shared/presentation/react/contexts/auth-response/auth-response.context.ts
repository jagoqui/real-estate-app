import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { createContext, useContext } from 'react';

interface AuthResponseContextValue {
  authResponse: Auth | null;
  setAuthResponse: React.Dispatch<React.SetStateAction<Auth | null>>;
  isAuthLoading: boolean;
  setIsAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggingOut: boolean;
  setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (userData: Auth['user']) => void;
}

export const AuthResponseContext = createContext<AuthResponseContextValue | undefined>(undefined);

export const useAuthResponseContext = (): AuthResponseContextValue => {
  const context = useContext(AuthResponseContext);

  if (context === undefined) {
    throw new Error('useAuthResponse must be used within an AuthResponseProvider.');
  }

  return context;
};
