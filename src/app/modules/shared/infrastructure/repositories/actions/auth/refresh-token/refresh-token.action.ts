import type { RefreshTokenInput } from '@/modules/shared/domain/inputs/auth.input';
import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapAuthResponseToModel } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/auth-response.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const REFRESH_TOKEN_ACTION_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/refresh-token`;

export const refreshTokenAction = async (input: RefreshTokenInput): Promise<Auth> => {
  const authResponseDto = await api.post<AuthResponseDto>(REFRESH_TOKEN_ACTION_URL, { json: input }).json();

  const validAuthResponseDto = authResponseSchema.parse(authResponseDto);

  return mapAuthResponseToModel(validAuthResponseDto);
};
