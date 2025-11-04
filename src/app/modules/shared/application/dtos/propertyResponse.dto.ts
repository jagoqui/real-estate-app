import type { CreatePropertyRequestDto } from './createPropertyRequest.dto';

export interface PropertyResponseDto extends Omit<CreatePropertyRequestDto, 'images'> {
  id: string;
  images: Array<string>;
  codeInternal?: string;
  createdAt: string;
  updatedAt: string;
}
