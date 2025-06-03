
import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface GeneratedDocument {
  id: string;
  title: string;
  content: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Template {
  id: string;
  name: string;
  description: string;
  fields: Record<string, any>;
}

interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface DocumentGenerationState {
  generatedDocuments: GeneratedDocument[];
  templates: Template[];
  selectedTemplate: Template | null;
  selectedAgent: Agent | null;
  generatedContent: string;
  isGenerating: boolean;
  isEditing: boolean;
  editedContent: string;
  loading: boolean;
  error: string | null;
  generateDocument: (templateId?: string, data?: Record<string, any>) => Promise<GeneratedDocument | undefined>;
  fetchTemplates: () => Promise<void>;
  setSelectedTemplate: (template: Template | null) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  updateFieldValue: (field: string, value: any) => void;
  addCustomField: (field: string, value: any) => void;
  removeField: (field: string) => void;
  setEditMode: (editing: boolean) => void;
  updateEditedContent: (content: string) => void;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  generatedDocuments: [],
  templates: [],
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
      // Mock templates for now
      const mockTemplates: Template[] = [
        {
          id: '1',
          name: 'Business Proposal',
          description: 'Professional business proposal template',
          fields: { title: '', company: '', description: '' }
        },
        {
          id: '2',
          name: 'Legal Contract',
          description: 'Standard legal contract template',
          fields: { parties: '', terms: '', duration: '' }
        }
      ];
      set({ templates: mockTemplates });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedTemplate: (template) => {
    set({ selectedTemplate: template });
  },

  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  updateFieldValue: (field, value) => {
    set((state) => ({
      selectedTemplate: state.selectedTemplate ? {
        ...state.selectedTemplate,
        fields: { ...state.selectedTemplate.fields, [field]: value }
      } : null
    }));
  },

  addCustomField: (field, value) => {
    set((state) => ({
      selectedTemplate: state.selectedTemplate ? {
        ...state.selectedTemplate,
        fields: { ...state.selectedTemplate.fields, [field]: value }
      } : null
    }));
  },

  removeField: (field) => {
    set((state) => {
      if (!state.selectedTemplate) return state;
      const { [field]: removed, ...remainingFields } = state.selectedTemplate.fields;
      return {
        selectedTemplate: {
          ...state.selectedTemplate,
          fields: remainingFields
        }
      };
    });
  },

  setEditMode: (editing) => {
    set({ isEditing: editing });
  },

  updateEditedContent: (content) => {
    set({ editedContent: content, generatedContent: content });
  },

  generateDocument: async (templateId?: string, data?: Record<string, any>) => {
    try {
      set({ isGenerating: true, error: null });
      
      const { selectedTemplate } = get();
      const finalTemplateId = templateId || selectedTemplate?.id || '1';
      const finalData = data || selectedTemplate?.fields || {};
      
      const response = await aiApi.generateDocument(finalTemplateId, finalData);
      
      const newDocument = {
        id: Date.now().toString(),
        title: `Generated Document - ${new Date().toLocaleDateString()}`,
        content: (response as any)?.content || 'Document generation completed',
        templateId: finalTemplateId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      set((state) => ({
        generatedDocuments: [...state.generatedDocuments, newDocument],
        generatedContent: newDocument.content,
        editedContent: newDocument.content,
        isGenerating: false
      }));

      return newDocument;
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to generate document';
      set({ error: errorMessage, isGenerating: false });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null })
}));
