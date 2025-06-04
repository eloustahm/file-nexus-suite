
import { http } from '@/lib/api';

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
export const documentsApi = {
  // Get all documents
  getAll: async (): Promise<Document[]> => {
    return http.get<Document[]>('/api/documents');
  },

  // Get document by ID
  getById: async (id: string): Promise<Document> => {
    return http.get<Document>(`/api/documents/${id}`);
  },

  // Create new document
  create: async (data: CreateDocumentData): Promise<Document> => {
    return http.post<Document>('/api/documents', data);
  },

  // Upload document
  upload: async (file: FormData): Promise<Document> => {
    return http.upload<Document>('/api/documents/upload', file);
  },

  // Update document
  update: async (id: string, data: Partial<Document>): Promise<Document> => {
    return http.put<Document>(`/api/documents/${id}`, data);
  },

  // Delete document
  delete: async (id: string): Promise<void> => {
    return http.delete<void>(`/api/documents/${id}`);
  },

  // Share document
  share: async (id: string, shareData: ShareDocumentData): Promise<void> => {
    return http.post<void>(`/api/documents/${id}/share`, shareData);
  },

  // Get document versions
  getVersions: async (id: string): Promise<any[]> => {
    return http.get<any[]>(`/api/documents/${id}/versions`);
  },

  // Download document
  download: async (id: string): Promise<Blob> => {
    return http.get<Blob>(`/api/documents/${id}/download`, {
      responseType: 'blob'
    });
  }
};
