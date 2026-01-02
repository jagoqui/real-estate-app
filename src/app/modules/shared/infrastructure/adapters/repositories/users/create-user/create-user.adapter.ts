import type { CreateUserCommand } from '@/modules/shared/domain/commands/user.commands';
import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import type { UserResponseDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapCreateUserToPayloadDto } from '@/modules/shared/infrastructure/mappers/create-user/create-user.mapper';
import { mapUserResponseToModel } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userResponseSchema } from '@/modules/shared/infrastructure/schemas/user-response.schema';

export const createUserAdapter = async (args: CreateUserCommand): Promise<User> => {
  const payload = mapCreateUserToPayloadDto(args);

  const userResponse = await api.post<UserResponseDto>(USER_ENDPOINTS.ROOT, { json: payload }).json();

  const validUserResponse = userResponseSchema.parse(userResponse);

  return mapUserResponseToModel(validUserResponse);
};
