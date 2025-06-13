import { http } from '@/lib/api';
import type { Workflow, WorkflowStep } from '@/types';

export const workflowsService = {
  // Get all workflows
  async getAll(): Promise<Workflow[]> {
    return http.get<Workflow[]>('/workflows');
  },
  
  // Get workflow by ID
  async getById(id: string): Promise<Workflow> {
    return http.get<Workflow>(`/workflows/${id}`);
  },
  
  // Create workflow
  async create(workflowData: Partial<Workflow>): Promise<Workflow> {
    return http.post<Workflow>('/workflows', workflowData);
  },
  
  // Update workflow
  async update(id: string, data: Partial<Workflow>): Promise<Workflow> {
    return http.patch<Workflow>(`/workflows/${id}`, data);
  },
  
  // Delete workflow
  async delete(id: string): Promise<void> {
    await http.delete<void>(`/workflows/${id}`);
  },
  
  // Execute workflow
  async execute(id: string, documentId: string): Promise<void> {
    await http.post<void>(`/workflows/${id}/execute`, { documentId });
  }
};
