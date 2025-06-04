
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi, type InviteMemberData } from '@/services/team';
import { toast } from 'sonner';

export const useTeamQuery = () => {
  const queryClient = useQueryClient();

  // Get team members query
  const membersQuery = useQuery({
    queryKey: ['team', 'members'],
    queryFn: teamApi.getMembers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get chat rooms query
  const chatRoomsQuery = useQuery({
    queryKey: ['team', 'chatRooms'],
    queryFn: teamApi.getChatRooms,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Invite member mutation
  const inviteMemberMutation = useMutation({
    mutationFn: (data: InviteMemberData) => teamApi.inviteMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] });
      toast.success('Member invited successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to invite member');
    },
  });

  // Update member role mutation
  const updateMemberRoleMutation = useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) => 
      teamApi.updateMemberRole(memberId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] });
      toast.success('Member role updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update member role');
    },
  });

  // Remove member mutation
  const removeMemberMutation = useMutation({
    mutationFn: (memberId: string) => teamApi.removeMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] });
      toast.success('Member removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove member');
    },
  });

  // Create chat room mutation
  const createChatRoomMutation = useMutation({
    mutationFn: (data: { name: string; description?: string; type: 'group' | 'project'; members: string[] }) => 
      teamApi.createChatRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team', 'chatRooms'] });
      toast.success('Chat room created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chat room');
    },
  });

  return {
    // Team members data
    members: membersQuery.data || [],
    isLoadingMembers: membersQuery.isLoading,
    membersError: membersQuery.error,

    // Chat rooms data
    chatRooms: chatRoomsQuery.data || [],
    isLoadingChatRooms: chatRoomsQuery.isLoading,
    chatRoomsError: chatRoomsQuery.error,

    // Mutations
    inviteMember: inviteMemberMutation.mutateAsync,
    updateMemberRole: updateMemberRoleMutation.mutateAsync,
    removeMember: removeMemberMutation.mutateAsync,
    createChatRoom: createChatRoomMutation.mutateAsync,

    // Loading states
    isInviting: inviteMemberMutation.isPending,
    isUpdatingRole: updateMemberRoleMutation.isPending,
    isRemoving: removeMemberMutation.isPending,
    isCreatingRoom: createChatRoomMutation.isPending,

    // Refetch
    refetchMembers: membersQuery.refetch,
    refetchChatRooms: chatRoomsQuery.refetch,
  };
};
