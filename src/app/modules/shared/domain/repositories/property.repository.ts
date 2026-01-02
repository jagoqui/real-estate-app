import type {
  CreatePropertyCommand,
  DeletePropertyCommand,
  GetPropertiesByOwnerIdCommand,
  GetPropertyByIdCommand,
  UpdatePropertyCommand,
  UpdatePropertyStatusCommand,
} from '../commands/property.commands';
import type { PropertyStatus } from '../models/property-statutes.model';
import type { PropertyType } from '../models/property-types.model';
import type { Property } from '../models/property.model';
import type { GetPropertiesByFilterQuery } from '../queries/property.queries';

export interface PropertyRepository {
  create(args: CreatePropertyCommand): Promise<Property>;
  getAll(): Promise<Array<Property>>;
  getById(args: GetPropertyByIdCommand): Promise<Property>;
  getByOwnerId(args: GetPropertiesByOwnerIdCommand): Promise<Array<Property>>;
  getTypes(): Promise<Array<PropertyType>>;
  getStatuses(): Promise<Array<PropertyStatus>>;
  getByFilter(args: GetPropertiesByFilterQuery): Promise<Array<Property>>;
  update(args: UpdatePropertyCommand): Promise<Property>;
  updateStatus(args: UpdatePropertyStatusCommand): Promise<Property>;
  delete(args: DeletePropertyCommand): Promise<void>;
}
