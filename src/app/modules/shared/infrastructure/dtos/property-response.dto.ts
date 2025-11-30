import type { CreatePropertyRequestDto } from './create-property-request.dto';

export interface PropertyResponseDto extends Omit<CreatePropertyRequestDto, 'images' | 'coverImage'> {
  id: string;
  images: Array<string>;
  coverImage: string;
  codeInternal?: string;
  createdAt: string;
  updatedAt: string;
}
