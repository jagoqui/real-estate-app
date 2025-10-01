import type {Token} from '@/modules/shared/domain/schemas/token.schema';
import type {TokenDto} from '../../dtos/token.dto';

export const tokenAdapter = (token: TokenDto): Token => ({
  accessToken: token.accessToken,
  refreshToken: token.refreshToken,
});
