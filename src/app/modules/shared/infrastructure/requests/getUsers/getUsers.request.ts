import { userAdapter } from '@/modules/shared/application/adapters/user/user.adapter';
import type { UserDto } from '@/modules/shared/application/dtos/user.dto';
import type { GetUsersRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { userSchema, type User } from '@/modules/shared/infrastructure/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_USERS_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/users`;

export const getUsersRequest: GetUsersRequest = async (): Promise<Array<User>> => {
  const usersResponseDto = await api.get<Array<UserDto>>(GET_USERS_REQUEST_URL).json();

  const usersResponse = usersResponseDto.map(userAdapter);

  return userSchema.array().parse(usersResponse);
};
