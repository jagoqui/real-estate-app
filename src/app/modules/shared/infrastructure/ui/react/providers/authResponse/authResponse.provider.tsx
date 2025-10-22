import { type ReactNode, useState } from 'react';
import { AuthResponseContext } from '../../contexts/authResponse/authResponse.context';
import { useAuthResponseStorage } from '../../hooks/useAuthResponseStorage/useAuthResponseStorage';

export const AuthResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authResponse, setAuthResponse } = useAuthResponseStorage();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  return (
    <AuthResponseContext.Provider value={{ authResponse, setAuthResponse, isAuthLoading, setIsAuthLoading }}>
      {children}
    </AuthResponseContext.Provider>
  );
};
