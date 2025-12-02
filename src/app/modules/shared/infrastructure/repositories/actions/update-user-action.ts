import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import type { UpdateUserInput } from '@/modules/shared/domain/inputs/update-user.input';
import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '../../clients/ky/ky.client';
import { USER_ENDPOINTS } from '../../constants/user-endpoints.constants';
import type { UserResponseDto } from '../../dtos/user.dto';
import { mapUserResponseToModel, mapUserToPayloadDto } from '../../mappers/user/user.mapper';
import { userResponseSchema } from '../../schemas/user-response.schema';

export const updateUserAction = async (input: UpdateUserInput): Promise<User> => {
  const userDto = mapUserToPayloadDto(input);
  const body = objectToFormDataHelper(userDto);

  const userResponseDto = await api.put<UserResponseDto>(`${USER_ENDPOINTS.BY_ID(input.id)}`, { body }).json();

  const validUserResponseDto = userResponseSchema.parse(userResponseDto);

  return mapUserResponseToModel(validUserResponseDto);
};
