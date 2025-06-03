
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
  url?: string;
  status?: 'processing' | 'ready' | 'error';
}

interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  loading: boolean;
  error: string | null;
  uploadProgress: number;
  
  // Actions
  fetchDocuments: () => Promise<void>;
  getDocument: (id: string) => Promise<void>;
  createDocument: (file: File, folderId?: string) => Promise<Document>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  shareDocument: (id: string, shareData: any) => Promise<void>;
  searchDocuments: (query: string) => Promise<Document[]>;
  bulkDeleteDocuments: (ids: string[]) => Promise<void>;
  setSelectedDocument: (document: Document | null) => void;
  clearError: () => void;
  resetUploadProgress: () => void;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,
  uploadProgress: 0,

  fetchDocuments: async () => {
    try {
      set({ loading: true, error: null });
      const documents = await documentsApi.getAll() as Document[];
      set({ documents });
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error fetching documents:', error);
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
      console.error('Error fetching document:', error);
    } finally {
      set({ loading: false });
    }
  },

  createDocument: async (file: File, folderId?: string) => {
    try {
      set({ loading: true, error: null, uploadProgress: 0 });
      
      const formData = new FormData();
      formData.append('file', file);
      if (folderId) formData.append('folderId', folderId);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        set(state => ({ 
          uploadProgress: Math.min(state.uploadProgress + 10, 90) 
        }));
      }, 200);
      
      const document = await documentsApi.create(formData) as Document;
      
      clearInterval(progressInterval);
      set({ uploadProgress: 100 });
      
      set(state => ({ 
        documents: [...state.documents, document],
        uploadProgress: 0
      }));
      
      return document;
    } catch (error: any) {
      set({ error: error.message, uploadProgress: 0 });
      console.error('Error creating document:', error);
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
        documents: state.documents.map(doc => 
          doc.id === id ? updatedDocument : doc
        ),
        selectedDocument: state.selectedDocument?.id === id 
          ? updatedDocument 
          : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error updating document:', error);
      throw error;
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
        selectedDocument: state.selectedDocument?.id === id 
          ? null 
          : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error deleting document:', error);
      throw error;
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
      console.error('Error sharing document:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  searchDocuments: async (query: string) => {
    try {
      set({ loading: true, error: null });
      // For now, implement client-side search
      const { documents } = get();
      const filtered = documents.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      return filtered;
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error searching documents:', error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  bulkDeleteDocuments: async (ids: string[]) => {
    try {
      set({ loading: true, error: null });
      await Promise.all(ids.map(id => documentsApi.delete(id)));
      
      set(state => ({
        documents: state.documents.filter(doc => !ids.includes(doc.id)),
        selectedDocument: ids.includes(state.selectedDocument?.id || '') 
          ? null 
          : state.selectedDocument
      }));
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error bulk deleting documents:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setSelectedDocument: (document: Document | null) => {
    set({ selectedDocument: document });
  },

  clearError: () => set({ error: null }),
  
  resetUploadProgress: () => set({ uploadProgress: 0 })
}));
