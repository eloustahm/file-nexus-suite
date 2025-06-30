
// Export all types from their respective files
export * from '@/types/activity';
export * from '@/types/chat';
export * from '@/types/file';
export * from '@/types/payment';
export * from '@/types/profile';
export * from '@/types/team';
export * from '@/types/integration';

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
  name: string; // Add name property for compatibility
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
  type: string;
  description: string;
  avatar?: string;
  capabilities: string[];
  personality: string;
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
  value: string;
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
  isShared: boolean;
  status?: 'active' | 'archived' | 'deleted';
  role?: 'owner' | 'editor' | 'viewer';
  sharedBy?: string;
  sharedAt?: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  enabled: boolean;
  settings?: Record<string, any>;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  documentCount: number;
  createdAt: string;
  updatedAt: string;
  type?: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'member' | 'viewer';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'inactive' | 'paused';
  lastRun?: string;
  dueDate?: string;
  documentIds?: string[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition';
  config: Record<string, any>;
  order: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Pricing Plan interface
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: PricingFeature[];
  limitations: string[];
  popular: boolean;
  maxMembers: number;
  maxStorage: number;
  maxDocuments: number;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonText?: string;
}

export interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface PricingFAQ {
  id: string;
  question: string;
  answer: string;
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
  documentId?: string;
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

// Profile additional types
export interface ProfileStats {
  documentsCreated: number;
  collaborations: number;
  storageUsed: number;
  lastLogin: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Re-export ActivityFilter for ActivityFilters usage
export type { ActivityFilter } from '@/types/activity';
