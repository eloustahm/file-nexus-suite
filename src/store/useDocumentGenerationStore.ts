
import { create } from 'zustand';
import { 
  documentGenerationApi, 
  DocumentTemplate, 
  TemplateField, 
  GeneratedDocument, 
  DocumentFormData 
} from '@/services/documentGeneration';

interface GenerationProgress {
  step: number;
  totalSteps: number;
  currentTask: string;
  completed: boolean;
}

interface DocumentGenerationState {
  selectedTemplate: DocumentTemplate | null;
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
  selectDocument: (documentId: string) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  selectedTemplate: null,
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

      const newDocument = await documentGenerationApi.generateDocument(data);
      
      set(state => ({
        generatedDocuments: [newDocument, ...state.generatedDocuments]
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
            ? { ...doc, status: 'generating' as const }
            : doc
        )
      }));

      const updatedDocument = await documentGenerationApi.regenerateDocument(documentId, data);

      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc =>
          doc.id === documentId ? updatedDocument : doc
        )
      }));

    } catch (error: any) {
      set({ error: error.message });
      
      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc =>
          doc.id === documentId
            ? { ...doc, status: 'failed' as const }
            : doc
        )
      }));
    } finally {
      set({ isGenerating: false });
    }
  },

  generateDocument: async () => {
    const { selectedTemplate } = get();
    
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

      // Create form data from template
      const formData: DocumentFormData = {
        title: selectedTemplate.name,
        purpose: `Document generated from ${selectedTemplate.name} template`,
        instructions: selectedTemplate.fields.map(field => `${field.label}: ${field.value || 'Not specified'}`).join('\n'),
        templateId: selectedTemplate.id
      };

      const newDocument = await documentGenerationApi.generateDocument(formData);

      set({ 
        generatedContent: newDocument.content,
        editedContent: newDocument.content,
        generationProgress: { step: 3, totalSteps: 3, currentTask: 'Complete!', completed: true }
      });

      // Add to documents list
      set(state => ({
        generatedDocuments: [newDocument, ...state.generatedDocuments]
      }));

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
      const templates = await documentGenerationApi.getTemplates();
      set({ templates });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchGeneratedDocuments: async () => {
    try {
      set({ loading: true, error: null });
      const documents = await documentGenerationApi.getGeneratedDocuments();
      set({ generatedDocuments: documents });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  selectDocument: async (documentId: string) => {
    try {
      await documentGenerationApi.selectDocument(documentId);
      
      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc => ({
          ...doc,
          isSelected: doc.id === documentId
        }))
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteDocument: async (documentId: string) => {
    try {
      await documentGenerationApi.deleteDocument(documentId);
      
      set(state => ({
        generatedDocuments: state.generatedDocuments.filter(doc => doc.id !== documentId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null })
}));
