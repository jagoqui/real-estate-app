import {api} from '@/app/modules/shared/infrastructure/clients/ky/ky.client';
import {VARIABLES} from '@/app/variables/infrastructure/constants/variables.constants';
import {ownerDtoAdapter} from '@/modules/owners/application/adapters/ownerDto/ownerDto.adapter';
import {type OwnerDto} from '@/modules/owners/application/dtos/owner.dto';
import type {GetOwnerByIdRequest} from '@/modules/owners/domain/contracts/ownerRequest.contract';
import {ownerSchema, type Owner} from '@/modules/owners/domain/schemas/owner.schema';

export const OWNER_BY_ID_REQUEST_URL = (id: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/owner/${id}`;

export const getOwnerByIdRequest: GetOwnerByIdRequest = async ({id}): Promise<Owner> => {
  const ownerDTO = await api.get<OwnerDto>(OWNER_BY_ID_REQUEST_URL(id)).json();

  const owner = ownerDtoAdapter(ownerDTO);

  return ownerSchema.parse(owner);
};
