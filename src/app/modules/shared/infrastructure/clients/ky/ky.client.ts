import { getAuthTokenBL } from '@/modules/shared/domain/businessLogic/getAuthToken/getAuthToken.bl';
import ky from 'ky';

export const API_HEADERS = (token: string): HeadersInit => ({
  Authorization: `Bearer ${token}`,
});

export const api = ky.create({
  timeout: false,
  hooks: {
    beforeRequest: [
      (request: Request): void => {
        const { accessToken } = getAuthTokenBL() || {};
        if (accessToken) {
          const headers = API_HEADERS(accessToken);
          Object.entries(headers).forEach(([key, value]) => {
            request.headers.set(key, String(value));
          });
        }
      },
    ],
  },
});
