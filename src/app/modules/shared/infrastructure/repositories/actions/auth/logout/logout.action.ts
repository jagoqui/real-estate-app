import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const LOGOUT_ACTION_URL = `${VARIABLES.VITE_API_BASE_URL}/auth/logout`;

export const logoutAction = async (): Promise<void> => {
  await api.post(LOGOUT_ACTION_URL).json();
};
