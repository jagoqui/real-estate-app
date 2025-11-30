export interface Owner {
  id: string;
  userId: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
  birthday?: string;
  createdAt?: string;
}

export type CreateOwner = Omit<Owner, 'id' | 'createdAt'>;
