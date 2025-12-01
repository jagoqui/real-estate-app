import type { LoginWithEmailAndPasswordRequest } from '@/modules/shared/domain/contracts/auth-requests.contract';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapAuthResponseToModel } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';

import { type AuthResponse } from '@/modules/shared/domain/models/auth-response.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/auth-response.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/email-login`;

export const loginWithEmailAndPasswordRequest: LoginWithEmailAndPasswordRequest = async (
  credentials
): Promise<AuthResponse> => {
  const authResponseDto = await api
    .post<AuthResponseDto>(LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST_URL, { json: credentials })
    .json();

  const authResponse = mapAuthResponseToModel(authResponseDto);

  return authResponseSchema.parse(authResponse);
};
