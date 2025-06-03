
import { create } from 'zustand';
import { workflowsApi } from '@/services/api';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'approval' | 'review' | 'automation' | 'notification';
  assignedTo?: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

interface Workflow {
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

interface WorkflowsState {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  loading: boolean;
  error: string | null;
  fetchWorkflows: () => Promise<void>;
  getWorkflow: (id: string) => Promise<void>;
  createWorkflow: (workflowData: Partial<Workflow>) => Promise<void>;
  updateWorkflow: (id: string, data: Partial<Workflow>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  executeWorkflow: (id: string, documentId: string) => Promise<void>;
  completeStep: (workflowId: string, stepId: string, notes?: string) => Promise<void>;
  clearError: () => void;
}

export const useWorkflowsStore = create<WorkflowsState>((set, get) => ({
  workflows: [],
  selectedWorkflow: null,
  loading: false,
  error: null,

  fetchWorkflows: async () => {
    try {
      set({ loading: true, error: null });
      const workflows = await workflowsApi.getAll() as Workflow[];
      set({ workflows });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getWorkflow: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const workflow = await workflowsApi.getById(id) as Workflow;
      set({ selectedWorkflow: workflow });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createWorkflow: async (workflowData: Partial<Workflow>) => {
    try {
      set({ loading: true, error: null });
      const workflow = await workflowsApi.create(workflowData) as Workflow;
      set(state => ({ workflows: [...state.workflows, workflow] }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateWorkflow: async (id: string, data: Partial<Workflow>) => {
    try {
      set({ loading: true, error: null });
      const updatedWorkflow = await workflowsApi.update(id, data) as Workflow;
      set(state => ({
        workflows: state.workflows.map(workflow => workflow.id === id ? updatedWorkflow : workflow),
        selectedWorkflow: state.selectedWorkflow?.id === id ? updatedWorkflow : state.selectedWorkflow
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteWorkflow: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await workflowsApi.delete(id);
      set(state => ({
        workflows: state.workflows.filter(workflow => workflow.id !== id),
        selectedWorkflow: state.selectedWorkflow?.id === id ? null : state.selectedWorkflow
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  executeWorkflow: async (id: string, documentId: string) => {
    try {
      set({ loading: true, error: null });
      await workflowsApi.execute(id, documentId);
      // Refresh workflows to get updated status
      await get().fetchWorkflows();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  completeStep: async (workflowId: string, stepId: string, notes?: string) => {
    try {
      set({ loading: true, error: null });
      const workflow = get().selectedWorkflow;
      if (workflow) {
        const updatedSteps = workflow.steps.map(step => 
          step.id === stepId 
            ? { ...step, completed: true, completedAt: new Date().toISOString(), notes }
            : step
        );
        await get().updateWorkflow(workflowId, { steps: updatedSteps });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
