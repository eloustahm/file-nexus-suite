
import { http } from '@/lib/api';
import type { 
  Document as DocumentType, 
  CreateDocumentData as CreateDocData, 
  ShareDocumentData as ShareDocData 
} from '@/types';

export const documentsService = {
  async getDocuments(): Promise<DocumentType[]> {
    return http.get<DocumentType[]>('/documents');
  },

  async getDocument(id: string): Promise<DocumentType> {
    return http.get<DocumentType>(`/documents/${id}`);
  },

  async createDocument(data: CreateDocData): Promise<DocumentType> {
    return http.post<DocumentType>('/documents', data);
  },

  async updateDocument(id: string, data: Partial<DocumentType>): Promise<DocumentType> {
    return http.put<DocumentType>(`/documents/${id}`, data);
  },

  async deleteDocument(id: string): Promise<void> {
    return http.delete(`/documents/${id}`);
  },

  async shareDocument(id: string, data: ShareDocData): Promise<void> {
    return http.post(`/documents/${id}/share`, data);
  },

  async downloadDocument(id: string): Promise<Blob> {
    return http.get<Blob>(`/documents/${id}/download`, { responseType: 'blob' });
  },
};
