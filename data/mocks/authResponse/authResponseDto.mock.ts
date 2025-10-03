import type {AuthResponseDto} from '@/modules/shared/application/dtos/authResponse.dto';
import {TOKEN_DTO_MOCK} from '../token/tokenDto.mock';
import {USER_DTO_MOCK} from '../users/userDto.mock';

export const AUTH_RESPONSE_DTO_MOCK: AuthResponseDto = {
  ...TOKEN_DTO_MOCK,
  user: USER_DTO_MOCK,
};
