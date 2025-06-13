import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat';
import type { ChatSession, ChatMessage, ChatAgent } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useChatQuery = () => {
  const queryClient = useQueryClient();

  // Get chat sessions query
  const sessionsQuery = useQuery({
    queryKey: [QUERY_KEYS.CHAT, 'sessions'],
    queryFn: chatService.getSessions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get chat agents query
  const agentsQuery = useQuery({
    queryKey: [QUERY_KEYS.CHAT, 'agents'],
    queryFn: chatService.getAgents,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: (data: { title: string; agentId?: string }) => chatService.createSession(data),
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT, 'sessions'] });
      queryClient.setQueryData([QUERY_KEYS.CHAT, 'sessions', newSession.id], newSession);
      toast.success('Chat session created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chat session');
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ sessionId, content }: { sessionId: string; content: string }) => 
      chatService.sendMessage(sessionId, content),
    onSuccess: (message, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT, 'sessions', sessionId, 'messages'] });
      queryClient.setQueryData([QUERY_KEYS.CHAT, 'sessions', sessionId, 'messages', message.id], message);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: (sessionId: string) => chatService.deleteSession(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT, 'sessions'] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.CHAT, 'sessions', sessionId] });
      toast.success('Chat session deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete chat session');
    },
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: ({ sessionId, data }: { sessionId: string; data: Partial<ChatSession> }) => 
      chatService.updateSession(sessionId, data),
    onSuccess: (updatedSession) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT, 'sessions'] });
      queryClient.setQueryData([QUERY_KEYS.CHAT, 'sessions', updatedSession.id], updatedSession);
      toast.success('Chat session updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update chat session');
    },
  });

  return {
    // Server data
    sessions: sessionsQuery.data || [],
    agents: agentsQuery.data || [],
    
    // Server state
    isLoadingSessions: sessionsQuery.isLoading,
    isLoadingAgents: agentsQuery.isLoading,
    sessionsError: sessionsQuery.error?.message,
    agentsError: agentsQuery.error?.message,
    
    // Chat actions
    createSession: createSessionMutation.mutate,
    sendMessage: sendMessageMutation.mutate,
    deleteSession: deleteSessionMutation.mutate,
    updateSession: updateSessionMutation.mutate,
    refetchSessions: sessionsQuery.refetch,
    refetchAgents: agentsQuery.refetch,
    
    // Mutation states
    isCreatingSession: createSessionMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
    isDeletingSession: deleteSessionMutation.isPending,
    isUpdatingSession: updateSessionMutation.isPending,
  };
};
