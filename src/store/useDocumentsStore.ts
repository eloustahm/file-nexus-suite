
import { create } from 'zustand';
import { documentsApi } from '@/services/api';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  folderId?: string;
  content?: string;
  tags?: string[];
}

interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  loading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>;
  getDocument: (id: string) => Promise<void>;
  createDocument: (file: File, folderId?: string) => Promise<void>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  shareDocument: (id: string, shareData: any) => Promise<void>;
  clearError: () => void;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,

  fetchDocuments: async () => {
    try {
      set({ loading: true, error: null });
      const documents = await documentsApi.getAll() as Document[];
      set({ documents });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getDocument: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const document = await documentsApi.getById(id) as Document;
      set({ selectedDocument: document });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createDocument: async (file: File, folderId?: string) => {
    try {
      set({ loading: true, error: null });
      const formData = new FormData();
      formData.append('file', file);
      if (folderId) formData.append('folderId', folderId);
      
      const document = await documentsApi.create(formData) as Document;
      set(state => ({ documents: [...state.documents, document] }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateDocument: async (id: string, data: Partial<Document>) => {
    try {
      set({ loading: true, error: null });
      const updatedDocument = await documentsApi.update(id, data) as Document;
      set(state => ({
        documents: state.documents.map(doc => doc.id === id ? updatedDocument : doc),
        selectedDocument: state.selectedDocument?.id === id ? updatedDocument : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteDocument: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await documentsApi.delete(id);
      set(state => ({
        documents: state.documents.filter(doc => doc.id !== id),
        selectedDocument: state.selectedDocument?.id === id ? null : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  shareDocument: async (id: string, shareData: any) => {
    try {
      set({ loading: true, error: null });
      await documentsApi.share(id, shareData);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
