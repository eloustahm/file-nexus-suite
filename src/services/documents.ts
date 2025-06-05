
import { http } from '@/lib/api';
import { Document } from '@/types';

export interface CreateDocumentData {
  name: string;
  type: string;
  content?: string;
  folderId?: string;
  tags?: string[];
}

export interface ShareDocumentData {
  permissions: 'view' | 'edit';
  emails: string[];
  message?: string;
}

/**
 * Documents API service
 */
export const documentsApi = {
  // Get all documents
  getAll: async (): Promise<Document[]> => {
    console.log('Fetching all documents');
    return http.get<Document[]>('/api/documents');
  },

  // Create document
  create: async (data: CreateDocumentData): Promise<Document> => {
    console.log('Creating document:', data.name);
    return http.post<Document>('/api/documents', data);
  },

  // Upload document
  upload: async (formData: FormData): Promise<Document> => {
    console.log('Uploading document');
    return http.post<Document>('/api/documents/upload', formData);
  },

  // Update document
  update: async (id: string, data: Partial<Document>): Promise<Document> => {
    console.log('Updating document:', id);
    return http.put<Document>(`/api/documents/${id}`, data);
  },

  // Delete document
  delete: async (id: string) => {
    console.log('Deleting document:', id);
    return http.delete(`/api/documents/${id}`);
  },

  // Share document
  share: async (id: string, shareData: ShareDocumentData) => {
    console.log('Sharing document:', id);
    return http.post(`/api/documents/${id}/share`, shareData);
  }
};
