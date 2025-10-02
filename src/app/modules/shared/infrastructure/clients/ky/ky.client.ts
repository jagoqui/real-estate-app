import {getAuthTokenBL} from '@/modules/shared/domain/businessLogic/getAuthTokenBL/getAuthTokenBL';
import ky from 'ky';

export const api = ky.create({
  timeout: false,
  hooks: {
    beforeRequest: [
      (request: Request): void => {
        const {accessToken} = getAuthTokenBL() || {};
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
  },
});
