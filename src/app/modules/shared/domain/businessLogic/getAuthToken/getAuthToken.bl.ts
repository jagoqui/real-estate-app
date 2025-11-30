import { AUTH_RESPONSE_STORAGE_KEY } from '@/modules/shared/domain/constants/localStorageKeys.constants';
import type { AuthResponse } from '../../models/authResponse.model';

type GetAuthTokenBL = () => {
  accessToken: string;
  refreshToken: string;
} | null;

export const getAuthTokenBL: GetAuthTokenBL = () => {
  try {
    const stored = localStorage.getItem(AUTH_RESPONSE_STORAGE_KEY);
    if (!stored) return null;

    const { accessToken, refreshToken } = JSON.parse(stored) as AuthResponse;

    if (!accessToken || !refreshToken) return null;

    return { accessToken, refreshToken };
  } catch {
    localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
    return null;
  }
};
