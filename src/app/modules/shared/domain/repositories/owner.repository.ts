import type { CreateOwnerInput, UpdateOwnerInput } from '../inputs/owner.input';
import type { Owner } from '../models/owner.model';

export interface OwnerRepository {
  create(input: CreateOwnerInput): Promise<Owner>;
  getAll(): Promise<Array<Owner>>;
  getById(ownerId: string): Promise<Owner>;
  getByUserId(userId: string): Promise<Array<Owner>>;
  getPropertiesCountByOwnerId(ownerId: string): Promise<number>;
  update(input: UpdateOwnerInput): Promise<Owner>;
  delete(ownerId: string): Promise<void>;
}
