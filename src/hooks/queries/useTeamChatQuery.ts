import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '@/services/team';
import type { TeamRoom, ChatMessage } from '@/types/team';
import { toast } from 'sonner';

export const useTeamChatQuery = () => {
  const queryClient = useQueryClient();

  // Query for fetching chat rooms
  const { data: rooms = [], isLoading: isLoadingRooms } = useQuery({
    queryKey: ['teamChatRooms'],
    queryFn: teamService.getChatRooms,
  });

  // Query for fetching messages in a room
  const { data: messages = {}, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['teamChatMessages'],
    queryFn: async () => {
      const allMessages: Record<string, ChatMessage[]> = {};
      for (const room of rooms) {
        allMessages[room.id] = await teamService.getChatMessages(room.id);
      }
      return allMessages;
    },
    enabled: rooms.length > 0,
  });

  // Mutation for creating a new chat room
  const createRoomMutation = useMutation({
    mutationFn: ({ name, members }: { name: string; members: string[] }) =>
      teamService.createChatRoom({ name, members }),
    onSuccess: (newRoom) => {
      queryClient.setQueryData(['teamChatRooms'], (old: TeamRoom[] = []) => [...old, newRoom]);
      toast.success('Chat room created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chat room');
    },
  });

  // Mutation for sending a message
  const sendMessageMutation = useMutation({
    mutationFn: ({ roomId, content }: { roomId: string; content: string }) =>
      teamService.sendChatMessage(roomId, content),
    onSuccess: (newMessage, { roomId }) => {
      queryClient.setQueryData(['teamChatMessages'], (old: Record<string, ChatMessage[]> = {}) => ({
        ...old,
        [roomId]: [...(old[roomId] || []), newMessage],
      }));
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });

  // Mutation for joining a room
  const joinRoomMutation = useMutation({
    mutationFn: teamService.joinChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamChatRooms'] });
      toast.success('Joined chat room successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to join chat room');
    },
  });

  // Mutation for leaving a room
  const leaveRoomMutation = useMutation({
    mutationFn: teamService.leaveRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamChatRooms'] });
      toast.success('Left chat room successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to leave chat room');
    },
  });

  return {
    // Data
    rooms,
    messages,
    isLoading: isLoadingRooms || isLoadingMessages,

    // Actions
    createRoom: createRoomMutation.mutate,
    sendMessage: sendMessageMutation.mutate,
    joinRoom: joinRoomMutation.mutate,
    leaveRoom: leaveRoomMutation.mutate,

    // Mutation states
    isCreatingRoom: createRoomMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
    isJoiningRoom: joinRoomMutation.isPending,
    isLeavingRoom: leaveRoomMutation.isPending,
  };
}; 