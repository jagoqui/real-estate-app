import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';
import type { UserResponseDto } from '@/modules/shared/infrastructure/dtos/user.dto';
import { mapUserResponseToModel } from '@/modules/shared/infrastructure/mappers/user/user.mapper';
import { userResponseSchema } from '@/modules/shared/infrastructure/schemas/user-response.schema';

export const getUserByIdAction = async (userId: string): Promise<User> => {
  const userResponseDto = await api.get<UserResponseDto>(USER_ENDPOINTS.BY_ID(userId)).json();

  const validUserResponseDto = userResponseSchema.parse(userResponseDto);

  return mapUserResponseToModel(validUserResponseDto);
};
