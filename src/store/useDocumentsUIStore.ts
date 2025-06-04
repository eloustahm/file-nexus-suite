
import { create } from 'zustand';

interface DocumentsUIState {
  // UI state only - no server data
  searchQuery: string;
  selectedDocumentIds: string[];
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortOrder: 'asc' | 'desc';
  filterTags: string[];
  showUploadModal: boolean;
  showDeleteConfirm: string | null; // document ID to delete
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedDocuments: (ids: string[]) => void;
  toggleDocumentSelection: (id: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  setFilterTags: (tags: string[]) => void;
  setShowUploadModal: (show: boolean) => void;
  setShowDeleteConfirm: (id: string | null) => void;
  clearFilters: () => void;
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
  clearFilters: () => set({ 
    searchQuery: '', 
    filterTags: [], 
    sortBy: 'name', 
    sortOrder: 'asc' 
  }),
}));
