import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { authTokenRepositoryImpl } from '@/modules/shared/infrastructure/repositories/auth-token.repository.impl';
import { useEffect, useState } from 'react';

interface UseAuthResponseStorageReturn {
  authResponse: Auth | null;
  setAuthResponse: React.Dispatch<React.SetStateAction<Auth | null>>;
}

export const useAuthResponseStorage = (): UseAuthResponseStorageReturn => {
  const [authResponse, setAuthResponse] = useState<Auth | null>(null);

  useEffect(() => {
    const stored = authTokenRepositoryImpl.get();
    if (stored) {
      try {
        setAuthResponse(stored);
      } catch {
        authTokenRepositoryImpl.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (authResponse) {
      authTokenRepositoryImpl.save(authResponse);
      return;
    }
    authTokenRepositoryImpl.remove();
  }, [authResponse]);

  return { authResponse, setAuthResponse };
};
