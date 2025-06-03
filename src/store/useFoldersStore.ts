
import { create } from 'zustand';
import { foldersApi } from '@/services/api';

interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  documentCount: number;
  type?: 'folder' | 'shared';
}

interface FoldersState {
  folders: Folder[];
  selectedFolder: Folder | null;
  loading: boolean;
  error: string | null;
  fetchFolders: () => Promise<void>;
  createFolder: (data: { name: string; description?: string; parentId?: string }) => Promise<void>;
  updateFolder: (id: string, data: Partial<Folder>) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useFoldersStore = create<FoldersState>((set, get) => ({
  folders: [],
  selectedFolder: null,
  loading: false,
  error: null,

  fetchFolders: async () => {
    try {
      set({ loading: true, error: null });
      const folders = await foldersApi.getAll() as Folder[];
      set({ folders });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createFolder: async (data: { name: string; description?: string; parentId?: string }) => {
    try {
      set({ loading: true, error: null });
      const folder = await foldersApi.create(data) as Folder;
      set(state => ({ folders: [...state.folders, folder] }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateFolder: async (id: string, data: Partial<Folder>) => {
    try {
      set({ loading: true, error: null });
      const updatedFolder = await foldersApi.update(id, data) as Folder;
      set(state => ({
        folders: state.folders.map(folder => folder.id === id ? updatedFolder : folder)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteFolder: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await foldersApi.delete(id);
      set(state => ({
        folders: state.folders.filter(folder => folder.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
