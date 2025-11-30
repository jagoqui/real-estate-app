import type { Token } from '@/modules/shared/domain/models/token.model';
import type { TokenDto } from '@/modules/shared/infrastructure/dtos/token.dto';

export const tokenAdapter = (token: TokenDto): Token => ({
  accessToken: token.accessToken,
  refreshToken: token.refreshToken,
});
