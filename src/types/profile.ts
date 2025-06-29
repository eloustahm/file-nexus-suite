
export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  timezone?: string;
  language?: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy?: {
    profileVisibility: 'public' | 'private' | 'team';
    showEmail: boolean;
    showPhone: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  timezone?: string;
  language?: string;
  notifications?: Partial<Profile['notifications']>;
  privacy?: Partial<Profile['privacy']>;
}
