
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { foldersApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

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

interface FoldersContextState extends BaseContextState {
  folders: Folder[];
  selectedFolder: Folder | null;
}

interface FoldersContextActions extends BaseContextActions {
  fetchFolders: () => Promise<void>;
  createFolder: (data: { name: string; description?: string; parentId?: string }) => Promise<void>;
  updateFolder: (id: string, data: Partial<Folder>) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
}

interface FoldersContextValue extends FoldersContextState, FoldersContextActions {}

const FoldersContext = createContext<FoldersContextValue | undefined>(undefined);

export const FoldersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchFolders = async () => {
    await handleAsyncAction(
      async () => {
        const data = await foldersApi.getAll() as Folder[];
        setFolders(data);
      },
      setLoading,
      setError
    );
  };

  const createFolder = async (data: { name: string; description?: string; parentId?: string }) => {
    await handleAsyncAction(
      async () => {
        const folder = await foldersApi.create(data) as Folder;
        setFolders(prev => [...prev, folder]);
      },
      setLoading,
      setError
    );
  };

  const updateFolder = async (id: string, data: Partial<Folder>) => {
    await handleAsyncAction(
      async () => {
        const updatedFolder = await foldersApi.update(id, data) as Folder;
        setFolders(prev => prev.map(folder => folder.id === id ? updatedFolder : folder));
      },
      setLoading,
      setError
    );
  };

  const deleteFolder = async (id: string) => {
    await handleAsyncAction(
      async () => {
        await foldersApi.delete(id);
        setFolders(prev => prev.filter(folder => folder.id !== id));
      },
      setLoading,
      setError
    );
  };

  const value: FoldersContextValue = {
    folders,
    selectedFolder,
    loading,
    error,
    fetchFolders,
    createFolder,
    updateFolder,
    deleteFolder,
    ...baseActions,
  };

  return <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>;
};

export const useFolders = () => {
  const context = useContext(FoldersContext);
  if (context === undefined) {
    throw new Error('useFolders must be used within a FoldersProvider');
  }
  return context;
};
