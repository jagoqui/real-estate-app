import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

const BASE = `${VARIABLES.VITE_API_BASE_URL}/properties`;

export const PROPERTY_ENDPOINTS = {
  ROOT: BASE,
  BY_ID: (id: string): string => `${BASE}/${id}`,
  BY_OWNER_ID: (ownerId: string): string => `${BASE}/owner/${ownerId}`,
};
