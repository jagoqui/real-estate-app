import type { UpdateUserCommand } from '@/modules/shared/domain/commands/user.commands';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import type { UserResponseDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapUserResponseToModel, mapUserToPayloadDto } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userResponseSchema } from '@/modules/shared/infrastructure/schemas/user-response.schema';

export const updateUserAdapter = async (args: UpdateUserCommand): Promise<User> => {
  const userDto = mapUserToPayloadDto(args);
  const body = objectToFormDataHelper(userDto);

  const userResponseDto = await api.put<UserResponseDto>(`${USER_ENDPOINTS.BY_ID(args.id)}`, { body }).json();

  const validUserResponseDto = userResponseSchema.parse(userResponseDto);

  return mapUserResponseToModel(validUserResponseDto);
};
