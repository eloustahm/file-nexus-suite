
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat';
import type { ChatSession, ChatMessage, ChatAgent } from '@/types/chat';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useChatQuery = () => {
  const queryClient = useQueryClient();

  // Get chat sessions query
  const sessionsQuery = useQuery({
    queryKey: [QUERY_KEYS.CHAT_SESSIONS],
    queryFn: chatService.getSessions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get chat agents query
  const agentsQuery = useQuery({
    queryKey: [QUERY_KEYS.CHAT_AGENTS],
    queryFn: chatService.getAgents,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Get session messages query
  const getSessionMessages = (sessionId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CHAT_MESSAGES, sessionId],
      queryFn: () => chatService.getMessages(sessionId),
      enabled: !!sessionId,
      staleTime: 1 * 60 * 1000, // 1 minute
    });
  };

  // Get single session query
  const getSession = (sessionId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CHAT_SESSIONS, sessionId],
      queryFn: () => chatService.getSession(sessionId),
      enabled: !!sessionId,
    });
  };

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: (data: { title: string; agentId?: string }) => chatService.createSession(data),
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_SESSIONS] });
      queryClient.setQueryData([QUERY_KEYS.CHAT_SESSIONS, newSession.id], newSession);
      toast.success('Chat session created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chat session');
    },
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ChatSession> }) =>
      chatService.updateSession(id, data),
    onSuccess: (updatedSession) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_SESSIONS] });
      queryClient.setQueryData([QUERY_KEYS.CHAT_SESSIONS, updatedSession.id], updatedSession);
      toast.success('Chat session updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update chat session');
    },
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: (id: string) => chatService.deleteSession(id),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_SESSIONS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.CHAT_SESSIONS, sessionId] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.CHAT_MESSAGES, sessionId] });
      toast.success('Chat session deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete chat session');
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ sessionId, content }: { sessionId: string; content: string }) =>
      chatService.sendMessage(sessionId, { message: content }),
    onSuccess: (newMessage, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_MESSAGES, sessionId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_SESSIONS] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });

  return {
    // Server data
    sessions: sessionsQuery.data || [],
    agents: agentsQuery.data || [],
    
    // Server state
    isLoadingSessions: sessionsQuery.isLoading,
    isLoadingAgents: agentsQuery.isLoading,
    sessionsError: sessionsQuery.error,
    agentsError: agentsQuery.error,
    
    // Chat actions
    createSession: createSessionMutation.mutate,
    updateSession: updateSessionMutation.mutate,
    deleteSession: deleteSessionMutation.mutate,
    sendMessage: sendMessageMutation.mutate,
    refetchSessions: sessionsQuery.refetch,
    refetchAgents: agentsQuery.refetch,
    getSession,
    getSessionMessages,
    
    // Mutation states
    isCreatingSession: createSessionMutation.isPending,
    isUpdatingSession: updateSessionMutation.isPending,
    isDeletingSession: deleteSessionMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
  };
};
