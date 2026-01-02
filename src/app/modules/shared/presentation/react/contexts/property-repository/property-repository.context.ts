import type { PropertyRepository } from '@/modules/shared/domain/repositories/property.repository';
import { createContext, useContext } from 'react';

export const PropertyRepositoryContext = createContext<PropertyRepository | null>(null);

export const usePropertyRepositoryContext = (): PropertyRepository => {
  const context = useContext(PropertyRepositoryContext);
  if (!context) {
    throw new Error('usePropertyRepository debe ser usado dentro de un PropertyRepositoryProvider');
  }
  return context;
};
