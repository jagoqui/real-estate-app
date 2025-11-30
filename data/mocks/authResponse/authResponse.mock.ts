import type { AuthResponse } from '@/modules/shared/domain/models/authResponse.model';
import { TOKEN_MOCK } from '../token/token.mock';
import { USER_MOCK } from '../users/user.mock';

export const AUTH_RESPONSE_MOCK: AuthResponse = {
  ...TOKEN_MOCK,
  user: USER_MOCK,
};
