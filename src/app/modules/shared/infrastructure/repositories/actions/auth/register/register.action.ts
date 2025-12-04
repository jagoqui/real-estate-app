import type { RegisterInput } from '@/modules/shared/domain/inputs/auth.input';
import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { AuthResponseDto } from '@/modules/shared/infrastructure/dtos/auth-response.dto';
import { mapAuthResponseToModel } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/auth-response.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const REGISTER_ACTION_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/register`;

export const registerAction = async (input: RegisterInput): Promise<Auth> => {
  const authResponseDto = await api.post<AuthResponseDto>(REGISTER_ACTION_URL, { json: input }).json();

  const validAuthResponseDto = authResponseSchema.parse(mapAuthResponseToModel(authResponseDto));

  return mapAuthResponseToModel(validAuthResponseDto);
};
