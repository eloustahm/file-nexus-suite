
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
  personality?: string;
}

interface TemplateField {
  id: string;
  label: string;
  type: string;
  value: string;
  required?: boolean;
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: TemplateField[];
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
  generatedContent: string;
  isGenerating: boolean;
  isEditing: boolean;
  editedContent: string;
  generationProgress: GenerationProgress | null;
  templates: DocumentTemplate[];
  loading: boolean;
  error: string | null;
  
  setSelectedTemplate: (template: DocumentTemplate | null) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  updateFieldValue: (fieldId: string, value: string) => void;
  addCustomField: (field: TemplateField) => void;
  removeField: (fieldId: string) => void;
  generateDocument: () => Promise<void>;
  setEditMode: (editing: boolean) => void;
  updateEditedContent: (content: string) => void;
  resetGeneration: () => void;
  fetchTemplates: () => Promise<void>;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  selectedTemplate: null,
  selectedAgent: null,
  generatedContent: '',
  isGenerating: false,
  isEditing: false,
  editedContent: '',
  generationProgress: null,
  templates: [],
  loading: false,
  error: null,

  setSelectedTemplate: (template) => {
    set({ 
      selectedTemplate: template,
      generatedContent: '',
      error: null
    });
  },

  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  updateFieldValue: (fieldId, value) => {
    set((state) => {
      if (!state.selectedTemplate) return state;
      
      const updatedTemplate = {
        ...state.selectedTemplate,
        fields: state.selectedTemplate.fields.map(field => 
          field.id === fieldId ? { ...field, value } : field
        )
      };
      
      return { selectedTemplate: updatedTemplate };
    });
  },

  addCustomField: (field) => {
    set((state) => {
      if (!state.selectedTemplate) return state;
      
      const updatedTemplate = {
        ...state.selectedTemplate,
        fields: [...state.selectedTemplate.fields, field]
      };
      
      return { selectedTemplate: updatedTemplate };
    });
  },

  removeField: (fieldId) => {
    set((state) => {
      if (!state.selectedTemplate) return state;
      
      const updatedTemplate = {
        ...state.selectedTemplate,
        fields: state.selectedTemplate.fields.filter(field => field.id !== fieldId)
      };
      
      return { selectedTemplate: updatedTemplate };
    });
  },

  setEditMode: (editing) => {
    set({ isEditing: editing });
  },

  updateEditedContent: (content) => {
    set({ editedContent: content });
  },

  generateDocument: async () => {
    const { selectedTemplate, selectedAgent } = get();
    
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

      // For now, generate mock content since API might not be available
      const mockContent = `# ${selectedTemplate.name}\n\nGenerated document content based on template.\n\n${selectedTemplate.fields.map(field => `**${field.label}:** ${field.value || 'Not specified'}`).join('\n')}`;

      set({ 
        generatedContent: mockContent,
        editedContent: mockContent,
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
      generatedContent: '',
      isGenerating: false,
      isEditing: false,
      editedContent: '',
      generationProgress: null,
      error: null
    });
  },

  fetchTemplates: async () => {
    try {
      set({ loading: true, error: null });
      // Mock templates for now
      const templates: DocumentTemplate[] = [
        {
          id: '1',
          name: 'Business Plan',
          description: 'Professional business plan template',
          type: 'business',
          fields: [
            { id: '1', label: 'Company Name', type: 'text', value: '', required: true },
            { id: '2', label: 'Industry', type: 'text', value: '', required: true }
          ]
        }
      ];
      set({ templates });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
