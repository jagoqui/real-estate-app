import { BlockedUnAuthorizedAdminContainer } from '@/modules/shared/infrastructure/ui/react/containers/blockedUnAuthorizedAdminContainer/blockedUnAuthorizedAdminContainer';
import { AdminLayout } from '../../layouts/admin/admin.layout';

export const AdminContainer = (): React.ReactElement => (
  <BlockedUnAuthorizedAdminContainer>
    <AdminLayout />
  </BlockedUnAuthorizedAdminContainer>
);
