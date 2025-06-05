
import { create } from 'zustand';

/**
 * UI-only state for documents (no server data)
 */
interface DocumentsUIState {
  // UI State
  searchQuery: string;
  selectedDocumentIds: string[];
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortOrder: 'asc' | 'desc';
  filterTags: string[];
  showUploadModal: boolean;
  showDeleteConfirm: boolean;

  // UI Actions
  setSearchQuery: (query: string) => void;
  setSelectedDocuments: (ids: string[]) => void;
  toggleDocumentSelection: (id: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  setFilterTags: (tags: string[]) => void;
  setShowUploadModal: (show: boolean) => void;
  setShowDeleteConfirm: (show: boolean) => void;
  clearFilters: () => void;
}

export const useDocumentsUIStore = create<DocumentsUIState>((set) => ({
  // Initial UI state
  searchQuery: '',
  selectedDocumentIds: [],
  viewMode: 'grid',
  sortBy: 'date',
  sortOrder: 'desc',
  filterTags: [],
  showUploadModal: false,
  showDeleteConfirm: false,

  // UI Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedDocuments: (ids) => set({ selectedDocumentIds: ids }),
  toggleDocumentSelection: (id) =>
    set((state) => ({
      selectedDocumentIds: state.selectedDocumentIds.includes(id)
        ? state.selectedDocumentIds.filter((docId) => docId !== id)
        : [...state.selectedDocumentIds, id],
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setFilterTags: (tags) => set({ filterTags: tags }),
  setShowUploadModal: (show) => set({ showUploadModal: show }),
  setShowDeleteConfirm: (show) => set({ showDeleteConfirm: show }),
  clearFilters: () => set({ searchQuery: '', filterTags: [], selectedDocumentIds: [] }),
}));
