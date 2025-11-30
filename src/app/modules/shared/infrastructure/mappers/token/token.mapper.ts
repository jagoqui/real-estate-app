import type { Token } from '@/modules/shared/domain/models/token.model';
import type { TokenDto } from '@/modules/shared/infrastructure/dtos/token.dto';

export const mapTokenToModel = (tokenDto: TokenDto): Token => ({
  accessToken: tokenDto.accessToken,
  refreshToken: tokenDto.refreshToken,
});
