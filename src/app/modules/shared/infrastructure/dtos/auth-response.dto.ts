import type { TokenDto } from './token.dto';
import type { UserResponseDto } from './user.dto';

export interface AuthResponseDto extends TokenDto {
  user: UserResponseDto;
}
