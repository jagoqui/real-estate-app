import type { GetUserByIdRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { type User } from '@/modules/shared/domain/models/user.model';
import type { UserDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapUserToModel } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_USER_BY_ID_REQUEST_URL = (userId: string): string => `${VARIABLES.VITE_API_BASE_URL}/users/${userId}`;

export const getUserByIdRequest: GetUserByIdRequest = async (args): Promise<User> => {
  const userResponseDto = await api.get<UserDto>(GET_USER_BY_ID_REQUEST_URL(args.userId)).json();

  const userResponse = mapUserToModel(userResponseDto);

  return userSchema.parse(userResponse);
};
