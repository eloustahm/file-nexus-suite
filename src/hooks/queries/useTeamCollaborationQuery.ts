import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '@/services/team';
import type { TeamMember, TeamSettings } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useTeamCollaborationQuery = () => {
  const queryClient = useQueryClient();

  // Get team members query
  const membersQuery = useQuery({
    queryKey: [QUERY_KEYS.TEAM, 'members'],
    queryFn: teamService.getMembers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get team settings query
  const settingsQuery = useQuery({
    queryKey: [QUERY_KEYS.TEAM, 'settings'],
    queryFn: teamService.getSettings,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Invite member mutation
  const inviteMemberMutation = useMutation({
    mutationFn: teamService.inviteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAM, 'members'] });
      toast.success('Member invited successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to invite member');
    },
  });

  // Update member role mutation
  const updateMemberRoleMutation = useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: TeamMember['role'] }) =>
      teamService.updateMemberRole(memberId, role),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAM, 'members'] });
      queryClient.setQueryData([QUERY_KEYS.TEAM, 'members', updatedMember.id], updatedMember);
      toast.success('Member role updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update member role');
    },
  });

  // Remove member mutation
  const removeMemberMutation = useMutation({
    mutationFn: teamService.removeMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAM, 'members'] });
      toast.success('Member removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove member');
    },
  });

  // Update team settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: (settings: Partial<TeamSettings>) => teamService.updateSettings(settings),
    onSuccess: (updatedSettings) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAM, 'settings'] });
      queryClient.setQueryData([QUERY_KEYS.TEAM, 'settings'], updatedSettings);
      toast.success('Team settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update team settings');
    },
  });

  return {
    // Server data
    members: membersQuery.data || [],
    settings: settingsQuery.data,
    
    // Server state
    isLoadingMembers: membersQuery.isLoading,
    isLoadingSettings: settingsQuery.isLoading,
    membersError: membersQuery.error?.message,
    settingsError: settingsQuery.error?.message,
    
    // Team actions
    inviteMember: inviteMemberMutation.mutate,
    updateMemberRole: updateMemberRoleMutation.mutate,
    removeMember: removeMemberMutation.mutate,
    updateSettings: updateSettingsMutation.mutate,
    refetchMembers: membersQuery.refetch,
    refetchSettings: settingsQuery.refetch,
    
    // Mutation states
    isInvitingMember: inviteMemberMutation.isPending,
    isUpdatingMemberRole: updateMemberRoleMutation.isPending,
    isRemovingMember: removeMemberMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,
  };
}; 