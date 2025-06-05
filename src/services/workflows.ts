
import { http } from '@/lib/api';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'approval' | 'review' | 'automation' | 'notification';
  completed: boolean;
}

/**
 * Workflows API service
 */
export const workflowsApi = {
  // Get all workflows
  getAll: async (): Promise<Workflow[]> => {
    console.log('Fetching all workflows');
    return http.get<Workflow[]>('/api/workflows');
  },

  // Create workflow
  create: async (data: any): Promise<Workflow> => {
    console.log('Creating workflow:', data);
    return http.post<Workflow>('/api/workflows', data);
  },

  // Update workflow
  update: async (id: string, data: any): Promise<Workflow> => {
    console.log('Updating workflow:', id);
    return http.put<Workflow>(`/api/workflows/${id}`, data);
  },

  // Delete workflow
  delete: async (id: string) => {
    console.log('Deleting workflow:', id);
    return http.delete(`/api/workflows/${id}`);
  },

  // Execute workflow
  execute: async (id: string, documentId: string) => {
    console.log('Executing workflow:', id, 'for document:', documentId);
    return http.post(`/api/workflows/${id}/execute`, { documentId });
  }
};
