
export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  jobTitle?: string;
  timezone?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
  settings: ProfileSettings;
  preferences: ProfilePreferences;
  security: SecuritySettings;
}

export interface ProfileSettings {
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}

export interface ProfilePreferences {
  defaultView: 'list' | 'grid';
  itemsPerPage: number;
  autoSave: boolean;
  showTutorials: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  jobTitle?: string;
  timezone?: string;
  language?: string;
}

export interface ProfileActivity {
  id: string;
  type: string;
  timestamp: string;
  details: Record<string, unknown>;
}

export interface ProfileStats {
  documentsCreated: number;
  collaborations: number;
  storageUsed: number;
  lastLogin: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  allowDirectMessages: boolean;
  showOnlineStatus: boolean;
  shareAnalytics: boolean;
}
