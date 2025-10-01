import {AUTH_RESPONSE_STORAGE_KEY} from '@/modules/shared/domain/constants/localStorageKeys.constants';
import type {AuthResponse} from '../../schemas/authResponse.schema';

export const getAuthTokenBL = (): string | null => {
  try {
    const stored = localStorage.getItem(AUTH_RESPONSE_STORAGE_KEY);
    if (!stored) return null;
    return (JSON.parse(stored) as AuthResponse).accessToken;
  } catch {
    localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
    return null;
  }
};
