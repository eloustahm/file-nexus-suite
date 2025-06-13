import { http } from '@/lib/api';
import type { Document, CreateDocumentData, ShareDocumentData, DocumentVersion } from '@/types';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  folderId?: string;
  isShared: boolean;
  sharedWith: string[];
  tags: string[];
  status: 'active' | 'archived' | 'deleted';
}

export interface CreateDocumentData {
  name: string;
  content: string;
  type: string;
  folderId?: string;
  tags?: string[];
}

export interface ShareDocumentData {
  userIds: string[];
  permissions: 'read' | 'write' | 'admin';
  expiresAt?: string;
}

/**
 * Documents API service
 */
export const documentsService = {
  async getAll(): Promise<Document[]> {
    return http.get<Document[]>('/documents');
  },

  async getById(id: string): Promise<Document> {
    return http.get<Document>(`/documents/${id}`);
  },

  async create(data: CreateDocumentData): Promise<Document> {
    return http.post<Document>('/documents', data);
  },

  async upload(file: FormData): Promise<Document> {
    return http.upload<Document>('/documents/upload', file);
  },

  async update(id: string, data: Partial<Document>): Promise<Document> {
    return http.put<Document>(`/documents/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await http.delete<void>(`/documents/${id}`);
  },

  async share(id: string, shareData: ShareDocumentData): Promise<void> {
    await http.post<void>(`/documents/${id}/share`, shareData);
  },

  async getVersions(id: string): Promise<DocumentVersion[]> {
    return http.get<DocumentVersion[]>(`/documents/${id}/versions`);
  },

  async download(id: string): Promise<Blob> {
    return http.get<Blob>(`/documents/${id}/download`, {
      responseType: 'blob'
    });
  }
};
