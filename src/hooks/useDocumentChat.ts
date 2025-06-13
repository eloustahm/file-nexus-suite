import { useQueryClient } from '@tanstack/react-query';
import { useChatAgents } from '@/hooks/queries/useChatAgents';
import { useMutation } from '@tanstack/react-query';
import { chatService } from '@/services/chat';
import { useChatQuery } from '@/hooks/queries/useChatQuery';
import { useState } from 'react';
import type { ChatSession } from '@/types';

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
  const { createSession, sendMessage: sendChatMessage } = useChatQuery();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: (data: { title: string; agentId?: string }) => chatService.createSession(data),
    onSuccess: (session) => {
      setSelectedSessionId(session.id);
    },
    onError: (error: any) => {
      updateChatState({
        error: error.message || 'Failed to create chat session',
      });
    },
  });

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
      if (!selectedSessionId) throw new Error('No session selected');

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
        const response = await chatService.sendMessage(selectedSessionId, content);

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
    
    // Create a new session with the selected agent
    createSessionMutation.mutate({ 
      title: `Chat with ${agent.name}`,
      agentId: agent.id 
    });
  };

  const clearError = () => {
    updateChatState({ error: null });
  };

  return {
    // State
    ...getChatState(),
    selectedSessionId,

    // Actions
    setSelectedAgent,
    sendMessage: sendMessageMutation.mutateAsync,
    clearError,
  };
}; 