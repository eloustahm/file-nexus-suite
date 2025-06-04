
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { teamApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'pending' | 'suspended';
}

interface TeamContextState extends BaseContextState {
  members: TeamMember[];
}

interface TeamContextActions extends BaseContextActions {
  fetchMembers: () => Promise<void>;
  inviteMember: (email: string, role: 'admin' | 'editor' | 'viewer', message?: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: 'admin' | 'editor' | 'viewer') => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
}

interface TeamContextValue extends TeamContextState, TeamContextActions {}

const TeamContext = createContext<TeamContextValue | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
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

  const inviteMember = async (email: string, role: 'admin' | 'editor' | 'viewer', message?: string) => {
    await handleAsyncAction(
      async () => {
        await teamApi.inviteMember({ email, role, message });
        await fetchMembers();
      },
      setLoading,
      setError
    );
  };

  const updateMemberRole = async (memberId: string, role: 'admin' | 'editor' | 'viewer') => {
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

  const value: TeamContextValue = {
    members,
    loading,
    error,
    fetchMembers,
    inviteMember,
    updateMemberRole,
    removeMember,
    ...baseActions,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
