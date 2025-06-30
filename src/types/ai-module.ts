
export interface AIModule {
  id: string;
  name: string;
  description: string;
  type: 'nlp' | 'vision' | 'audio' | 'general';
  status: AIModuleStatus;
  version: string;
  provider: string;
  config: Record<string, any>;
  features: string[];
  pricing: {
    model: 'free' | 'pay-per-use' | 'subscription';
    cost?: number;
    currency?: string;
  };
  usage: {
    current: number;
    limit: number;
    unit: string;
  };
  icon?: any;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
  stats?: AIModuleStats;
}

export type AIModuleStatus = 'active' | 'inactive' | 'pending' | 'error';

export interface AIModuleFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AIModuleUpdateData {
  status?: AIModuleStatus;
  config?: Record<string, any>;
  features?: AIModuleFeature[];
}

export interface AIModuleListResponse {
  modules: AIModule[];
  total: number;
  page: number;
  limit: number;
}

export interface AIModuleResponse {
  module: AIModule;
  success: boolean;
  message: string;
}

export interface AIModuleStats {
  totalUsage: number;
  successRate: number;
  averageResponseTime: number;
  errorCount: number;
}

export interface AIModuleTestResult {
  success: boolean;
  message: string;
  responseTime: number;
  error?: string;
}
