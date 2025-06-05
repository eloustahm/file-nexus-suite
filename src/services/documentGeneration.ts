
import { http } from '@/lib/api';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: TemplateField[];
  content: string;
}

export interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

export interface GeneratedDocument {
  id: string;
  title: string;
  content: string;
  templateId: string;
  status: 'generating' | 'completed' | 'error';
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface DocumentFormData {
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
  formData?: Record<string, any>;
}

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
