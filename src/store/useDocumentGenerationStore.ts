
import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  fields: TemplateField[];
}

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date';
  required: boolean;
  value?: string;
  options?: string[];
  placeholder?: string;
}

interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  personality: string;
  icon: string;
  color: string;
  capabilities: string[];
}

interface DocumentGenerationState {
  templates: DocumentTemplate[];
  selectedTemplate: DocumentTemplate | null;
  selectedAgent: Agent | null;
  generatedContent: string;
  isGenerating: boolean;
  isEditing: boolean;
  editedContent: string;
  loading: boolean;
  error: string | null;

  // Actions
  fetchTemplates: () => Promise<void>;
  setSelectedTemplate: (template: DocumentTemplate) => void;
  setSelectedAgent: (agent: Agent) => void;
  updateFieldValue: (fieldId: string, value: string) => void;
  addCustomField: (field: TemplateField) => void;
  removeField: (fieldId: string) => void;
  generateDocument: () => Promise<void>;
  setEditMode: (editing: boolean) => void;
  updateEditedContent: (content: string) => void;
  saveDocument: (name: string) => Promise<void>;
  clearGeneration: () => void;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  templates: [
    {
      id: '1',
      name: 'Business Proposal',
      type: 'business',
      description: 'Professional business proposal template',
      fields: [
        { id: '1', label: 'Company Name', type: 'text', required: true, placeholder: 'Enter company name' },
        { id: '2', label: 'Project Title', type: 'text', required: true, placeholder: 'Enter project title' },
        { id: '3', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe your project' },
        { id: '4', label: 'Budget', type: 'number', required: false, placeholder: 'Enter budget amount' }
      ]
    },
    {
      id: '2',
      name: 'Contract Agreement',
      type: 'legal',
      description: 'Standard contract agreement template',
      fields: [
        { id: '1', label: 'Party A', type: 'text', required: true, placeholder: 'First party name' },
        { id: '2', label: 'Party B', type: 'text', required: true, placeholder: 'Second party name' },
        { id: '3', label: 'Terms', type: 'textarea', required: true, placeholder: 'Contract terms and conditions' },
        { id: '4', label: 'Duration', type: 'text', required: false, placeholder: 'Contract duration' }
      ]
    }
  ],
  selectedTemplate: null,
  selectedAgent: null,
  generatedContent: '',
  isGenerating: false,
  isEditing: false,
  editedContent: '',
  loading: false,
  error: null,

  fetchTemplates: async () => {
    try {
      set({ loading: true, error: null });
      // For now, use the static templates above
      // In the future, this would fetch from API
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedTemplate: (template: DocumentTemplate) => {
    set({ 
      selectedTemplate: { 
        ...template, 
        fields: template.fields.map(f => ({ ...f, value: '' })) 
      }
    });
  },

  setSelectedAgent: (agent: Agent) => {
    set({ selectedAgent: agent });
  },

  updateFieldValue: (fieldId: string, value: string) => {
    set(state => {
      if (!state.selectedTemplate) return state;
      
      return {
        selectedTemplate: {
          ...state.selectedTemplate,
          fields: state.selectedTemplate.fields.map(field => 
            field.id === fieldId ? { ...field, value } : field
          )
        }
      };
    });
  },

  addCustomField: (field: TemplateField) => {
    set(state => {
      if (!state.selectedTemplate) return state;
      
      return {
        selectedTemplate: {
          ...state.selectedTemplate,
          fields: [...state.selectedTemplate.fields, field]
        }
      };
    });
  },

  removeField: (fieldId: string) => {
    set(state => {
      if (!state.selectedTemplate) return state;
      
      return {
        selectedTemplate: {
          ...state.selectedTemplate,
          fields: state.selectedTemplate.fields.filter(field => field.id !== fieldId)
        }
      };
    });
  },

  generateDocument: async () => {
    const { selectedTemplate, selectedAgent } = get();
    
    if (!selectedTemplate || !selectedAgent) {
      set({ error: 'Please select both a template and an agent' });
      return;
    }

    try {
      set({ isGenerating: true, error: null });

      // Prepare template data
      const templateData = selectedTemplate.fields.reduce((acc, field) => {
        acc[field.label] = field.value || '';
        return acc;
      }, {} as Record<string, string>);

      // Call AI API for document generation
      const response = await aiApi.generateDocument(selectedTemplate.id, {
        templateData,
        agentPersonality: selectedAgent.personality
      });

      const generatedContent = response.content || `# ${selectedTemplate.name}\n\nGenerated content based on your template...`;
      
      set({ 
        generatedContent, 
        editedContent: generatedContent,
        isGenerating: false 
      });

    } catch (error: any) {
      set({ 
        error: error.message, 
        isGenerating: false 
      });
      console.error('Error generating document:', error);
    }
  },

  setEditMode: (editing: boolean) => {
    set({ isEditing: editing });
  },

  updateEditedContent: (content: string) => {
    set({ editedContent: content });
    if (!get().isEditing) {
      set({ generatedContent: content });
    }
  },

  saveDocument: async (name: string) => {
    const { editedContent } = get();
    
    try {
      set({ loading: true, error: null });
      
      // Create a document blob and save it
      const blob = new Blob([editedContent], { type: 'text/markdown' });
      const file = new File([blob], `${name}.md`, { type: 'text/markdown' });
      
      // You would typically save this through the documents API
      console.log('Saving document:', file);
      
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      console.error('Error saving document:', error);
    }
  },

  clearGeneration: () => {
    set({
      selectedTemplate: null,
      selectedAgent: null,
      generatedContent: '',
      editedContent: '',
      isEditing: false,
      isGenerating: false
    });
  },

  clearError: () => set({ error: null })
}));
