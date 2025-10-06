import { userAdapter } from '@/modules/shared/application/adapters/user/user.adapter';
import type { UserDto } from '@/modules/shared/application/dtos/user.dto';
import { createUserFormDataUseCase } from '@/modules/shared/application/useCases/createUserFormData/createUserFormData.uc';
import type { UpdateUserRequest } from '@/modules/shared/domain/contracts/userRequests.contract';
import { userSchema, type User } from '@/modules/shared/domain/schemas/user.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const UPDATE_USER_REQUEST_URL = (userId: string): string => `${VARIABLES.VITE_API_BASE_URL}/users/${userId}`;

export const updateUserRequest: UpdateUserRequest = async (args): Promise<User> => {
  const body = createUserFormDataUseCase(args);

  const userResponseDto = await api.put<UserDto>(`${UPDATE_USER_REQUEST_URL(args.user.id)}`, { body }).json();

  const userResponse = userAdapter(userResponseDto);

  return userSchema.parse(userResponse);
};
