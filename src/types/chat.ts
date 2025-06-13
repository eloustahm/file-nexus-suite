export interface ChatSession {
  id: string;
  title: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string;
  isArchived: boolean;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: string;
  updatedAt: string;
}

export interface ChatAgent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  capabilities: string[];
  isActive: boolean;
} 