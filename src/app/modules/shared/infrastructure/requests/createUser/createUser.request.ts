import type { CreateUserRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { type User } from '@/modules/shared/domain/models/user.model';
import type { UserDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { createUserAdapter } from '@/modules/shared/infrastructure/mappers/createUserDto/createUserDto.adapter';
import { userAdapter } from '@/modules/shared/infrastructure/mappers/user/user.adapter';
import { userSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const CREATE_USER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/users`;

export const createUserRequest: CreateUserRequest = async (user): Promise<User> => {
  const userDto = createUserAdapter(user);

  const userResponseDto = await api.post<UserDto>(CREATE_USER_REQUEST_URL, { json: userDto }).json();
  const userResponse = userAdapter(userResponseDto);

  return userSchema.parse(userResponse);
};
