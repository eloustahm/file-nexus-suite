
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { settingsApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  phone?: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Integration {
  id: string;
  name: string;
  enabled: boolean;
  config?: any;
}

interface SettingsContextState extends BaseContextState {
  profile: Profile | null;
  integrations: Integration[];
}

interface SettingsContextActions extends BaseContextActions {
  fetchProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  changePassword: (passwordData: PasswordChangeData) => Promise<void>;
  fetchIntegrations: () => Promise<void>;
  updateIntegration: (provider: string, config: any) => Promise<void>;
}

interface SettingsContextValue extends SettingsContextState, SettingsContextActions {}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchProfile = async () => {
    await handleAsyncAction(
      async () => {
        const data = await settingsApi.getProfile() as Profile;
        setProfile(data);
      },
      setLoading,
      setError
    );
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    await handleAsyncAction(
      async () => {
        const updated = await settingsApi.updateProfile(profileData) as Profile;
        setProfile(updated);
      },
      setLoading,
      setError
    );
  };

  const changePassword = async (passwordData: PasswordChangeData) => {
    await handleAsyncAction(
      async () => {
        await settingsApi.updatePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        });
      },
      setLoading,
      setError
    );
  };

  const fetchIntegrations = async () => {
    await handleAsyncAction(
      async () => {
        const data = await settingsApi.getIntegrations() as Integration[];
        setIntegrations(data);
      },
      setLoading,
      setError
    );
  };

  const updateIntegration = async (provider: string, config: any) => {
    await handleAsyncAction(
      async () => {
        await settingsApi.updateIntegration(provider, config);
        await fetchIntegrations();
      },
      setLoading,
      setError
    );
  };

  const value: SettingsContextValue = {
    profile,
    integrations,
    loading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
    fetchIntegrations,
    updateIntegration,
    ...baseActions,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
