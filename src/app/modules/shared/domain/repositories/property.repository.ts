import type {
  CreatePropertyInput,
  DeletePropertyInput,
  GetPropertiesByFilterInput,
  GetPropertiesByOwnerIdInput,
  GetPropertyByIdInput,
  UpdatePropertyInput,
  UpdatePropertyStatusInput,
} from '../inputs/property.input';
import type { PropertyStatus } from '../models/property-statutes.model';
import type { PropertyType } from '../models/property-types.model';
import type { Property } from '../models/property.model';

export interface PropertyRepository {
  create(input: CreatePropertyInput): Promise<Property>;
  getAll(): Promise<Array<Property>>;
  getById(input: GetPropertyByIdInput): Promise<Property>;
  getByOwnerId(input: GetPropertiesByOwnerIdInput): Promise<Array<Property>>;
  getTypes(): Promise<Array<PropertyType>>;
  getStatuses(): Promise<Array<PropertyStatus>>;
  getByFilter(input: GetPropertiesByFilterInput): Promise<Array<Property>>;
  update(input: UpdatePropertyInput): Promise<Property>;
  updateStatus(input: UpdatePropertyStatusInput): Promise<Property>;
  delete(input: DeletePropertyInput): Promise<void>;
}
