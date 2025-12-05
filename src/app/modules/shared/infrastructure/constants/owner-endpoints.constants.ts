import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

const BASE = `${VARIABLES.VITE_API_BASE_URL}/owners`;

export const OWNER_ENDPOINTS = {
  ROOT: BASE,
  BY_ID: (id: string): string => `${BASE}/${id}`,
  BY_USER_ID: (userId: string): string => `${BASE}/user/${userId}`,
  PROPERTIES_COUNT: (id: string): string => `${BASE}/${id}/properties-count`,
};
