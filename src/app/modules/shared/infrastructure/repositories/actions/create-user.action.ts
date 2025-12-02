import type { CreateUserInput } from '@/modules/shared/domain/inputs/create-user.input';
import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '../../constants/user-endpoints.constants';
import type { UserResponseDto } from '../../dtos/user.dto';
import { mapCreateUserToPayloadDto } from '../../mappers/create-user/create-user.mapper';
import { mapUserResponseToModel } from '../../mappers/user/user.mapper';
import { userResponseSchema } from '../../schemas/user-response.schema';

export const createUserAction = async (input: CreateUserInput): Promise<User> => {
  const payload = mapCreateUserToPayloadDto(input);

  const userResponse = await api.post<UserResponseDto>(USER_ENDPOINTS.ROOT, { json: payload }).json();

  const validUserResponse = userResponseSchema.parse(userResponse);

  return mapUserResponseToModel(validUserResponse);
};
