import type { LogoutRequest } from '@/modules/shared/domain/contracts/auth-requests.contract';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const LOGOUT_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/logout`;

export const logoutRequest: LogoutRequest = async (): Promise<void> => await api.post(LOGOUT_REQUEST_URL).json();
