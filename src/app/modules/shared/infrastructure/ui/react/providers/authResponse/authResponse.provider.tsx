import type { ReactNode } from 'react';
import { AuthResponseContext } from '../../contexts/authResponse/authResponse.context';
import { useAuthResponseStorage } from '../../hooks/useAuthResponseStorage/useAuthResponseStorage';

export const AuthResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authResponse, setAuthResponse } = useAuthResponseStorage();

  return (
    <AuthResponseContext.Provider value={{ authResponse, setAuthResponse }}>{children}</AuthResponseContext.Provider>
  );
};
