import type {AuthResponse} from '@/modules/shared/domain/schemas/authResponse.schema';
import type {AuthResponseDto} from '../../dtos/authResponse.dto';
import {tokenAdapter} from '../token/token.adapter';
import {userAdapter} from '../user/user.adapter';

export const authResponseAdapter = (authResponse: AuthResponseDto): AuthResponse => ({
  ...tokenAdapter(authResponse),
  user: userAdapter(authResponse.user),
});
