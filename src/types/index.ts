
// Unified type definitions for the application

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  sender: 'user' | 'agent';
  timestamp: Date | string;
  documentId?: string;
  agentId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  documentId?: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar?: string; // Made optional to fix build error
  capabilities: string[];
  isActive: boolean;
  type: string;
  personality: string;
  icon: string;
  color: string;
}

export interface ChatHistory {
  id: string;
  name: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  documentName?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  folderId?: string;
  isShared: boolean;
  sharedWith: string[];
  tags: string[];
  status: 'active' | 'archived' | 'deleted';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'pending' | 'suspended';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string;
  type: 'document' | 'team' | 'system' | 'chat';
  metadata?: Record<string, any>;
  resourceId?: string;
  resourceType?: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  documentCount: number;
  type?: 'folder' | 'shared';
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'approval' | 'review' | 'automation' | 'notification';
  assignedTo?: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  documentIds: string[];
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  trigger?: string;
  lastRun?: string;
}

// Document Generation Types - Unified Template Interface
export interface TemplateField {
  name: string; // Unified field identifier
  type: 'text' | 'textarea' | 'select' | 'date';
  label: string;
  required: boolean;
  options?: string[];
  value?: string;
  placeholder?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  category: string;
  preview?: string;
}

export interface GeneratedDocument {
  id: string;
  title: string;
  content: string;
  templateId: string;
  createdAt: string;
  status: 'generating' | 'completed' | 'error';
  purpose: string;
  instructions?: string;
  isSelected?: boolean;
  wordCount?: number;
}
