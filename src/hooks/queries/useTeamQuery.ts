import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '@/services/team';
import type { TeamMember, TeamSettings, TeamRoom, ChatMessage } from '@/types/team';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useTeamQuery = () => {
  const queryClient = useQueryClient();

  // Get team members query
  const membersQuery = useQuery({
    queryKey: ['team', 'members'],
    queryFn: teamService.getMembers,
  });

  // Get team settings query
  const settingsQuery = useQuery({
    queryKey: ['team', 'settings'],
    queryFn: teamService.getSettings,
  });

  // Get team rooms query
  const roomsQuery = useQuery({
    queryKey: ['team', 'rooms'],
    queryFn: teamService.getRooms,
  });

  // Get room messages query
  const getRoomMessages = async (roomId: string) => {
    return teamService.getRoomMessages(roomId);
  };

  // Invite member mutation
  const inviteMemberMutation = useMutation({
    mutationFn: teamService.inviteMember,
    onSuccess: (newMember) => {
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
      teamService.updateMemberRole(memberId, role),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] });
      toast.success('Member role updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update member role');
    },
  });

  // Remove member mutation
  const removeMemberMutation = useMutation({
    mutationFn: teamService.removeMember,
    onSuccess: (_, memberId) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'members'] });
      toast.success('Member removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove member');
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: teamService.updateSettings,
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(['team', 'settings'], updatedSettings);
      toast.success('Team settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update team settings');
    },
  });

  // Create chat room mutation
  const createChatRoomMutation = useMutation({
    mutationFn: (data: { name: string; description?: string; type: 'group' | 'project'; members: string[] }) => 
      teamService.createChatRoom(data),
    onSuccess: (newRoom) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'rooms'] });
      queryClient.setQueryData(['team', 'rooms', newRoom.id], newRoom);
      toast.success('Chat room created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chat room');
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ roomId, content }: { roomId: string; content: string }) => 
      teamService.sendRoomMessage(roomId, content),
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'rooms', message.roomId, 'messages'] });
      toast.success('Message sent successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });

  // Join room mutation
  const joinRoomMutation = useMutation({
    mutationFn: (roomId: string) => teamService.joinRoom(roomId),
    onSuccess: (_, roomId) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'rooms'] });
      queryClient.invalidateQueries({ queryKey: ['team', 'rooms', roomId] });
      toast.success('Joined chat room successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to join chat room');
    },
  });

  // Leave room mutation
  const leaveRoomMutation = useMutation({
    mutationFn: (roomId: string) => teamService.leaveRoom(roomId),
    onSuccess: (_, roomId) => {
      queryClient.invalidateQueries({ queryKey: ['team', 'rooms'] });
      queryClient.invalidateQueries({ queryKey: ['team', 'rooms', roomId] });
      toast.success('Left chat room successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to leave chat room');
    },
  });

  return {
    // Data
    members: membersQuery.data || [],
    settings: settingsQuery.data,
    rooms: roomsQuery.data || [],

    // Loading states
    isLoadingMembers: membersQuery.isLoading,
    isLoadingSettings: settingsQuery.isLoading,
    isLoadingRooms: roomsQuery.isLoading,

    // Errors
    membersError: membersQuery.error,
    settingsError: settingsQuery.error,
    roomsError: roomsQuery.error,

    // Queries
    getRoomMessages,

    // Actions
    inviteMember: inviteMemberMutation.mutate,
    updateMemberRole: updateMemberRoleMutation.mutate,
    removeMember: removeMemberMutation.mutate,
    updateSettings: updateSettingsMutation.mutate,

    // Mutation states
    isInvitingMember: inviteMemberMutation.isPending,
    isUpdatingMemberRole: updateMemberRoleMutation.isPending,
    isRemovingMember: removeMemberMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,

    // Mutations
    createChatRoom: createChatRoomMutation.mutateAsync,
    sendMessage: sendMessageMutation.mutateAsync,
    joinRoom: joinRoomMutation.mutateAsync,
    leaveRoom: leaveRoomMutation.mutateAsync,

    // Loading states
    isCreatingChatRoom: createChatRoomMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
    isJoiningRoom: joinRoomMutation.isPending,
    isLeavingRoom: leaveRoomMutation.isPending,

    // Refetch
    refetchMembers: membersQuery.refetch,
    refetchSettings: settingsQuery.refetch,
    refetchRooms: roomsQuery.refetch,
  };
};
