import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { tokenStorageRepositoryImpl } from '@/modules/shared/infrastructure/storage/token/token-storage.repository.impl';
import { useEffect, useState } from 'react';

interface UseAuthResponseStorageReturn {
  authResponse: Auth | null;
  setAuthResponse: React.Dispatch<React.SetStateAction<Auth | null>>;
}

export const useAuthResponseStorage = (): UseAuthResponseStorageReturn => {
  const [authResponse, setAuthResponse] = useState<Auth | null>(null);

  useEffect(() => {
    const stored = tokenStorageRepositoryImpl.get();
    if (stored) {
      try {
        setAuthResponse(stored);
      } catch {
        tokenStorageRepositoryImpl.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (authResponse) {
      tokenStorageRepositoryImpl.save(authResponse);
      return;
    }
    tokenStorageRepositoryImpl.remove();
  }, [authResponse]);

  return { authResponse, setAuthResponse };
};
