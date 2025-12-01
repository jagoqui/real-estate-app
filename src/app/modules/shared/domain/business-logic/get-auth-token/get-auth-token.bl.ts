import { AUTH_RESPONSE_STORAGE_KEY } from '@/modules/shared/domain/constants/local-storage-keys.constants';
import type { AuthResponse } from '../../models/auth-response.model';

type GetAuthTokenBL = () => {
  accessToken: string;
  refreshToken: string;
} | null;

//TODO: Ajustar no se puede tener dependencia de infraestructura en dominio, en este caso el DOM (localStorage)

export const getAuthToken: GetAuthTokenBL = () => {
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
