import type { Property } from '../schemas/property.schema';
import type { CreatePropertyFormValues } from '../schemas/propertyForm.schema';
import type { PropertyStatutes } from '../schemas/propertyStatutes.schema';
import type { PropertyTypes } from '../schemas/propertyTypes.schema';

export type CreatePropertyRequest = (args: CreatePropertyFormValues) => Promise<Property>;

export type GetPropertiesRequest = () => Promise<Array<Property>>;

export type GetPropertyByIdRequest = (args: { propertyId: string }) => Promise<Property>;

export type GetPropertiesByOwnerIdRequest = (args: { ownerId: string }) => Promise<Array<Property>>;

export type GetPropertiesTypesRequest = () => Promise<Array<PropertyTypes>>;

export type GetPropertiesStatusesRequest = () => Promise<Array<PropertyStatutes>>;

export type GetPropertiesByFilterRequest = (args: {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  type?: string;
}) => Promise<Array<Property>>;

export type UpdatePropertyRequest = (args: { propertyId: string; data: CreatePropertyFormValues }) => Promise<Property>;

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
