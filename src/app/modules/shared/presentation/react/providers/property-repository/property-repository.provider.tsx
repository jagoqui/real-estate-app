import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/properties/property.repository.impl';
import { type JSX, type ReactNode } from 'react';
import { PropertyRepositoryContext } from '../../contexts/property-repository/property-repository.context';

interface Props {
  children: ReactNode;
}

export const PropertyRepositoryProvider = ({ children }: Props): JSX.Element => {
  return (
    <PropertyRepositoryContext.Provider value={propertyRepositoryImpl}>{children}</PropertyRepositoryContext.Provider>
  );
};
