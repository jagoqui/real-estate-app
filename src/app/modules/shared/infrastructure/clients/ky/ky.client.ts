import { getAuthToken } from '@/modules/shared/domain/business-logic/get-auth-token/get-auth-token.bl';
import ky from 'ky';

const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;

export const API_HEADERS = (token: string): HeadersInit => ({
  Authorization: `Bearer ${token}`,
});

export const api = ky.create({
  timeout: false,
  hooks: {
    beforeRequest: [
      (request: Request): void => {
        const { accessToken } = getAuthToken() || {};
        if (accessToken) {
          const headers = API_HEADERS(accessToken);
          Object.entries(headers).forEach(([key, value]) => {
            request.headers.set(key, String(value));
          });
        }
      },
    ],
    afterResponse: [
      (_request, _options, response): Response => {
        if (response.status === HTTP_STATUS_UNAUTHORIZED || response.status === HTTP_STATUS_FORBIDDEN) {
          throw new Error(`${response.statusText}. Please try reloading the site.`);
        }
        return response;
      },
    ],
  },
});
