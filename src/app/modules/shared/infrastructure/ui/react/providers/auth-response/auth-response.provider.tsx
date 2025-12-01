import { type ReactNode, useState } from 'react';
import { AuthResponseContext } from '../../contexts/auth-response/auth-response.context';
import { useAuthResponseStorage } from '../../hooks/use-auth-response-storage/use-auth-response-storage';

export const AuthResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authResponse, setAuthResponse } = useAuthResponseStorage();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <AuthResponseContext.Provider
      value={{
        authResponse,
        setAuthResponse,
        isAuthLoading,
        setIsAuthLoading,
        isLoggingOut,
        setIsLoggingOut,
      }}
    >
      {children}
    </AuthResponseContext.Provider>
  );
};
