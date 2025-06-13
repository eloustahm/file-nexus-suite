export interface ActivityLog {
  id: string;
  type: 'file' | 'integration' | 'ai' | 'user' | 'system';
  action: string;
  description: string;
  metadata: Record<string, any>;
  userId?: string;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityFilter {
  type?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface ActivitySummary {
  total: number;
  byType: Record<string, number>;
  byUser: Record<string, number>;
  byDate: Record<string, number>;
  recent: ActivityLog[];
} 