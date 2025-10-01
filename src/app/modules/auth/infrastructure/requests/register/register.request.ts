import {authResponseAdapter} from '@/modules/auth/application/adapters/auth-response/auth-response.adapter';
import type {AuthResponseDto} from '@/modules/auth/application/dtos/authResponse.dto';
import type {RegisterRequest} from '@/modules/auth/domain/contracts/authRequest.contract';

import {
  authResponseSchema,
  type AuthResponse,
} from '@/modules/shared/domain/schemas/authResponse.schema';
import {api} from '@/modules/shared/infrastructure/clients/ky/ky.client';
import {VARIABLES} from '@/variables/infrastructure/constants/variables.constants';

export const REGISTER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/register`;

export const registerRequest: RegisterRequest = async (user): Promise<AuthResponse> => {
  const authResponseDto = await api
    .post<AuthResponseDto>(REGISTER_REQUEST_URL, {json: user})
    .json();

  const authResponse = authResponseAdapter(authResponseDto);

  return authResponseSchema.parse(authResponse);
};
