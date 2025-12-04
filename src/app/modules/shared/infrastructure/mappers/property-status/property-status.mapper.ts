import { PROPERTY_STATUSES, type PropertyStatus } from '@/modules/shared/domain/models/property-statutes.model';
import { Logger } from '@/modules/shared/infrastructure/services/logger/logger.service';

const isValidStatus = (status: string): status is PropertyStatus => {
  return Object.values(PROPERTY_STATUSES).includes(status as PropertyStatus);
};

export const mapPropertyStatusToModel = (rawStatus: string): PropertyStatus => {
  if (isValidStatus(rawStatus)) {
    return rawStatus;
  }

  Logger.warn(`Unknown Property Status received: '${rawStatus}'`, {
    context: 'PropertyStatusMapper',
    fallback: PROPERTY_STATUSES.UNKNOWN,
  });

  return PROPERTY_STATUSES.UNKNOWN;
};
