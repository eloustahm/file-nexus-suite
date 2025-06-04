
import { http } from '@/lib/api';

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

/**
 * Workflows API service
 */
export const workflowsApi = {
  // Get all workflows
  getAll: async (): Promise<Workflow[]> => {
    return http.get<Workflow[]>('/api/workflows');
  },
  
  // Get workflow by ID
  getById: async (id: string): Promise<Workflow> => {
    return http.get<Workflow>(`/api/workflows/${id}`);
  },
  
  // Create workflow
  create: async (workflowData: Partial<Workflow>): Promise<Workflow> => {
    return http.post<Workflow>('/api/workflows', workflowData);
  },
  
  // Update workflow
  update: async (id: string, data: Partial<Workflow>): Promise<Workflow> => {
    return http.put<Workflow>(`/api/workflows/${id}`, data);
  },
  
  // Delete workflow
  delete: async (id: string): Promise<void> => {
    return http.delete<void>(`/api/workflows/${id}`);
  },
  
  // Execute workflow
  execute: async (id: string, documentId: string) => {
    return http.post(`/api/workflows/${id}/execute`, { documentId });
  }
};
