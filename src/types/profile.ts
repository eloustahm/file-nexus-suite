export interface Profile {
  id: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  role: string;
  preferences: ProfilePreferences;
  settings: ProfileSettings;
  security: ProfileSecurity;
  createdAt: string;
  updatedAt: string;
}

export interface ProfilePreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  display: {
    compactMode: boolean;
    showAvatars: boolean;
    timezone: string;
  };
}

export interface ProfileSettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  defaultView: string;
  autoSave: boolean;
  keyboardShortcuts: boolean;
}

export interface ProfileSecurity {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginHistory: Array<{
    timestamp: string;
    ip: string;
    device: string;
  }>;
}

export interface ProfileStats {
  totalFiles: number;
  totalStorage: number;
  activeProjects: number;
  recentActivity: number;
  lastLogin: string;
  storageUsage: {
    used: number;
    limit: number;
    percentage: number;
  };
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  preferences?: Partial<ProfilePreferences>;
  settings?: Partial<ProfileSettings>;
  security?: Partial<ProfileSecurity>;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  display: {
    density: 'comfortable' | 'compact';
    fontSize: 'small' | 'medium' | 'large';
    showThumbnails: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    loginNotifications: boolean;
  };
  integrations: {
    enabled: string[];
    defaultStorage: string;
  };
}

export interface ProfileUpdate {
  name?: string;
  email?: string;
  preferences?: Partial<UserPreferences>;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
