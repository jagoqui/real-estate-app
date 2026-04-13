import { PropertyRepositoryProvider } from '@/modules/shared/presentation/react/providers/property-repository/property-repository.provider';
import { PropertiesManagementLayout } from '../../layouts/properties-management/properties-management.layout';

export const PropertiesManagementContainer = (): React.ReactElement => {
  return (
    <PropertyRepositoryProvider>
      <PropertiesManagementLayout />
    </PropertyRepositoryProvider>
  );
};
