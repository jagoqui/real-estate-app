import { AUTH_RESPONSE_STORAGE_KEY } from '@/modules/shared/domain/constants/localStorageKeys.constants';
import type { AuthResponse } from '@/modules/shared/infrastructure/schemas/authResponse.schema';
import { useEffect, useState } from 'react';

interface UseAuthResponseStorageReturn {
  authResponse: AuthResponse | null;
  setAuthResponse: React.Dispatch<React.SetStateAction<AuthResponse | null>>;
}

export const useAuthResponseStorage = (): UseAuthResponseStorageReturn => {
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_RESPONSE_STORAGE_KEY);
    if (stored) {
      try {
        setAuthResponse(JSON.parse(stored) as AuthResponse);
      } catch {
        localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (authResponse) {
      localStorage.setItem(AUTH_RESPONSE_STORAGE_KEY, JSON.stringify(authResponse));
      return;
    }
    localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
  }, [authResponse]);

  return { authResponse, setAuthResponse };
};
