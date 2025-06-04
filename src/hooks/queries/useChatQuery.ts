
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi, type SendMessageData } from '@/services/chat';
import { toast } from 'sonner';

export const useChatQuery = () => {
  const queryClient = useQueryClient();

  // Get all chat sessions query
  const sessionsQuery = useQuery({
    queryKey: ['chat', 'sessions'],
    queryFn: chatApi.getSessions,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get available agents query
  const agentsQuery = useQuery({
    queryKey: ['chat', 'agents'],
    queryFn: chatApi.getAgents,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: (data: { title?: string; documentId?: string; agentId?: string }) => 
      chatApi.createSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] });
      toast.success('Chat session created');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chat session');
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (data: SendMessageData) => chatApi.sendMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: (sessionId: string) => chatApi.deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] });
      toast.success('Chat session deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete chat session');
    },
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: ({ sessionId, data }: { sessionId: string; data: { title: string } }) => 
      chatApi.updateSession(sessionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] });
      toast.success('Chat session updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update chat session');
    },
  });

  return {
    // Data
    sessions: sessionsQuery.data || [],
    agents: agentsQuery.data || [],

    // Loading states
    isLoadingSessions: sessionsQuery.isLoading,
    isLoadingAgents: agentsQuery.isLoading,

    // Errors
    sessionsError: sessionsQuery.error,
    agentsError: agentsQuery.error,

    // Mutations
    createSession: createSessionMutation.mutateAsync,
    sendMessage: sendMessageMutation.mutateAsync,
    deleteSession: deleteSessionMutation.mutateAsync,
    updateSession: updateSessionMutation.mutateAsync,

    // Loading states
    isCreatingSession: createSessionMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
    isDeletingSession: deleteSessionMutation.isPending,
    isUpdatingSession: updateSessionMutation.isPending,

    // Refetch
    refetchSessions: sessionsQuery.refetch,
    refetchAgents: agentsQuery.refetch,

    // Helper function for getting session by ID
    getSession: (sessionId: string) => chatApi.getSession(sessionId),
  };
};
