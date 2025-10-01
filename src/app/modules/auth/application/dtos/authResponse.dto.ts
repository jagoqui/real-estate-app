import type {UserDto} from '@/modules/auth/application/dtos/user.dto';
import type {TokenDto} from './token.dto';

export interface AuthResponseDto extends TokenDto {
  user: UserDto;
}
