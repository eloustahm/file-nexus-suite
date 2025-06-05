
import { http } from '@/lib/api';

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  documentCount: number;
}

/**
 * Folders API service
 */
export const foldersApi = {
  // Get all folders
  getAll: async (): Promise<Folder[]> => {
    console.log('Fetching all folders');
    return http.get<Folder[]>('/api/folders');
  },

  // Create folder
  create: async (data: { name: string; parentId?: string; description?: string }): Promise<Folder> => {
    console.log('Creating folder:', data.name);
    return http.post<Folder>('/api/folders', data);
  },

  // Update folder
  update: async (id: string, data: Partial<Folder>): Promise<Folder> => {
    console.log('Updating folder:', id);
    return http.put<Folder>(`/api/folders/${id}`, data);
  },

  // Delete folder
  delete: async (id: string) => {
    console.log('Deleting folder:', id);
    return http.delete(`/api/folders/${id}`);
  }
};
