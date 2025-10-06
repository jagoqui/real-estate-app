import type { OwnersRequests } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/asyncFunctionValidationWrapper/asyncFunctionValidationWrapper.helper';
import { createOwnerRequest } from '@/modules/shared/infrastructure/requests/createOwner/createOwner.request';
import { deleteOwnerRequest } from '@/modules/shared/infrastructure/requests/deleteOwner/deleteOwner.request';
import { getOwnerByIdRequest } from '@/modules/shared/infrastructure/requests/getOwnerById/getOwnerById.request';
import { getOwnerByUserIdRequest } from '@/modules/shared/infrastructure/requests/getOwnerByUserId/getOwnerByUserId.request';
import { getOwnersRequest } from '@/modules/shared/infrastructure/requests/getOwners/getOwners.request';
import { getPropertiesCountByOwnerIdRequest } from '@/modules/shared/infrastructure/requests/getPropertiesCountByOwnerId/getPropertiesCountByOwnerId.request';
import { updateOwnerRequest } from '@/modules/shared/infrastructure/requests/updateOwner/updateOwner.request';

const OWNERS_REQUEST: OwnersRequests = {
  createOwnerRequest,
  getOwnerByIdRequest,
  getOwnersRequest,
  getOwnerByUserIdRequest,
  getPropertiesCountByOwnerIdRequest,
  updateOwnerRequest,
  deleteOwnerRequest,
};

export const useOwnersRequests = (): OwnersRequests => {
  const wrappedRequests: OwnersRequests = {
    createOwnerRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.createOwnerRequest,
        args,
      }),
    getOwnerByIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getOwnerByIdRequest,
        args,
      }),
    getOwnersRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getOwnersRequest,
      }),
    getOwnerByUserIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getOwnerByUserIdRequest,
        args,
      }),
    getPropertiesCountByOwnerIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getPropertiesCountByOwnerIdRequest,
        args,
      }),
    updateOwnerRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.updateOwnerRequest,
        args,
      }),
    deleteOwnerRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.deleteOwnerRequest,
        args,
      }),
  };

  return wrappedRequests;
};
