import type { RefreshTokenRequest } from '@/modules/shared/domain/contracts/authRequests.contract';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/authResponse.dto';
import { authResponseAdapter } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.adapter';

import { type AuthResponse } from '@/modules/shared/domain/models/authResponse.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/authResponse.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const REFRESH_TOKEN_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/refresh-token`;

export const refreshTokenRequest: RefreshTokenRequest = async ({ refreshToken }): Promise<AuthResponse> => {
  const authResponseDto = await api.post<AuthResponseDto>(REFRESH_TOKEN_REQUEST_URL, { json: { refreshToken } }).json();

  const authResponse = authResponseAdapter(authResponseDto);

  return authResponseSchema.parse(authResponse);
};
