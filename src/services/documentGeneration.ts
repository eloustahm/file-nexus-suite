
import { http } from '@/lib/api';
import { Template, TemplateField } from '@/types';

export interface GeneratedDocument {
  id: string;
  title: string;
  content: string;
  templateId?: string;
  purpose: string;
  instructions?: string;
  status: 'generating' | 'completed' | 'error';
  createdAt: string;
  wordCount?: number;
  isSelected?: boolean;
  metadata?: Record<string, any>;
}

export interface DocumentFormData {
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
  formData?: Record<string, any>;
}

// Export types for convenience
export type { Template, TemplateField };

/**
 * Document Generation API service
 */
export const documentGenerationApi = {
  // Get templates
  getTemplates: async (): Promise<Template[]> => {
    console.log('Fetching document templates');
    return http.get<Template[]>('/api/document-generation/templates');
  },

  // Get generated documents
  getGeneratedDocuments: async (): Promise<GeneratedDocument[]> => {
    console.log('Fetching generated documents');
    return http.get<GeneratedDocument[]>('/api/document-generation/documents');
  },

  // Generate document
  generateDocument: async (data: DocumentFormData): Promise<GeneratedDocument> => {
    console.log('Generating document:', data);
    return http.post<GeneratedDocument>('/api/document-generation/generate', data);
  },

  // Regenerate document
  regenerateDocument: async (documentId: string, data: DocumentFormData): Promise<GeneratedDocument> => {
    console.log('Regenerating document:', documentId);
    return http.put<GeneratedDocument>(`/api/document-generation/documents/${documentId}/regenerate`, data);
  },

  // Select document
  selectDocument: async (documentId: string) => {
    console.log('Selecting document:', documentId);
    return http.post(`/api/document-generation/documents/${documentId}/select`);
  },

  // Delete document
  deleteDocument: async (documentId: string) => {
    console.log('Deleting generated document:', documentId);
    return http.delete(`/api/document-generation/documents/${documentId}`);
  },

  // Get document by ID
  getDocument: async (documentId: string): Promise<GeneratedDocument> => {
    console.log('Fetching document:', documentId);
    return http.get<GeneratedDocument>(`/api/document-generation/documents/${documentId}`);
  },

  // Download document
  downloadDocument: async (documentId: string) => {
    console.log('Downloading document:', documentId);
    return http.get(`/api/document-generation/documents/${documentId}/download`, { responseType: 'blob' });
  }
};
