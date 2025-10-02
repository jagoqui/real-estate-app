import {authResponseAdapter} from '@/modules/auth/application/adapters/auth-response/auth-response.adapter';
import type {AuthResponseDto} from '@/modules/auth/application/dtos/authResponse.dto';
import type {LoginWithEmailAndPasswordRequest} from '@/modules/shared/domain/contracts/authRequest.contract';

import {
  authResponseSchema,
  type AuthResponse,
} from '@/modules/shared/domain/schemas/authResponse.schema';
import {api} from '@/modules/shared/infrastructure/clients/ky/ky.client';
import {VARIABLES} from '@/variables/infrastructure/constants/variables.constants';

export const LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/email-login`;

export const loginWithEmailAndPasswordRequest: LoginWithEmailAndPasswordRequest = async (
  credentials
): Promise<AuthResponse> => {
  const authResponseDto = await api
    .post<AuthResponseDto>(LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST_URL, {json: credentials})
    .json();

  const authResponse = authResponseAdapter(authResponseDto);

  return authResponseSchema.parse(authResponse);
};
