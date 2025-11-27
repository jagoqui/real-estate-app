import type { Property } from '../../infrastructure/schemas/property.schema';
import type { PropertyFilters } from '../../infrastructure/schemas/propertyFilters.schema';
import type {
  CreatePropertyFormValues,
  UpdatePropertyFormValues,
} from '../../infrastructure/schemas/propertyForm.schema';
import type { PropertyStatutes } from '../../infrastructure/schemas/propertyStatutes.schema';
import type { PropertyTypes } from '../../infrastructure/schemas/propertyTypes.schema';

export type CreatePropertyRequest = (args: CreatePropertyFormValues) => Promise<Property>;

export type GetPropertiesRequest = () => Promise<Array<Property>>;

export type GetPropertyByIdRequest = (args: { propertyId: string }) => Promise<Property>;

export type GetPropertiesByOwnerIdRequest = (args: { ownerId: string }) => Promise<Array<Property>>;

export type GetPropertiesTypesRequest = () => Promise<Array<PropertyTypes>>;

export type GetPropertiesStatusesRequest = () => Promise<Array<PropertyStatutes>>;

export type GetPropertiesByFilterRequest = (args: PropertyFilters) => Promise<Array<Property>>;

export type UpdatePropertyRequest = (args: { propertyId: string; data: UpdatePropertyFormValues }) => Promise<Property>;

export type UpdatePropertyStatusRequest = (args: {
  propertyId: string;
  status: Property['status'];
}) => Promise<Property>;

export type DeletePropertyRequest = (args: { propertyId: string }) => Promise<void>;

export interface PropertiesRequests {
  createPropertyRequest: CreatePropertyRequest;
  getPropertiesRequest: GetPropertiesRequest;
  getPropertyByIdRequest: GetPropertyByIdRequest;
  getPropertiesByOwnerIdRequest: GetPropertiesByOwnerIdRequest;
  getPropertiesTypesRequest: GetPropertiesTypesRequest;
  getPropertiesStatusesRequest: GetPropertiesStatusesRequest;
  getPropertiesByFilterRequest: GetPropertiesByFilterRequest;
  updatePropertyRequest: UpdatePropertyRequest;
  updatePropertyStatusRequest: UpdatePropertyStatusRequest;
  deletePropertyRequest: DeletePropertyRequest;
}
