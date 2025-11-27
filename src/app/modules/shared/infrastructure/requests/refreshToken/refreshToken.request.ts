import { authResponseAdapter } from '@/modules/shared/application/adapters/auth-response/auth-response.adapter';
import type { AuthResponseDto } from '@/modules/shared/application/dtos/authResponse.dto';
import type { RefreshTokenRequest } from '@/modules/shared/domain/contracts/authRequests.contract';

import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { authResponseSchema, type AuthResponse } from '@/modules/shared/infrastructure/schemas/authResponse.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const REFRESH_TOKEN_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/refresh-token`;

export const refreshTokenRequest: RefreshTokenRequest = async ({ refreshToken }): Promise<AuthResponse> => {
  const authResponseDto = await api.post<AuthResponseDto>(REFRESH_TOKEN_REQUEST_URL, { json: { refreshToken } }).json();

  const authResponse = authResponseAdapter(authResponseDto);

  return authResponseSchema.parse(authResponse);
};
