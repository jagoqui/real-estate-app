import type { PropertyRepository } from '@/modules/shared/domain/repositories/property.repository';

export const getPropertyUseCase = (repository: PropertyRepository) => {
  return async (): ReturnType<typeof repository.getAll> => {
    return await repository.getAll();
  };
};
