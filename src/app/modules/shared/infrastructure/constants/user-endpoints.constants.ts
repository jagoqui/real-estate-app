import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

const BASE = `${VARIABLES.VITE_API_BASE_URL}/users`;

export const USER_ENDPOINTS = {
  ROOT: BASE,
  BY_ID: (id: string): string => `${BASE}/${id}`,
  CHANGE_PASSWORD: (id: string): string => `${BASE}/${id}/change-password`,
  WITHOUT_OWNER: `${BASE}/available/owners`,
};
