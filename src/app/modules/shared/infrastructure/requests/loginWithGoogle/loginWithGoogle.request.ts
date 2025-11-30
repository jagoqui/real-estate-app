import type { LoginWithGoogleRequest } from '@/modules/shared/domain/contracts/authRequests.contract';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapAuthResponseToModel } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';

import { type AuthResponse } from '@/modules/shared/domain/models/authResponse.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/authResponse.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const LOGIN_WITH_GOOGLE_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/google-login`;

export const loginWithGoogleRequest: LoginWithGoogleRequest = async ({ code }): Promise<AuthResponse> => {
  const authResponseDto = await api.post<AuthResponseDto>(LOGIN_WITH_GOOGLE_REQUEST_URL, { json: { code } }).json();

  const authResponse = mapAuthResponseToModel(authResponseDto);
  return authResponseSchema.parse(authResponse);
};
