import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

const BASE = `${VARIABLES.VITE_API_BASE_URL}/auth`;

export const AUTH_ENDPOINTS = {
  LOGIN_WITH_EMAIL_AND_PASSWORD: `${BASE}/email-login`,
  REGISTER_WITH_EMAIL_AND_PASSWORD: `${BASE}/email-register`,
  REFRESH_TOKEN: `${BASE}/refresh-token`,
  LOGOUT: `${BASE}/logout`,
};
