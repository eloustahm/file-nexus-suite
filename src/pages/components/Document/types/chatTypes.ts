
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

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentId?: string;
}

export interface ChatMessage {
  id: string | number;
  content: string;
  role: 'user' | 'assistant';
  sender: 'user' | 'agent';
  timestamp: Date;
  documentId?: string;
  agentId?: string;
  type?: 'user' | 'ai';
  message?: string;
  documentRefs?: string[];
  agentPersonality?: string;
}

export interface ChatHistory {
  id: string;
  name: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  messages: ChatMessage[];
  documentId?: string;
  createdAt: Date;
  updatedAt: Date;
  documentName?: string;
  lastActivity?: string;
}
