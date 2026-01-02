import type { OwnerRepository } from '@/modules/shared/domain/ports/repositories/owner.repository';
import { createOwnerAdapter } from './create-owner/create-owner.adapter';
import { deleteOwnerAdapter } from './delete-owner/delete-owner.adapter';
import { getOwnerByIdAdapter } from './get-owner-by-id/get-owner-by-id.adapter';
import { getOwnerByUserIdAdapter } from './get-owner-by-user-id/get-owner-by-user-id.adapter';
import { getOwnersAdapter } from './get-owners/get-owners.adapter';
import { getPropertiesCountByOwnerIdAdapter } from './get-properties-count-by-owner-id/get-properties-count-by-owner-id.adapter';
import { updateOwnerAdapter } from './update-owner/update-owner.adapter';

export const ownerRepositoryImpl: OwnerRepository = {
  create: createOwnerAdapter,
  getAll: getOwnersAdapter,
  getById: getOwnerByIdAdapter,
  getByUserId: getOwnerByUserIdAdapter,
  getPropertiesCountByOwnerId: getPropertiesCountByOwnerIdAdapter,
  update: updateOwnerAdapter,
  delete: deleteOwnerAdapter,
};
