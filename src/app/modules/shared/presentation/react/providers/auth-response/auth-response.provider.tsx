import { type ReactNode, useState } from 'react';
import { AuthResponseContext } from '../../contexts/auth-response/auth-response.context';
import { useAuthResponseStorage } from '../../hooks/auth/use-auth-response-storage/use-auth-response-storage';

export const AuthResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authResponse, setAuthResponse } = useAuthResponseStorage();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const updateUser = (userData: NonNullable<typeof authResponse>['user']): void => {
    setAuthResponse(prev => {
      if (!prev) return null;
      const updatedUser = {
        ...prev.user,
        ...userData,
      };
      return {
        ...prev,
        user: updatedUser,
      };
    });
  };

  return (
    <AuthResponseContext.Provider
      value={{
        authResponse,
        setAuthResponse,
        isAuthLoading,
        setIsAuthLoading,
        isLoggingOut,
        setIsLoggingOut,
        updateUser,
      }}
    >
      {children}
    </AuthResponseContext.Provider>
  );
};
