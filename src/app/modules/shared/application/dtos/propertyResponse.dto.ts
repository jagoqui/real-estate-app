import type { CreatePropertyRequestDto } from './createPropertyRequest.dto';

export interface PropertyResponseDto extends Omit<CreatePropertyRequestDto, 'images' | 'coverImage'> {
  id: string;
  images: Array<string>;
  coverImage: string;
  codeInternal?: string;
  createdAt: string;
  updatedAt: string;
}
