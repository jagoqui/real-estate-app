import type {TokenDto} from './token.dto';
import type {UserDto} from './user.dto';

export interface AuthResponseDto extends TokenDto {
  user: UserDto;
}
