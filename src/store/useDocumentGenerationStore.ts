
import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
  description: string;
  capabilities: string[];
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: Record<string, any>;
  content?: string;
}

interface GenerationProgress {
  step: number;
  totalSteps: number;
  currentTask: string;
  completed: boolean;
}

interface DocumentGenerationState {
  selectedTemplate: DocumentTemplate | null;
  selectedAgent: Agent | null;
  templateFields: Record<string, any>;
  generatedContent: string;
  isGenerating: boolean;
  generationProgress: GenerationProgress | null;
  templates: DocumentTemplate[];
  loading: boolean;
  error: string | null;
  
  setSelectedTemplate: (template: DocumentTemplate | null) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  updateTemplateField: (field: string, value: any) => void;
  addTemplateField: (field: string, value: any) => void;
  removeTemplateField: (field: string) => void;
  generateDocument: () => Promise<void>;
  resetGeneration: () => void;
  fetchTemplates: () => Promise<void>;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  selectedTemplate: null,
  selectedAgent: null,
  templateFields: {},
  generatedContent: '',
  isGenerating: false,
  generationProgress: null,
  templates: [],
  loading: false,
  error: null,

  setSelectedTemplate: (template) => {
    set({ 
      selectedTemplate: template,
      templateFields: template?.fields || {},
      generatedContent: '',
      error: null
    });
  },

  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  updateTemplateField: (field, value) => {
    set((state) => ({
      templateFields: { ...state.templateFields, [field]: value }
    }));
  },

  addTemplateField: (field, value) => {
    set((state) => ({
      templateFields: { ...state.templateFields, [field]: value }
    }));
  },

  removeTemplateField: (field) => {
    set((state) => {
      const { [field]: removed, ...rest } = state.templateFields;
      return { templateFields: rest };
    });
  },

  generateDocument: async () => {
    const { selectedTemplate, templateFields, selectedAgent } = get();
    
    if (!selectedTemplate) {
      set({ error: 'Please select a template' });
      return;
    }

    try {
      set({ 
        isGenerating: true, 
        error: null,
        generationProgress: { step: 1, totalSteps: 3, currentTask: 'Preparing template...', completed: false }
      });

      // Simulate progress updates
      setTimeout(() => {
        set({ generationProgress: { step: 2, totalSteps: 3, currentTask: 'Generating content...', completed: false } });
      }, 1000);

      // Call API
      const response = await aiApi.generateDocument({
        templateId: selectedTemplate.id,
        fields: templateFields,
        agentId: selectedAgent?.id
      });

      set({ 
        generatedContent: response.content || 'Generated document content will appear here.',
        generationProgress: { step: 3, totalSteps: 3, currentTask: 'Complete!', completed: true }
      });

    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isGenerating: false });
      setTimeout(() => set({ generationProgress: null }), 2000);
    }
  },

  resetGeneration: () => {
    set({
      selectedTemplate: null,
      selectedAgent: null,
      templateFields: {},
      generatedContent: '',
      isGenerating: false,
      generationProgress: null,
      error: null
    });
  },

  fetchTemplates: async () => {
    try {
      set({ loading: true, error: null });
      const templates = await aiApi.getTemplates() as DocumentTemplate[];
      set({ templates });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
