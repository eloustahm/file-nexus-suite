
import { create } from 'zustand';
import { documentGenerationApi } from '@/services/documentGeneration';

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: TemplateField[];
}

interface TemplateField {
  id: string;
  label: string;
  type: string;
  value: string;
  required: boolean;
  placeholder?: string;
}

interface GeneratedDocument {
  id: string;
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
  content: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
  isSelected: boolean;
}

interface DocumentFormData {
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
}

interface DocumentGenerationState {
  templates: DocumentTemplate[];
  generatedDocuments: GeneratedDocument[];
  selectedDocument: GeneratedDocument | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchTemplates: () => Promise<void>;
  fetchGeneratedDocuments: () => Promise<void>;
  generateDocument: (data: DocumentFormData) => Promise<void>;
  regenerateDocument: (documentId: string, data: DocumentFormData) => Promise<void>;
  selectDocument: (documentId: string) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  downloadDocument: (documentId: string) => Promise<void>;
  setSelectedDocument: (document: GeneratedDocument | null) => void;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  templates: [],
  generatedDocuments: [],
  selectedDocument: null,
  loading: false,
  error: null,

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

  generateDocument: async (data: DocumentFormData) => {
    try {
      set({ loading: true, error: null });
      const document = await documentGenerationApi.generateDocument(data);
      set(state => ({ 
        generatedDocuments: [document, ...state.generatedDocuments] 
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  regenerateDocument: async (documentId: string, data: DocumentFormData) => {
    try {
      set({ loading: true, error: null });
      const document = await documentGenerationApi.regenerateDocument(documentId, data);
      set(state => ({
        generatedDocuments: state.generatedDocuments.map(doc => 
          doc.id === documentId ? document : doc
        ),
        selectedDocument: state.selectedDocument?.id === documentId ? document : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
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
      throw error;
    }
  },

  deleteDocument: async (documentId: string) => {
    try {
      set({ loading: true, error: null });
      await documentGenerationApi.deleteDocument(documentId);
      set(state => ({
        generatedDocuments: state.generatedDocuments.filter(doc => doc.id !== documentId),
        selectedDocument: state.selectedDocument?.id === documentId ? null : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  downloadDocument: async (documentId: string) => {
    try {
      const blob = await documentGenerationApi.downloadDocument(documentId);
      const document = get().generatedDocuments.find(doc => doc.id === documentId);
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document?.title || 'document';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  setSelectedDocument: (document) => set({ selectedDocument: document }),

  clearError: () => set({ error: null })
}));
