
export interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  documentRefs?: string[];
  agentPersonality?: string;
}

export interface ChatHistory {
  documentId: string;
  documentName: string;
  messages: ChatMessage[];
  lastActivity: string;
}

export interface Agent {
  id: string;
  name: string;
  personality: string;
  description: string;
  icon: string;
  color: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
}
