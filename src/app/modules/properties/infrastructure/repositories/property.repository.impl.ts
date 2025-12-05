import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import type { PropertyRepository } from '../../domain/repositories/property.repository';

export const propertyRepository: PropertyRepository = propertyRepositoryImpl;
