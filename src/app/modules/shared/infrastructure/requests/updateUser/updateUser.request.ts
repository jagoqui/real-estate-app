import { userAdapter } from '@/modules/shared/application/adapters/user/user.adapter';
import { userDtoAdapter } from '@/modules/shared/application/adapters/userDto/userDto.adapter';
import type { UserDto } from '@/modules/shared/application/dtos/user.dto';
import type { UpdateUserRequest } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/dataToFormDataHelper/dataToFormDataHelper.helper';
import { type User } from '@/modules/shared/domain/models/user.model';
import { userSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const UPDATE_USER_REQUEST_URL = (userId: string): string => `${VARIABLES.VITE_API_BASE_URL}/users/${userId}`;

export const updateUserRequest: UpdateUserRequest = async (args): Promise<User> => {
  const userDto = userDtoAdapter(args.user);
  const body = objectToFormDataHelper({
    ...userDto,
    photoFile: args.photoFile,
  });

  const userResponseDto = await api.put<UserDto>(`${UPDATE_USER_REQUEST_URL(args.user.id)}`, { body }).json();

  const userResponse = userAdapter(userResponseDto);

  return userSchema.parse(userResponse);
};
