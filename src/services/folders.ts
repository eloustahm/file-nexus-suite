
import { http } from '@/lib/api';

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  documentCount: number;
  type?: 'folder' | 'shared';
}

/**
 * Folders API service
 */
export const foldersApi = {
  // Get all folders
  getAll: async (): Promise<Folder[]> => {
    return http.get<Folder[]>('/api/folders');
  },
  
  // Create folder
  create: async (folderData: { name: string; parentId?: string; description?: string }): Promise<Folder> => {
    return http.post<Folder>('/api/folders', folderData);
  },
  
  // Update folder
  update: async (id: string, data: Partial<Folder>): Promise<Folder> => {
    return http.put<Folder>(`/api/folders/${id}`, data);
  },
  
  // Delete folder
  delete: async (id: string): Promise<void> => {
    return http.delete<void>(`/api/folders/${id}`);
  },
  
  // Get folder documents
  getDocuments: async (id: string) => {
    return http.get(`/api/folders/${id}/documents`);
  }
};
