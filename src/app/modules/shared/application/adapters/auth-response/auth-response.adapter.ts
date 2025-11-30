import { tokenAdapter } from '@/modules/shared/application/adapters/token/token.adapter';
import type { AuthResponseDto } from '@/modules/shared/application/dtos/authResponse.dto';
import type { AuthResponse } from '@/modules/shared/domain/models/authResponse.model';
import { userAdapter } from '../user/user.adapter';

export const authResponseAdapter = (authResponse: AuthResponseDto): AuthResponse => ({
  ...tokenAdapter(authResponse),
  user: userAdapter(authResponse.user),
});
