import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '../../clients/ky/ky.client';
import { USER_ENDPOINTS } from '../../constants/user-endpoints.constants';
import type { UserResponseDto } from '../../dtos/user.dto';
import { mapUserResponseToModel } from '../../mappers/user/user.mapper';
import { userResponseSchema } from '../../schemas/user-response.schema';

export const getUsersAction = async (): Promise<Array<User>> => {
  const usersResponse = await api.get<Array<UserResponseDto>>(USER_ENDPOINTS.ROOT).json();

  const validUsersResponse = userResponseSchema.array().parse(usersResponse);

  return validUsersResponse.map(mapUserResponseToModel);
};
