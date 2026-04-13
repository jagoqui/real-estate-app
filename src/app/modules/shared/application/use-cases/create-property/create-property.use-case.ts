import type { CreatePropertyCommand } from '@/modules/shared/domain/commands/property.commands';
import type { PropertyRepository } from '@/modules/shared/domain/repositories/property.repository';

export const createPropertyUseCase = (repository: PropertyRepository) => {
  return async (command: CreatePropertyCommand): ReturnType<typeof repository.create> => {
    return await repository.create(command);
  };
};
