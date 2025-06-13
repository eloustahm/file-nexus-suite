import type { LucideIcon } from 'lucide-react';

export type AIModuleStatus = 'active' | 'inactive' | 'pending';

export interface AIModuleFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  required: boolean;
}

export interface AIModuleStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastUsed: string;
  usageLimit: number;
  currentUsage: number;
}

export interface AIModule {
  id: string;
  name: string;
  description: string;
  type: string;
  status: AIModuleStatus;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  features: AIModuleFeature[];
  stats: AIModuleStats;
  config: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface AIModuleResponse {
  module: AIModule;
}

export interface AIModuleListResponse {
  modules: AIModule[];
  total: number;
}

export interface AIModuleUpdateData {
  status?: AIModuleStatus;
  config?: Record<string, any>;
  features?: Array<{ id: string; enabled: boolean }>;
}

export interface AIModuleLog {
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  metadata?: Record<string, any>;
} 