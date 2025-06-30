
import { http } from '@/lib/api';
import type { Folder } from '@/types';

export interface CreateFolderData {
  name: string;
  description?: string;
  parentId?: string;
}

export const foldersService = {
  async getFolders(): Promise<Folder[]> {
    return http.get<Folder[]>('/folders');
  },

  async getFolder(id: string): Promise<Folder> {
    return http.get<Folder>(`/folders/${id}`);
  },

  async createFolder(data: CreateFolderData): Promise<Folder> {
    return http.post<Folder>('/folders', data);
  },

  async updateFolder(id: string, data: Partial<Folder>): Promise<Folder> {
    return http.put<Folder>(`/folders/${id}`, data);
  },

  async deleteFolder(id: string): Promise<void> {
    return http.delete(`/folders/${id}`);
  },
};
