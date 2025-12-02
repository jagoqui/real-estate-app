interface OwnerCommonProps {
  userId: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  birthday?: string;
}

export interface CreateOwnerInput extends OwnerCommonProps {
  photoFile?: File | null;
}

export interface UpdateOwnerInput extends Partial<OwnerCommonProps> {
  id: string;
  photoFile?: File | null;
}
