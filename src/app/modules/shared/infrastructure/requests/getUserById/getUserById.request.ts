import { userAdapter } from '@/modules/shared/application/adapters/user/user.adapter';
import type { UserDto } from '@/modules/shared/application/dtos/user.dto';
import type { GetUserByIdRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { type User, userSchema } from '@/modules/shared/domain/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_USER_BY_ID_REQUEST_URL = (userId: string): string => `${VARIABLES.VITE_API_BASE_URL}/users/${userId}`;

export const getUserByIdRequest: GetUserByIdRequest = async (args): Promise<User> => {
  const userResponseDto = await api.get<UserDto>(GET_USER_BY_ID_REQUEST_URL(args.userId)).json();

  const userResponse = userAdapter(userResponseDto);

  return userSchema.parse(userResponse);
};
