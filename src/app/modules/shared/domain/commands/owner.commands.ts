interface OwnerCommonProps {
  userId: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  birthday?: string;
}

export interface CreateOwnerCommand extends OwnerCommonProps {
  photoFile?: File | null;
}

export interface UpdateOwnerCommand extends Partial<OwnerCommonProps> {
  id: string;
  photoFile?: File | null;
}
