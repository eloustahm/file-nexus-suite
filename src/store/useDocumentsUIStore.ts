
import { create } from 'zustand';

/**
 * Documents UI Store - Manages only UI state for documents interface
 * Server data (documents list, etc.) is handled by React Query in useDocuments hook
 */
interface DocumentsUIState {
  // Search and filtering UI state
  searchQuery: string;
  selectedDocumentIds: string[];
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortOrder: 'asc' | 'desc';
  filterTags: string[];
  
  // Modal and dialog UI state
  showUploadModal: boolean;
  showDeleteConfirm: string | null; // document ID to delete
  showShareModal: string | null; // document ID to share
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedDocuments: (ids: string[]) => void;
  toggleDocumentSelection: (id: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSorting: (sortBy: 'name' | 'date' | 'size' | 'type', sortOrder: 'asc' | 'desc') => void;
  setFilterTags: (tags: string[]) => void;
  setShowUploadModal: (show: boolean) => void;
  setShowDeleteConfirm: (id: string | null) => void;
  setShowShareModal: (id: string | null) => void;
  clearFilters: () => void;
  clearSelections: () => void;
}

export const useDocumentsUIStore = create<DocumentsUIState>((set, get) => ({
  searchQuery: '',
  selectedDocumentIds: [],
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',
  filterTags: [],
  showUploadModal: false,
  showDeleteConfirm: null,
  showShareModal: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedDocuments: (ids) => set({ selectedDocumentIds: ids }),
  toggleDocumentSelection: (id) => {
    const { selectedDocumentIds } = get();
    const isSelected = selectedDocumentIds.includes(id);
    set({
      selectedDocumentIds: isSelected
        ? selectedDocumentIds.filter(docId => docId !== id)
        : [...selectedDocumentIds, id]
    });
  },
  setViewMode: (mode) => set({ viewMode: mode }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setFilterTags: (tags) => set({ filterTags: tags }),
  setShowUploadModal: (show) => set({ showUploadModal: show }),
  setShowDeleteConfirm: (id) => set({ showDeleteConfirm: id }),
  setShowShareModal: (id) => set({ showShareModal: id }),
  clearFilters: () => set({ 
    searchQuery: '', 
    filterTags: [], 
    sortBy: 'name', 
    sortOrder: 'asc' 
  }),
  clearSelections: () => set({ selectedDocumentIds: [] }),
}));
