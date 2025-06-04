
import { create } from 'zustand';

/**
 * Documents UI Store - Manages only UI state for documents interface
 */
interface DocumentsUIState {
  // Search and filtering
  searchQuery: string;
  selectedDocumentIds: string[];
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortOrder: 'asc' | 'desc';
  filterTags: string[];
  
  // Modal and dialog UI state
  showUploadModal: boolean;
  showDeleteConfirm: boolean;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedDocuments: (ids: string[]) => void;
  toggleDocumentSelection: (id: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSorting: (sortBy: 'name' | 'date' | 'size' | 'type', sortOrder: 'asc' | 'desc') => void;
  setFilterTags: (tags: string[]) => void;
  setShowUploadModal: (show: boolean) => void;
  setShowDeleteConfirm: (show: boolean) => void;
  clearFilters: () => void;
}

export const useDocumentsUIStore = create<DocumentsUIState>((set, get) => ({
  searchQuery: '',
  selectedDocumentIds: [],
  viewMode: 'grid',
  sortBy: 'date',
  sortOrder: 'desc',
  filterTags: [],
  showUploadModal: false,
  showDeleteConfirm: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedDocuments: (ids) => set({ selectedDocumentIds: ids }),
  toggleDocumentSelection: (id) => {
    const current = get().selectedDocumentIds;
    const isSelected = current.includes(id);
    set({
      selectedDocumentIds: isSelected
        ? current.filter(docId => docId !== id)
        : [...current, id]
    });
  },
  setViewMode: (mode) => set({ viewMode: mode }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setFilterTags: (tags) => set({ filterTags: tags }),
  setShowUploadModal: (show) => set({ showUploadModal: show }),
  setShowDeleteConfirm: (show) => set({ showDeleteConfirm: show }),
  clearFilters: () => set({ 
    searchQuery: '', 
    filterTags: [], 
    selectedDocumentIds: [] 
  }),
}));
