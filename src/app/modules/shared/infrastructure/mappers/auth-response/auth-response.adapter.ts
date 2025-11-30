import type { AuthResponse } from '@/modules/shared/domain/models/authResponse.model';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/authResponse.dto';
import { tokenAdapter } from '@/modules/shared/infrastructure/mappers/token/token.adapter';
import { userAdapter } from '../user/user.adapter';

export const authResponseAdapter = (authResponse: AuthResponseDto): AuthResponse => ({
  ...tokenAdapter(authResponse),
  user: userAdapter(authResponse.user),
});
