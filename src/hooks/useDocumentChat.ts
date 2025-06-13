import { useQueryClient } from '@tanstack/react-query';
import { useChatAgents } from '@/hooks/useChatAgents';
import { useMutation, useQuery } from '@tanstack/react-query';
import { chatService } from '@/services/chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface DocumentChatState {
  selectedAgent: any | null;
  currentMessages: Message[];
  isAgentTyping: boolean;
  error: string | null;
}

const DOCUMENT_CHAT_QUERY_KEY = 'document-chat';

export const useDocumentChat = () => {
  const queryClient = useQueryClient();
  const { agents } = useChatAgents();

  // Get current chat state
  const getChatState = (): DocumentChatState => {
    return queryClient.getQueryData([DOCUMENT_CHAT_QUERY_KEY]) || {
      selectedAgent: null,
      currentMessages: [],
      isAgentTyping: false,
      error: null,
    };
  };

  // Update chat state
  const updateChatState = (updates: Partial<DocumentChatState>) => {
    const currentState = getChatState();
    queryClient.setQueryData([DOCUMENT_CHAT_QUERY_KEY], {
      ...currentState,
      ...updates,
    });
  };

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const state = getChatState();
      if (!state.selectedAgent) throw new Error('No agent selected');

      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };

      updateChatState({
        currentMessages: [...state.currentMessages, userMessage],
        isAgentTyping: true,
        error: null,
      });

      try {
        const response = await chatApi.sendMessage({
          content,
          agentId: state.selectedAgent.id,
        });

        // Add assistant message
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date().toISOString(),
        };

        updateChatState({
          currentMessages: [...state.currentMessages, userMessage, assistantMessage],
          isAgentTyping: false,
        });

        return response;
      } catch (error: any) {
        updateChatState({
          isAgentTyping: false,
          error: error.message || 'Failed to send message',
        });
        throw error;
      }
    },
  });

  // Actions
  const setSelectedAgent = (agent: any) => {
    updateChatState({ selectedAgent: agent });
  };

  const clearError = () => {
    updateChatState({ error: null });
  };

  return {
    // State
    ...getChatState(),

    // Actions
    setSelectedAgent,
    sendMessage: sendMessageMutation.mutateAsync,
    clearError,
  };
}; 