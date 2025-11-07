import type { PropertiesRequests } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/asyncFunctionValidationWrapper/asyncFunctionValidationWrapper.helper';
import { createPropertyRequest } from '@/modules/shared/infrastructure/requests/createProperty/createProperty.request';
import { deletePropertyRequest } from '@/modules/shared/infrastructure/requests/deleteProperty/deleteProperty.request';
import { getPropertiesRequest } from '@/modules/shared/infrastructure/requests/getProperties/getProperties.request';
import { getPropertiesByFilterRequest } from '@/modules/shared/infrastructure/requests/getPropertiesByFilter/getPropertiesByFilter.request';
import { getPropertiesByOwnerIdRequest } from '@/modules/shared/infrastructure/requests/getPropertiesByOwnerId/getPropertiesByOwnerId.request';
import { getPropertiesStatusesRequest } from '@/modules/shared/infrastructure/requests/getPropertiesStatuses/getPropertiesStatuses.request';
import { getPropertiesTypesRequest } from '@/modules/shared/infrastructure/requests/getPropertiesTypes/getPropertiesTypes.request';
import { getPropertyByIdRequest } from '@/modules/shared/infrastructure/requests/getPropertyById/getPropertyById.request';
import { updatePropertyRequest } from '@/modules/shared/infrastructure/requests/updateProperty/updateProperty.request';
import { updatePropertyStatusRequest } from '@/modules/shared/infrastructure/requests/updatePropertyStatus/updatePropertyStatus.request';

const PROPERTIES_REQUESTS: PropertiesRequests = {
  createPropertyRequest,
  getPropertiesRequest,
  getPropertyByIdRequest,
  getPropertiesByOwnerIdRequest,
  getPropertiesTypesRequest,
  getPropertiesStatusesRequest,
  getPropertiesByFilterRequest,
  updatePropertyRequest,
  updatePropertyStatusRequest,
  deletePropertyRequest,
};

export const usePropertiesRequests = (): PropertiesRequests => {
  const wrappedRequests: PropertiesRequests = {
    createPropertyRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.createPropertyRequest,
        args,
      }),
    getPropertiesRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesRequest,
      }),
    getPropertyByIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertyByIdRequest,
        args,
      }),
    getPropertiesByOwnerIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesByOwnerIdRequest,
        args,
      }),
    getPropertiesTypesRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesTypesRequest,
      }),
    getPropertiesStatusesRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesStatusesRequest,
      }),
    getPropertiesByFilterRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesByFilterRequest,
        args,
      }),
    updatePropertyRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.updatePropertyRequest,
        args,
      }),
    updatePropertyStatusRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.updatePropertyStatusRequest,
        args,
      }),
    deletePropertyRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.deletePropertyRequest,
        args,
      }),
  };

  return wrappedRequests;
};
