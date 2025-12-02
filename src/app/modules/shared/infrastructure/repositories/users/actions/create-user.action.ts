import type { CreateUserInput } from '@/modules/shared/domain/inputs/create-user.input';
import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import type { UserResponseDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapCreateUserToPayloadDto } from '@/modules/shared/infrastructure/mappers/create-user/create-user.mapper';
import { mapUserResponseToModel } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userResponseSchema } from '@/modules/shared/infrastructure/schemas/user-response.schema';

export const createUserAction = async (input: CreateUserInput): Promise<User> => {
  const payload = mapCreateUserToPayloadDto(input);

  const userResponse = await api.post<UserResponseDto>(USER_ENDPOINTS.ROOT, { json: payload }).json();

  const validUserResponse = userResponseSchema.parse(userResponse);

  return mapUserResponseToModel(validUserResponse);
};
