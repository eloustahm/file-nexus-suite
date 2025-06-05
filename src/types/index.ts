
// Common types used across the application

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  documentId?: string;
  agentId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  sender: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Agent {
  id: string;
  name: string;
  type?: string;
  description: string;
  avatar?: string;
  capabilities: string[];
  personality?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
}

export interface ChatHistory {
  id: string;
  name: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  documentName?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: TemplateField[];
  content: string;
}

export interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'date';
  required: boolean;
  value?: string;
  options?: string[];
}

export interface GeneratedDocument {
  id: string;
  title: string;
  content: string;
  templateId?: string;
  purpose: string;
  instructions?: string;
  status: 'generating' | 'completed' | 'error';
  createdAt: string;
  wordCount?: number;
  isSelected?: boolean;
  metadata?: Record<string, any>;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  content?: string;
  folderId?: string;
  isShared?: boolean;
}
