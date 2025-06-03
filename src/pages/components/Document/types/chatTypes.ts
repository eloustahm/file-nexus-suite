
export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  avatar?: string;
  capabilities: string[];
  personality: string;
  icon: string;
  color: string;
}

export interface Document {
  id: string | number;
  name: string;
  type: string;
  size: string;
}

export interface ChatMessage {
  id: string | number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  documentId?: string;
  type?: 'user' | 'ai';
  message?: string;
  documentRefs?: string[];
  agentPersonality?: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  documentId?: string;
  createdAt: Date;
  updatedAt: Date;
  documentName?: string;
  lastActivity?: string;
}
