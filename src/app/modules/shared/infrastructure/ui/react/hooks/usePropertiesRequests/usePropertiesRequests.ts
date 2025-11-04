import type { PropertiesRequests } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { getPropertiesStatusesRequest } from '@/modules/shared/infrastructure/requests/getPropertiesStatuses/getPropertiesStatuses.request';
import { getPropertiesTypesRequest } from '@/modules/shared/infrastructure/requests/getPropertiesTypes/getPropertiesTypes.request';

const PROPERTIES_REUQUESTS: PropertiesRequests = {
  getPropertiesStatusesRequest,
  getPropertiesTypesRequest,
};
