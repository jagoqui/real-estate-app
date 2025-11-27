import type { CreateOwner, Owner } from '../../infrastructure/schemas/owner.schema';

export type CreateOwnerRequest = (args: CreateOwner) => Promise<Owner>;

interface GetOwnerByIdRequestArgs {
  id: Owner['id'];
}

export type GetOwnersRequest = () => Promise<Array<Owner>>;

export type GetOwnerByIdRequest = (args: GetOwnerByIdRequestArgs) => Promise<Owner>;

export type GetOwnerByUserIdRequest = (args: { userId: Owner['userId'] }) => Promise<Array<Owner>>;

export type GetPropertiesCountByOwnerIdRequest = (args: { ownerId: Owner['id'] }) => Promise<number>;

export type UpdateOwnerRequest = (args: Owner) => Promise<Owner>;

export type DeleteOwnerRequest = (args: { id: Owner['id'] }) => Promise<void>;

export interface OwnersRequests {
  createOwnerRequest: CreateOwnerRequest;
  getOwnerByIdRequest: GetOwnerByIdRequest;
  getOwnersRequest: GetOwnersRequest;
  getOwnerByUserIdRequest: GetOwnerByUserIdRequest;
  getPropertiesCountByOwnerIdRequest: GetPropertiesCountByOwnerIdRequest;
  updateOwnerRequest: UpdateOwnerRequest;
  deleteOwnerRequest: DeleteOwnerRequest;
}
