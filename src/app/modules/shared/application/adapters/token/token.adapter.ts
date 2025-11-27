import type { TokenDto } from '@/modules/shared/application/dtos/token.dto';
import type { Token } from '@/modules/shared/infrastructure/schemas/token.schema';

export const tokenAdapter = (token: TokenDto): Token => ({
  accessToken: token.accessToken,
  refreshToken: token.refreshToken,
});
