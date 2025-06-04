
import { create } from 'zustand';
import { documentGenerationApi } from '@/services/documentGeneration';
import type { Template, GeneratedDocument } from '@/types';

interface DocumentGenerationState {
  // State
  templates: Template[];
  selectedTemplate: Template | null;
  generatedDocuments: GeneratedDocument[];
  selectedDocument: GeneratedDocument | null;
  previewDocument: GeneratedDocument | null;
  
  // Loading and error states
  loading: boolean;
  isGenerating: boolean;
  error: string | null;
  
  // Actions
  fetchTemplates: () => Promise<void>;
  selectTemplate: (template: Template) => void;
  generateDocument: (data: { title: string; purpose: string; instructions?: string; templateId?: string }) => Promise<void>;
  generateDocumentFromForm: (formData: any) => Promise<void>;
  regenerateDocument: (documentId: string, changes?: any) => Promise<void>;
  fetchGeneratedDocuments: () => Promise<void>;
  selectDocument: (document: GeneratedDocument) => void;
  setPreviewDocument: (document: GeneratedDocument | null) => void;
  clearError: () => void;
}

/**
 * Document Generation Store
 * Manages document templates, generation, and regeneration
 */
export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  // Initial State
  templates: [],
  selectedTemplate: null,
  generatedDocuments: [],
  selectedDocument: null,
  previewDocument: null,
  loading: false,
  isGenerating: false,
  error: null,

  /**
   * Fetch available document templates
   */
  fetchTemplates: async () => {
    try {
      set({ loading: true, error: null });
      const apiTemplates = await documentGenerationApi.getTemplates();
      // Transform to match Template interface
      const templates: Template[] = apiTemplates.map(template => ({
        ...template,
        category: template.category || 'General',
        fields: template.fields.map(field => ({
          name: field.id,
          type: field.type as 'text' | 'textarea' | 'select' | 'date',
          label: field.label,
          required: field.required,
          options: (field as any).options,
          value: field.value
        }))
      }));
      set({ templates });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Select a template for document generation
   */
  selectTemplate: (template) => {
    set({ selectedTemplate: template });
  },

  /**
   * Generate a new document
   */
  generateDocument: async (data) => {
    try {
      set({ isGenerating: true, error: null });
      const apiDocument = await documentGenerationApi.generateDocument(data);
      // Transform to match GeneratedDocument interface
      const document: GeneratedDocument = {
        ...apiDocument,
        templateId: apiDocument.templateId || '',
        purpose: data.purpose,
        instructions: data.instructions,
        status: apiDocument.status === 'failed' ? 'error' : apiDocument.status as 'generating' | 'completed' | 'error'
      };
      set(state => ({
        generatedDocuments: [document, ...state.generatedDocuments]
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isGenerating: false });
    }
  },

  /**
   * Generate document from form data
   */
  generateDocumentFromForm: async (formData) => {
    try {
      set({ isGenerating: true, error: null });
      const apiDocument = await documentGenerationApi.generateDocument(formData);
      // Transform to match GeneratedDocument interface
      const document: GeneratedDocument = {
        ...apiDocument,
        templateId: apiDocument.templateId || '',
        purpose: formData.purpose || '',
        instructions: formData.instructions,
        status: apiDocument.status === 'failed' ? 'error' : apiDocument.status as 'generating' | 'completed' | 'error'
      };
      set(state => ({
        generatedDocuments: [document, ...state.generatedDocuments]
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isGenerating: false });
    }
  },

  /**
   * Regenerate an existing document with changes
   */
  regenerateDocument: async (documentId, changes) => {
    try {
      set({ isGenerating: true, error: null });
      const apiDocument = await documentGenerationApi.regenerateDocument(documentId, changes);
      // Transform to match GeneratedDocument interface
      const document: GeneratedDocument = {
        ...apiDocument,
        templateId: apiDocument.templateId || '',
        purpose: changes?.purpose || '',
        instructions: changes?.instructions,
        status: apiDocument.status === 'failed' ? 'error' : apiDocument.status as 'generating' | 'completed' | 'error'
      };
      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc => 
          doc.id === documentId ? document : doc
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isGenerating: false });
    }
  },

  /**
   * Fetch all generated documents
   */
  fetchGeneratedDocuments: async () => {
    try {
      set({ loading: true, error: null });
      const apiDocuments = await documentGenerationApi.getGeneratedDocuments();
      // Transform to match GeneratedDocument interface
      const documents: GeneratedDocument[] = apiDocuments.map(doc => ({
        ...doc,
        templateId: doc.templateId || '',
        purpose: doc.purpose || 'Document generation',
        instructions: doc.instructions,
        status: doc.status === 'failed' ? 'error' : doc.status as 'generating' | 'completed' | 'error'
      }));
      set({ generatedDocuments: documents });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Select a document for viewing/editing
   */
  selectDocument: (document) => {
    set({ selectedDocument: document });
  },

  /**
   * Set preview document
   */
  setPreviewDocument: (document) => {
    set({ previewDocument: document });
  },

  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  }
}));
