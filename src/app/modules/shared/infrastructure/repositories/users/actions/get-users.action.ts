import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import type { UserResponseDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapUserResponseToModel } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userResponseSchema } from '@/modules/shared/infrastructure/schemas/user-response.schema';

export const getUsersAction = async (): Promise<Array<User>> => {
  const usersResponse = await api.get<Array<UserResponseDto>>(USER_ENDPOINTS.ROOT).json();

  const validUsersResponse = userResponseSchema.array().parse(usersResponse);

  return validUsersResponse.map(mapUserResponseToModel);
};
