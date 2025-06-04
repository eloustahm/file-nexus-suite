
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
      const templates = await documentGenerationApi.getTemplates();
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
      const document = await documentGenerationApi.generateDocument(data);
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
      const document = await documentGenerationApi.generateDocument(formData);
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
      const document = await documentGenerationApi.regenerateDocument(documentId, changes);
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
      const documents = await documentGenerationApi.getGeneratedDocuments();
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
