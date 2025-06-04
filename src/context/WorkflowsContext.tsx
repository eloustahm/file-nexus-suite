
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { workflowsApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

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

interface WorkflowsContextState extends BaseContextState {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
}

interface WorkflowsContextActions extends BaseContextActions {
  fetchWorkflows: () => Promise<void>;
  getWorkflow: (id: string) => Promise<void>;
  createWorkflow: (workflowData: Partial<Workflow>) => Promise<void>;
  updateWorkflow: (id: string, data: Partial<Workflow>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  executeWorkflow: (id: string, documentId: string) => Promise<void>;
  completeStep: (workflowId: string, stepId: string, notes?: string) => Promise<void>;
}

interface WorkflowsContextValue extends WorkflowsContextState, WorkflowsContextActions {}

const WorkflowsContext = createContext<WorkflowsContextValue | undefined>(undefined);

export const WorkflowsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchWorkflows = async () => {
    await handleAsyncAction(
      async () => {
        const data = await workflowsApi.getAll() as Workflow[];
        setWorkflows(data);
      },
      setLoading,
      setError
    );
  };

  const getWorkflow = async (id: string) => {
    await handleAsyncAction(
      async () => {
        const workflow = await workflowsApi.getById(id) as Workflow;
        setSelectedWorkflow(workflow);
      },
      setLoading,
      setError
    );
  };

  const createWorkflow = async (workflowData: Partial<Workflow>) => {
    await handleAsyncAction(
      async () => {
        const workflow = await workflowsApi.create(workflowData) as Workflow;
        setWorkflows(prev => [...prev, workflow]);
      },
      setLoading,
      setError
    );
  };

  const updateWorkflow = async (id: string, data: Partial<Workflow>) => {
    await handleAsyncAction(
      async () => {
        const updatedWorkflow = await workflowsApi.update(id, data) as Workflow;
        setWorkflows(prev => prev.map(workflow => workflow.id === id ? updatedWorkflow : workflow));
        if (selectedWorkflow?.id === id) {
          setSelectedWorkflow(updatedWorkflow);
        }
      },
      setLoading,
      setError
    );
  };

  const deleteWorkflow = async (id: string) => {
    await handleAsyncAction(
      async () => {
        await workflowsApi.delete(id);
        setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
        if (selectedWorkflow?.id === id) {
          setSelectedWorkflow(null);
        }
      },
      setLoading,
      setError
    );
  };

  const executeWorkflow = async (id: string, documentId: string) => {
    await handleAsyncAction(
      async () => {
        await workflowsApi.execute(id, documentId);
        await fetchWorkflows();
      },
      setLoading,
      setError
    );
  };

  const completeStep = async (workflowId: string, stepId: string, notes?: string) => {
    await handleAsyncAction(
      async () => {
        if (selectedWorkflow) {
          const updatedSteps = selectedWorkflow.steps.map(step => 
            step.id === stepId 
              ? { ...step, completed: true, completedAt: new Date().toISOString(), notes }
              : step
          );
          await updateWorkflow(workflowId, { steps: updatedSteps });
        }
      },
      setLoading,
      setError
    );
  };

  const value: WorkflowsContextValue = {
    workflows,
    selectedWorkflow,
    loading,
    error,
    fetchWorkflows,
    getWorkflow,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
    completeStep,
    ...baseActions,
  };

  return <WorkflowsContext.Provider value={value}>{children}</WorkflowsContext.Provider>;
};

export const useWorkflows = () => {
  const context = useContext(WorkflowsContext);
  if (context === undefined) {
    throw new Error('useWorkflows must be used within a WorkflowsProvider');
  }
  return context;
};
