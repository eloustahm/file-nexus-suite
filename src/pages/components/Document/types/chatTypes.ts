
export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  avatar?: string;
  capabilities: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  documentId?: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  documentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
