
import { create } from 'zustand';
import { Agent, DocumentTemplate, TemplateField } from '@/pages/components/Document/types/generatorTypes';

interface GeneratedDocument {
  id: string;
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
  content: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: Date;
  wordCount?: number;
  isSelected: boolean;
}

interface GenerationProgress {
  step: number;
  totalSteps: number;
  currentTask: string;
  completed: boolean;
}

interface DocumentFormData {
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
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
  generatedDocuments: GeneratedDocument[];
  loading: boolean;
  error: string | null;
  
  setSelectedTemplate: (template: DocumentTemplate | null) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  updateFieldValue: (fieldId: string, value: string) => void;
  addCustomField: (field: TemplateField) => void;
  removeField: (fieldId: string) => void;
  generateDocument: () => Promise<void>;
  generateDocumentFromForm: (data: DocumentFormData) => Promise<void>;
  regenerateDocument: (documentId: string, data: DocumentFormData) => Promise<void>;
  setEditMode: (editing: boolean) => void;
  updateEditedContent: (content: string) => void;
  resetGeneration: () => void;
  fetchTemplates: () => Promise<void>;
  fetchGeneratedDocuments: () => Promise<void>;
  selectDocument: (documentId: string) => void;
  deleteDocument: (documentId: string) => void;
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
  generatedDocuments: [],
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

  generateDocumentFromForm: async (data: DocumentFormData) => {
    try {
      set({ isGenerating: true, error: null });

      // Mock generation process
      const documentId = crypto.randomUUID();
      const newDocument: GeneratedDocument = {
        id: documentId,
        title: data.title,
        purpose: data.purpose,
        instructions: data.instructions,
        templateId: data.templateId,
        content: '',
        status: 'generating',
        createdAt: new Date(),
        isSelected: false
      };

      set(state => ({
        generatedDocuments: [newDocument, ...state.generatedDocuments]
      }));

      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockContent = `# ${data.title}\n\n## Purpose\n${data.purpose}\n\n## Content\n\nThis is a generated document based on your requirements.\n\n${data.instructions ? `## Instructions\n${data.instructions}\n\n` : ''}Generated on: ${new Date().toLocaleDateString()}\nWord count: ~500 words`;

      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc =>
          doc.id === documentId
            ? { ...doc, content: mockContent, status: 'completed', wordCount: 500 }
            : doc
        )
      }));

    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isGenerating: false });
    }
  },

  regenerateDocument: async (documentId: string, data: DocumentFormData) => {
    try {
      set({ isGenerating: true, error: null });

      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc =>
          doc.id === documentId
            ? { ...doc, status: 'generating' as const, title: data.title, purpose: data.purpose, instructions: data.instructions, templateId: data.templateId }
            : doc
        )
      }));

      // Simulate regeneration
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockContent = `# ${data.title} (Regenerated)\n\n## Purpose\n${data.purpose}\n\n## Content\n\nThis is a regenerated document with updated requirements.\n\n${data.instructions ? `## Instructions\n${data.instructions}\n\n` : ''}Regenerated on: ${new Date().toLocaleDateString()}\nWord count: ~520 words`;

      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc =>
          doc.id === documentId
            ? { ...doc, content: mockContent, status: 'completed', wordCount: 520, createdAt: new Date() }
            : doc
        )
      }));

    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isGenerating: false });
    }
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

      setTimeout(() => {
        set({ generationProgress: { step: 2, totalSteps: 3, currentTask: 'Generating content...', completed: false } });
      }, 1000);

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
      const templates: DocumentTemplate[] = [
        {
          id: '1',
          name: 'Business Plan',
          description: 'Professional business plan template',
          type: 'business',
          fields: [
            { 
              id: '1', 
              label: 'Company Name', 
              type: 'text', 
              value: '', 
              required: true,
              placeholder: 'Enter company name'
            },
            { 
              id: '2', 
              label: 'Industry', 
              type: 'text', 
              value: '', 
              required: true,
              placeholder: 'Enter industry'
            }
          ]
        },
        {
          id: '2',
          name: 'Contract Agreement',
          description: 'Legal contract template',
          type: 'legal',
          fields: [
            { 
              id: '1', 
              label: 'Party A', 
              type: 'text', 
              value: '', 
              required: true,
              placeholder: 'Enter first party name'
            },
            { 
              id: '2', 
              label: 'Party B', 
              type: 'text', 
              value: '', 
              required: true,
              placeholder: 'Enter second party name'
            }
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

  fetchGeneratedDocuments: async () => {
    try {
      set({ loading: true });
      
      // Mock generated documents
      const mockDocuments: GeneratedDocument[] = [
        {
          id: '1',
          title: 'Q4 Business Plan',
          purpose: 'Strategic planning for Q4 2024',
          content: '# Q4 Business Plan\n\n## Executive Summary\n\nThis document outlines our strategic objectives...',
          status: 'completed',
          createdAt: new Date(Date.now() - 86400000),
          wordCount: 1250,
          isSelected: true
        },
        {
          id: '2',
          title: 'Service Agreement',
          purpose: 'Contract for consulting services',
          content: '# Service Agreement\n\n## Terms and Conditions\n\nThis agreement governs...',
          status: 'completed',
          createdAt: new Date(Date.now() - 172800000),
          wordCount: 890,
          isSelected: false
        }
      ];
      
      set({ generatedDocuments: mockDocuments });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  selectDocument: (documentId: string) => {
    set(state => ({
      generatedDocuments: state.generatedDocuments.map(doc => ({
        ...doc,
        isSelected: doc.id === documentId
      }))
    }));
  },

  deleteDocument: (documentId: string) => {
    set(state => ({
      generatedDocuments: state.generatedDocuments.filter(doc => doc.id !== documentId)
    }));
  },

  clearError: () => set({ error: null })
}));
