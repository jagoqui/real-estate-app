import type {CreateOwner, Owner} from '../schemas/owner.schema';

export type CreateOwnerRequest = (args: CreateOwner) => Promise<Owner>;

interface GetOwnerByIdRequestArgs {
  id: Owner['id'];
}

export type GetOwnerByIdRequest = (args: GetOwnerByIdRequestArgs) => Promise<Owner>;

export type UpdateOwnerRequest = (args: Owner) => Promise<Owner>;

export type DeleteOwnerRequest = (args: {id: Owner['id']}) => Promise<void>;

export interface OwnerRequests {
  createOwnerRequest: CreateOwnerRequest;
  getOwnerByIdRequest: GetOwnerByIdRequest;
  updateOwnerRequest: UpdateOwnerRequest;
  deleteOwnerRequest: DeleteOwnerRequest;
}
