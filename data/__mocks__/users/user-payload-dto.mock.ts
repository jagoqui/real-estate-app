import { USER_ROLES_DTO } from '@/modules/shared/infrastructure/dtos/role.dto';
import type { UserPayloadDto } from '@/modules/shared/infrastructure/dtos/user.dto';

export const USER_PAYLOAD_DTO_MOCK: UserPayloadDto = {
  id: '64b64c8f8f8f8f8f8f8f8f8f',
  email: 'user@example.com',
  name: 'John Doe',
  photoFile: undefined,
  role: USER_ROLES_DTO.OWNER,
  phoneNumber: '123-456-7890',
  bio: 'This is a sample bio',
};
