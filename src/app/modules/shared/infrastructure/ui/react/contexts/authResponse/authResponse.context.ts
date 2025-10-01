import type {AuthResponse} from '@/modules/shared/domain/schemas/authResponse.schema';
import {createContext, useContext} from 'react';

interface AuthResponseContextValue {
  authResponse: AuthResponse | null;
  setAuthResponse: (res: AuthResponse | null) => void;
}

export const AuthResponseContext = createContext<AuthResponseContextValue | undefined>(undefined);

export const useAuthResponseContext = (): AuthResponseContextValue => {
  const context = useContext(AuthResponseContext);

  if (context === undefined) {
    throw new Error('useAuthResponse must be used within an AuthResponseProvider.');
  }

  return context;
};
