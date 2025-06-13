// Export all types from their respective files
export * from '@/types/activity';
export * from '@/types/chat';
export * from '@/types/file';
export * from '@/types/payment';
export * from '@/types/profile';
export * from '@/types/team';
export * from '@/types/integration';

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
  timestamp: string; // Always ISO string
  documentId?: string;
  agentId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  documentId?: string;
  agentId?: string;
  createdAt: string; // Always ISO string
  updatedAt: string; // Always ISO string
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
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
  timestamp: string; // Always ISO string
  messageCount: number;
  messages: ChatMessage[];
  createdAt: string; // Always ISO string
  updatedAt: string; // Always ISO string
  documentName?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  url?: string;
  createdAt: string; // Always ISO string
  updatedAt: string; // Always ISO string
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
  joinedAt: string; // Always ISO string
  lastActive: string; // Always ISO string
  status: 'active' | 'pending' | 'suspended';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string; // Always ISO string
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
  timestamp: string; // Always ISO string
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
  createdAt: string; // Always ISO string
  updatedAt: string; // Always ISO string
  documentCount: number;
  type?: 'folder' | 'shared';
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'approval' | 'review' | 'automation' | 'notification';
  assignedTo?: string;
  completed: boolean;
  completedAt?: string; // Always ISO string
  notes?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  steps: WorkflowStep[];
  createdAt: string; // Always ISO string
  updatedAt: string; // Always ISO string
  createdBy: string;
  documentIds: string[];
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // Always ISO string
  trigger?: string;
  lastRun?: string; // Always ISO string
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
  createdAt: string; // Always ISO string
  status: 'generating' | 'completed' | 'error';
  purpose: string;
  instructions?: string;
  isSelected?: boolean;
  wordCount?: number;
}

// Standard API Response Types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// --- Auth Types ---
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// --- Document Generation Types ---
export interface DocumentFormData {
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
}

// --- Document Types ---
export interface CreateDocumentData {
  name: string;
  content: string;
  type: string;
  folderId?: string;
  tags?: string[];
}

export interface ShareDocumentData {
  userIds: string[];
  permissions: 'read' | 'write' | 'admin';
  expiresAt?: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  changes: string;
}

// --- Activity Types ---
export interface ActivityLogData {
  action: string;
  description: string;
  type: string;
  metadata?: Record<string, any>;
}

export interface ProfileActivity {
  id: string;
  type: string;
  timestamp: string;
  details: Record<string, unknown>;
}

// Re-export ActivityFilter for ActivityFilters usage
export type { ActivityFilter } from '@/types/activity';
