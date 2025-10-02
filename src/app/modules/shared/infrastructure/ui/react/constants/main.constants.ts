const BASE_PATH = '';

export const PATHNAME_ROUTES = {
  INDEX: '/',
  BASE_PATH,
  AUTH: `${BASE_PATH}/auth`,
  LOGIN: `${BASE_PATH}/auth/login`,
  REGISTER: `${BASE_PATH}/auth/register`,
  DASHBOARD: `${BASE_PATH}/dashboard`,
} as const satisfies Record<string, string>;
