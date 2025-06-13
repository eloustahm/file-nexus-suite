import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat';
import type { ChatSession, ChatMessage, Agent } from '@/types';

export const useDocumentChatQuery = () => {
  const queryClient = useQueryClient();

  // Query for fetching agents
  const { data: agents = [], isLoading: isLoadingAgents } = useQuery({
    queryKey: ['chatAgents'],
    queryFn: () => chatService.getAgents(),
  });

  // Query for fetching chat sessions
  const { data: sessions = [], isLoading: isLoadingSessions } = useQuery({
    queryKey: ['chatSessions'],
    queryFn: () => chatService.getSessions(),
  });

  // Mutation for creating a new session
  const createSessionMutation = useMutation({
    mutationFn: (data: { title: string; documentId?: string; agentId?: string }) =>
      chatService.createSession({
        title: data.title,
        agentId: data.agentId
      }),
    onSuccess: (newSession) => {
      queryClient.setQueryData(['chatSessions'], (old: ChatSession[] = []) => [...old, newSession]);
    },
  });

  // Mutation for sending a message
  const sendMessageMutation = useMutation({
    mutationFn: (data: { sessionId: string; content: string; documentId?: string }) =>
      chatService.sendMessage(data.sessionId, data.content),
    onSuccess: (newMessage, { documentId }) => {
      queryClient.setQueryData(['chatMessages'], (old: Record<string, ChatMessage[]> = {}) => ({
        ...old,
        [documentId || 'default']: [...(old[documentId || 'default'] || []), newMessage],
      }));
    },
  });

  // Mutation for deleting a session
  const deleteSessionMutation = useMutation({
    mutationFn: (sessionId: string) => chatService.deleteSession(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.setQueryData(['chatSessions'], (old: ChatSession[] = []) =>
        old.filter(session => session.id !== sessionId)
      );
    },
  });

  return {
    // Data
    agents,
    sessions,
    isLoading: isLoadingAgents || isLoadingSessions,

    // Actions
    createSession: createSessionMutation.mutate,
    sendMessage: sendMessageMutation.mutate,
    deleteSession: deleteSessionMutation.mutate,
  };
}; 