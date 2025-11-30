import type { GetUsersRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { type User } from '@/modules/shared/domain/models/user.model';
import type { UserDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapUserToModel } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_USERS_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/users`;

export const getUsersRequest: GetUsersRequest = async (): Promise<Array<User>> => {
  const usersResponseDto = await api.get<Array<UserDto>>(GET_USERS_REQUEST_URL).json();

  const usersResponse = usersResponseDto.map(mapUserToModel);

  return userSchema.array().parse(usersResponse);
};
