import type { Property } from '../models/property.model';
import type { PropertyFilters } from '../models/propertyFilters.model';
import type { CreatePropertyFormValues, UpdatePropertyFormValues } from '../models/propertyForm.model';
import type { PropertyStatutes } from '../models/propertyStatutes.model';
import type { PropertyTypes } from '../models/propertyTypes.model';

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
