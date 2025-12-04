import type { Amenity } from '@/modules/shared/domain/models/amenity.model';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { AmenityResponseDto } from '../../dtos/amenity-response.dto';
import { Logger } from '../../services/logger/logger.service';

const FALLBACK_ICON: LucideIconName = 'circle-help';

const isValidIcon = (icon: string): icon is LucideIconName => {
  return icon in dynamicIconImports;
};

export const mapAmenityToModel = (dto: AmenityResponseDto): Amenity => {
  let validIcon: LucideIconName;

  if (isValidIcon(dto.icon)) {
    validIcon = dto.icon;
  } else {
    Logger.warn(`Invalid Icon: Received '${dto.icon}' which is not in Lucide library.`, {
      context: 'AmenityMapper',
      amenityName: dto.name,
      fallback: FALLBACK_ICON,
    });

    validIcon = FALLBACK_ICON;
  }

  return {
    name: dto.name,
    icon: validIcon,
  };
};
