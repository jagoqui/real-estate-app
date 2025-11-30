import type { AuthResponse } from '@/modules/shared/domain/models/authResponse.model';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapTokenToModel } from '@/modules/shared/infrastructure/mappers/token/token.mapper';
import { mapUserToModel } from '../user/user.mapper';

export const mapAuthResponseToModel = (authResponseDto: AuthResponseDto): AuthResponse => ({
  ...mapTokenToModel(authResponseDto),
  user: mapUserToModel(authResponseDto.user),
});
