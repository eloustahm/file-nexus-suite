
import { create } from 'zustand';

interface FoldersUIState {
  selectedFolders: string[];
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'modified' | 'size';
  sortOrder: 'asc' | 'desc';
  showNewFolderDialog: boolean;
  
  // Actions
  setSelectedFolders: (folders: string[]) => void;
  toggleFolderSelection: (folderId: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  setShowNewFolderDialog: (show: boolean) => void;
  reset: () => void;
}

export const useFoldersUIStore = create<FoldersUIState>((set) => ({
  selectedFolders: [],
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',
  showNewFolderDialog: false,
  
  setSelectedFolders: (folders) => set({ selectedFolders: folders }),
  
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
  
  reset: () => set({
    selectedFolders: [],
    viewMode: 'grid',
    sortBy: 'name',
    sortOrder: 'asc',
    showNewFolderDialog: false,
  }),
}));
