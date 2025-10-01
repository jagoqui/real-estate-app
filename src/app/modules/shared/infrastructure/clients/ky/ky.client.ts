import {getAuthTokenBL} from '@/modules/shared/domain/businessLogic/getAuthTokenBL/getAuthTokenBL';
import ky from 'ky';

export const api = ky.create({
  timeout: false,
  hooks: {
    beforeRequest: [
      (request: Request): void => {
        const token = getAuthTokenBL();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
