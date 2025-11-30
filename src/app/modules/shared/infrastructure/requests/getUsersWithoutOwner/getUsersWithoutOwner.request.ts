import type { GetUsersWithoutOwnerRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { type User } from '@/modules/shared/domain/models/user.model';
import type { UserDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { userAdapter } from '@/modules/shared/infrastructure/mappers/user/user.adapter';
import { userSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_USER_WITHOUT_OWNER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/users/without-owner`;

export const getUsersWithoutOwnerRequest: GetUsersWithoutOwnerRequest = async (): Promise<Array<User>> => {
  const usersResponseDto = await api.get<Array<UserDto>>(GET_USER_WITHOUT_OWNER_REQUEST_URL).json();

  const usersResponse = usersResponseDto.map(userAdapter);
  return userSchema.array().parse(usersResponse);
};
