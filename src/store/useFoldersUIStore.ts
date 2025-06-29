
import { create } from 'zustand';

interface FoldersUIState {
  selectedFolders: string[];
  selectedFolderId: string | null;
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'modified' | 'size';
  sortOrder: 'asc' | 'desc';
  showNewFolderDialog: boolean;
  showCreateModal: boolean;
  showDeleteConfirm: string | null;
  searchQuery: string;
  
  // Actions
  setSelectedFolders: (folders: string[]) => void;
  setSelectedFolderId: (folderId: string | null) => void;
  toggleFolderSelection: (folderId: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  setShowNewFolderDialog: (show: boolean) => void;
  setShowCreateModal: (show: boolean) => void;
  setShowDeleteConfirm: (folderId: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  reset: () => void;
}

export const useFoldersUIStore = create<FoldersUIState>((set) => ({
  selectedFolders: [],
  selectedFolderId: null,
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',
  showNewFolderDialog: false,
  showCreateModal: false,
  showDeleteConfirm: null,
  searchQuery: '',
  
  setSelectedFolders: (folders) => set({ selectedFolders: folders }),
  
  setSelectedFolderId: (folderId) => set({ selectedFolderId: folderId }),
  
  toggleFolderSelection: (folderId) => set((state) => ({
    selectedFolders: state.selectedFolders.includes(folderId)
      ? state.selectedFolders.filter(id => id !== folderId)
      : [...state.selectedFolders, folderId]
  })),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  setSorting: (sortBy, sortOrder) => set({ 
    sortBy: sortBy as 'name' | 'modified' | 'size', 
    sortOrder 
  }),
  
  setShowNewFolderDialog: (show) => set({ showNewFolderDialog: show }),
  
  setShowCreateModal: (show) => set({ showCreateModal: show }),
  
  setShowDeleteConfirm: (folderId) => set({ showDeleteConfirm: folderId }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  clearFilters: () => set({
    searchQuery: '',
    selectedFolders: [],
    selectedFolderId: null,
  }),
  
  reset: () => set({
    selectedFolders: [],
    selectedFolderId: null,
    viewMode: 'grid',
    sortBy: 'name',
    sortOrder: 'asc',
    showNewFolderDialog: false,
    showCreateModal: false,
    showDeleteConfirm: null,
    searchQuery: '',
  }),
}));
