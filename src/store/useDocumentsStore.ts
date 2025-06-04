
import { create } from 'zustand';
import { documentsApi, Document, CreateDocumentData, ShareDocumentData } from '@/services/documents';

interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterTags: string[];
  sortBy: 'name' | 'date' | 'type' | 'size';
  sortOrder: 'asc' | 'desc';

  // Actions
  fetchDocuments: () => Promise<void>;
  getDocument: (id: string) => Promise<void>;
  createDocument: (data: CreateDocumentData) => Promise<void>;
  uploadDocument: (file: File) => Promise<void>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  shareDocument: (id: string, shareData: ShareDocumentData) => Promise<void>;
  downloadDocument: (id: string) => Promise<void>;
  setSelectedDocument: (document: Document | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterTags: (tags: string[]) => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  clearError: () => void;

  // Computed state
  filteredDocuments: Document[];
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,
  searchQuery: '',
  filterTags: [],
  sortBy: 'name',
  sortOrder: 'asc',

  fetchDocuments: async () => {
    try {
      set({ loading: true, error: null });
      const documents = await documentsApi.getAll();
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
      const document = await documentsApi.getById(id);
      set({ selectedDocument: document });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createDocument: async (data: CreateDocumentData) => {
    try {
      set({ loading: true, error: null });
      const document = await documentsApi.create(data);
      set(state => ({ documents: [document, ...state.documents] }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  uploadDocument: async (file: File) => {
    try {
      set({ loading: true, error: null });
      const formData = new FormData();
      formData.append('file', file);
      const document = await documentsApi.upload(formData);
      set(state => ({ documents: [document, ...state.documents] }));
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
      const updatedDocument = await documentsApi.update(id, data);
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

  shareDocument: async (id: string, shareData: ShareDocumentData) => {
    try {
      set({ loading: true, error: null });
      await documentsApi.share(id, shareData);
      // Refresh document to get updated sharing info
      const updatedDocument = await documentsApi.getById(id);
      set(state => ({
        documents: state.documents.map(doc => doc.id === id ? updatedDocument : doc)
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  downloadDocument: async (id: string) => {
    try {
      const blob = await documentsApi.download(id);
      const document = get().documents.find(doc => doc.id === id);
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document?.name || 'document';
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
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterTags: (tags) => set({ filterTags: tags }),
  setSorting: (sortBy, sortOrder) => set({ sortBy: sortBy as any, sortOrder }),
  clearError: () => set({ error: null }),

  get filteredDocuments() {
    const state = get();
    let filtered = [...state.documents];

    // Apply search filter
    if (state.searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Apply tag filter
    if (state.filterTags.length > 0) {
      filtered = filtered.filter(doc =>
        state.filterTags.some(tag => doc.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (state.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      return state.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }
}));
