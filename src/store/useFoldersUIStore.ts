
import { create } from 'zustand';

/**
 * UI-only state for folders (no server data)
 */
interface FoldersUIState {
  // UI State
  searchQuery: string;
  viewMode: 'list' | 'grid';
  selectedFolderId: string | null;
  showCreateModal: boolean;
  showDeleteConfirm: boolean;
  
  // UI Actions
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'list' | 'grid') => void;
  setSelectedFolderId: (id: string | null) => void;
  setShowCreateModal: (show: boolean) => void;
  setShowDeleteConfirm: (show: boolean) => void;
  clearFilters: () => void;
}

export const useFoldersUIStore = create<FoldersUIState>((set) => ({
  // Initial UI state
  searchQuery: '',
  viewMode: 'list',
  selectedFolderId: null,
  showCreateModal: false,
  showDeleteConfirm: false,

  // UI Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedFolderId: (id) => set({ selectedFolderId: id }),
  setShowCreateModal: (show) => set({ showCreateModal: show }),
  setShowDeleteConfirm: (show) => set({ showDeleteConfirm: show }),
  clearFilters: () => set({ searchQuery: '', selectedFolderId: null }),
}));
