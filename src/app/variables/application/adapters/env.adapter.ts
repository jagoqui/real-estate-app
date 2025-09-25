import {removeNullishOrUndefinedProperties} from '@/modules/shared/domain/helpers/objects/objects.helper';
import z from 'zod';
import {envSchema, type Env} from '../../domain/schemas/env.schema';

export const getEnvs = (): Env => {
  const rawEnvs = pickEnvVars();

  const {success, data, error} = envSchema.safeParse(rawEnvs);

  if (!success) {
    console.error('Error parsing env variables: ', z.treeifyError(error));

    process.exit(1);
  }

  return data;
};

const pickEnvVars = (): Env =>
  removeNullishOrUndefinedProperties<Env>({
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    VITE_SONAR_TOKEN: import.meta.env.VITE_SONAR_TOKEN,
    VITE_SONAR_HOST_URL: import.meta.env.VITE_SONAR_HOST_URL,
    VITE_SONAR_PROJECT_KEY: import.meta.env.VITE_SONAR_PROJECT_KEY,
    VITE_SNYK_ORG:
      import.meta.env['NODE_ENV'] !== 'production' ? import.meta.env.VITE_SNYK_ORG : undefined,
    VITE_NODE_ENV: import.meta.env.NODE_ENV,
  });
