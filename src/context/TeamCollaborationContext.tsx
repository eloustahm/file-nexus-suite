import React, { createContext, useContext, useState, ReactNode } from 'react';
import { teamApi, TeamMember, InviteMemberData } from '@/services/team';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface TeamSettings {
  teamName: string;
  teamDescription: string;
  visibility: 'private' | 'public';
  allowInvites: boolean;
  requireApproval: boolean;
  enableNotifications: boolean;
  defaultRole: 'viewer' | 'editor';
  maxMembers: number;
  enableTwoFactor: boolean;
  sessionTimeout: number;
}

interface TeamCollaborationContextState extends BaseContextState {
  members: TeamMember[];
  settings: TeamSettings;
}

interface TeamCollaborationContextActions extends BaseContextActions {
  fetchMembers: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  inviteMember: (data: InviteMemberData) => Promise<void>;
  updateMemberRole: (memberId: string, role: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  updateSettings: (settings: Partial<TeamSettings>) => Promise<void>;
}

interface TeamCollaborationContextValue extends TeamCollaborationContextState, TeamCollaborationContextActions {}

const TeamCollaborationContext = createContext<TeamCollaborationContextValue | undefined>(undefined);

export const TeamCollaborationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [settings, setSettings] = useState<TeamSettings>({
    teamName: "Development Team",
    teamDescription: "Main development team for the project",
    visibility: 'private',
    allowInvites: true,
    requireApproval: true,
    enableNotifications: true,
    defaultRole: 'viewer',
    maxMembers: 50,
    enableTwoFactor: false,
    sessionTimeout: 24
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchMembers = async () => {
    await handleAsyncAction(
      async () => {
        const data = await teamApi.getMembers();
        setMembers(data);
      },
      setLoading,
      setError
    );
  };

  const fetchSettings = async () => {
    await handleAsyncAction(
      async () => {
        // For now, keep default settings since API doesn't have settings endpoint
      },
      setLoading,
      setError
    );
  };

  const inviteMember = async (data: InviteMemberData) => {
    await handleAsyncAction(
      async () => {
        await teamApi.inviteMember(data);
        await fetchMembers();
      },
      setLoading,
      setError
    );
  };

  const updateMemberRole = async (memberId: string, role: string) => {
    await handleAsyncAction(
      async () => {
        const updatedMember = await teamApi.updateMemberRole(memberId, role);
        setMembers(prev => prev.map(member => member.id === memberId ? updatedMember : member));
      },
      setLoading,
      setError
    );
  };

  const removeMember = async (memberId: string) => {
    await handleAsyncAction(
      async () => {
        await teamApi.removeMember(memberId);
        setMembers(prev => prev.filter(member => member.id !== memberId));
      },
      setLoading,
      setError
    );
  };

  const updateSettings = async (newSettings: Partial<TeamSettings>) => {
    await handleAsyncAction(
      async () => {
        setSettings(prev => ({ ...prev, ...newSettings }));
      },
      setLoading,
      setError
    );
  };

  const value: TeamCollaborationContextValue = {
    members,
    settings,
    loading,
    error,
    fetchMembers,
    fetchSettings,
    inviteMember,
    updateMemberRole,
    removeMember,
    updateSettings,
    ...baseActions,
  };

  return <TeamCollaborationContext.Provider value={value}>{children}</TeamCollaborationContext.Provider>;
};

export const useTeamCollaboration = () => {
  const context = useContext(TeamCollaborationContext);
  if (context === undefined) {
    throw new Error('useTeamCollaboration must be used within a TeamCollaborationProvider');
  }
  return context;
};
