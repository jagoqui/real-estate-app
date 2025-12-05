import type { Auth } from '@/modules/shared/domain/models/auth.model';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapTokenToModel } from '@/modules/shared/infrastructure/mappers/token/token.mapper';
import { mapUserResponseToModel } from '../user/user.mapper';

export const mapAuthResponseToModel = (authResponseDto: AuthResponseDto): Auth => ({
  ...mapTokenToModel(authResponseDto),
  user: mapUserResponseToModel(authResponseDto.user),
});
