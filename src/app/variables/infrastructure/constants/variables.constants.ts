import { type Env } from '@/variables/infrastructure/schemas/env.schema';

import { getEnvs } from '../../application/adapters/env.adapter';

export const VARIABLES: Env = getEnvs();
