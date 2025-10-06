import type { UpdateUser } from '@/modules/shared/domain/schemas/user.schema';
import { userDtoAdapter } from '../../adapters/userDto/userDto.adapter';

export const createUserFormDataUseCase = (args: { user: UpdateUser; photoFile?: File | null }): FormData => {
  const { user, photoFile } = args;

  const userDto = userDtoAdapter(user);

  const formData = new FormData();

  for (const key in userDto) {
    if (Object.prototype.hasOwnProperty.call(userDto, key)) {
      const value = userDto[key as keyof typeof userDto];

      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }
  }

  if (photoFile) {
    formData.append('photoFile', photoFile);
  }

  return formData;
};
