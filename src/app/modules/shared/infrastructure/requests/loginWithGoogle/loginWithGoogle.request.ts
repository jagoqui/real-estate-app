import { authResponseAdapter } from '@/modules/shared/application/adapters/auth-response/auth-response.adapter';
import type { AuthResponseDto } from '@/modules/shared/application/dtos/authResponse.dto';
import type { LoginWithGoogleRequest } from '@/modules/shared/domain/contracts/authRequests.contract';

import { authResponseSchema, type AuthResponse } from '@/modules/shared/domain/schemas/authResponse.schema';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const LOGIN_WITH_GOOGLE_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/google-login`;

export const loginWithGoogleRequest: LoginWithGoogleRequest = async ({ code }): Promise<AuthResponse> => {
  const authResponseDto = await api.post<AuthResponseDto>(LOGIN_WITH_GOOGLE_REQUEST_URL, { json: { code } }).json();

  const authResponse = authResponseAdapter(authResponseDto);
  return authResponseSchema.parse(authResponse);
};
