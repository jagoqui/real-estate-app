import {z} from 'zod';

const baseSchema = {
  VITE_API_BASE_URL: z.url().min(1, 'VITE_API_BASE_URL is required'),
  VITE_GOOGLE_CLIENT_ID: z.string().min(1, 'VITE_GOOGLE_CLIENT_ID is required'),
  VITE_SONAR_TOKEN: z.string().min(1, 'SONAR_TOKEN is required'),
  VITE_SONAR_HOST_URL: z.url(),
  VITE_SONAR_PROJECT_KEY: z.string().min(1, 'SONAR_PROJECT_KEY is required'),
};

export const envSchema = z.discriminatedUnion('VITE_NODE_ENV', [
  z.object({
    ...baseSchema,
    VITE_NODE_ENV: z.literal('development'),
    VITE_SNYK_ORG: z.uuid(),
  }),
  z.object({
    ...baseSchema,
    VITE_NODE_ENV: z.literal('test'),
    VITE_SNYK_ORG: z.uuid(),
  }),
  z.object({
    ...baseSchema,
    VITE_NODE_ENV: z.literal('sonar-local'),
    VITE_SNYK_ORG: z.uuid(),
  }),
  z.object({
    ...baseSchema,
    VITE_NODE_ENV: z.literal('production'),
  }),
]);

export type Env = Readonly<z.infer<typeof envSchema>>;
