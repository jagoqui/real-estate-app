const BASE_PATH = '/real-estate-app';

export const PATHNAME_ROUTES = {
  INDEX: '/',
  HOME: BASE_PATH,
  AUTH: `${BASE_PATH}/auth`,
  LOGIN: `${BASE_PATH}/auth/login`,
  REGISTER: `${BASE_PATH}/auth/register`,
  PROPERTIES: `${BASE_PATH}/properties`,
  PROPERTY_DETAILS: `${BASE_PATH}/properties/:propertyId`,
  AGENTS: `${BASE_PATH}/agents`,
  BLOG: `${BASE_PATH}/blog`,
  CALCULATOR: `${BASE_PATH}/calculator`,
  FAVORITES: `${BASE_PATH}/favorites`,
  CONTACT: `${BASE_PATH}/contact`,
  ADMIN: `${BASE_PATH}/admin`,
  ADMIN_DASHBOARD: `${BASE_PATH}/admin/dashboard`,
  ADMIN_PROPERTIES: `${BASE_PATH}/admin/properties`,
  ADMIN_OWNERS: `${BASE_PATH}/admin/owners`,
  ADMIN_ANALYTICS: `${BASE_PATH}/admin/analytics`,
  ADMIN_LOGS: `${BASE_PATH}/admin/logs`,
} as const satisfies Record<string, string>;
