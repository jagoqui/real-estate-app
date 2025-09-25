import {type Env} from '@/variables/domain/schemas/env.schema';

import {getEnvs} from '../../application/adapters/env.adapter';

export const VARIABLES: Env = getEnvs();
