import { BlockedUnauthorizedAdminContainer } from '@/modules/shared/infrastructure/ui/react/containers/blocked-unauthorized-admin/blocked-unauthorized-admin.container';
import { AdminLayout } from '../../layouts/admin/admin.layout';

export const AdminContainer = (): React.ReactElement => (
  <BlockedUnauthorizedAdminContainer>
    <AdminLayout />
  </BlockedUnauthorizedAdminContainer>
);
