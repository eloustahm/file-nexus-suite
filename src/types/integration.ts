export interface Integration {
  id: string;
  name: string;
  type: 'storage' | 'crm' | 'email' | 'calendar' | 'other';
  status: 'active' | 'inactive' | 'error';
  config: {
    apiKey?: string;
    endpoint?: string;
    credentials?: Record<string, string>;
    options?: Record<string, any>;
  };
  lastSync?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IntegrationStats {
  totalFiles: number;
  totalSize: string;
  lastSync: string;
  syncStatus: 'success' | 'error' | 'pending';
  errorCount: number;
}

export interface IntegrationSyncResult {
  success: boolean;
  message: string;
  stats?: IntegrationStats;
  error?: string;
} 