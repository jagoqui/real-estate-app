import type { CreateOwnerCommand, UpdateOwnerCommand } from '../commands/owner.commands';
import type { Owner } from '../models/owner.model';

export interface OwnerRepository {
  create(args: CreateOwnerCommand): Promise<Owner>;
  getAll(): Promise<Array<Owner>>;
  getById(ownerId: string): Promise<Owner>;
  getByUserId(userId: string): Promise<Array<Owner>>;
  getPropertiesCountByOwnerId(ownerId: string): Promise<number>;
  update(args: UpdateOwnerCommand): Promise<Owner>;
  delete(ownerId: string): Promise<void>;
}
