import type { RefreshTokenRequest } from '@/modules/shared/domain/contracts/auth-requests.contract';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapAuthResponseToModel } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';

import { type AuthResponse } from '@/modules/shared/domain/models/auth-response.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/auth-response.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const REFRESH_TOKEN_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/refresh-token`;

export const refreshTokenRequest: RefreshTokenRequest = async ({ refreshToken }): Promise<AuthResponse> => {
  const authResponseDto = await api.post<AuthResponseDto>(REFRESH_TOKEN_REQUEST_URL, { json: { refreshToken } }).json();

  const authResponse = mapAuthResponseToModel(authResponseDto);

  return authResponseSchema.parse(authResponse);
};
