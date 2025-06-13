import { http } from '@/lib/api';
import type { Folder, Document } from '@/types';

export const foldersService = {
  async getAll(): Promise<Folder[]> {
    return http.get<Folder[]>('/folders');
  },

  async create(folderData: { name: string; parentId?: string; description?: string }): Promise<Folder> {
    return http.post<Folder>('/folders', folderData);
  },

  async update(id: string, data: Partial<Folder>): Promise<Folder> {
    return http.patch<Folder>(`/folders/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await http.delete<void>(`/folders/${id}`);
  },

  async getDocuments(id: string): Promise<Document[]> {
    const response = await http.get<{ documents: Document[] }>(`/folders/${id}/documents`);
    return response.documents;
  }
};
