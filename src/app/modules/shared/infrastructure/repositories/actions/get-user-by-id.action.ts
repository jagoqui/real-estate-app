import type { User } from '@/modules/shared/domain/models/user.model';
import { api } from '../../clients/ky/ky.client';
import { USER_ENDPOINTS } from '../../constants/user-endpoints.constants';
import type { UserResponseDto } from '../../dtos/user.dto';
import { mapUserResponseToModel } from '../../mappers/user/user.mapper';
import { userResponseSchema } from '../../schemas/user-response.schema';

export const getUserByIdAction = async (userId: string): Promise<User> => {
  const userResponseDto = await api.get<UserResponseDto>(USER_ENDPOINTS.BY_ID(userId)).json();

  const validUserResponseDto = userResponseSchema.parse(userResponseDto);

  return mapUserResponseToModel(validUserResponseDto);
};
