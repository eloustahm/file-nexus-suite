
import { http } from '@/lib/api';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: TemplateField[];
}

export interface TemplateField {
  id: string;
  label: string;
  type: string;
  value: string;
  required: boolean;
  placeholder?: string;
}

export interface GeneratedDocument {
  id: string;
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
  content: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
  isSelected: boolean;
}

export interface DocumentFormData {
  title: string;
  purpose: string;
  instructions?: string;
  templateId?: string;
}

/**
 * Document Generation API service
 */
export const documentGenerationApi = {
  // Get all available templates
  getTemplates: async (): Promise<DocumentTemplate[]> => {
    return http.get<DocumentTemplate[]>('/api/document-generation/templates');
  },

  // Get all generated documents for the user
  getGeneratedDocuments: async (): Promise<GeneratedDocument[]> => {
    return http.get<GeneratedDocument[]>('/api/document-generation/documents');
  },

  // Get a specific generated document
  getDocument: async (documentId: string): Promise<GeneratedDocument> => {
    return http.get<GeneratedDocument>(`/api/document-generation/documents/${documentId}`);
  },

  // Generate a new document
  generateDocument: async (data: DocumentFormData): Promise<GeneratedDocument> => {
    return http.post<GeneratedDocument>('/api/document-generation/generate', data);
  },

  // Regenerate an existing document
  regenerateDocument: async (documentId: string, data: DocumentFormData): Promise<GeneratedDocument> => {
    return http.put<GeneratedDocument>(`/api/document-generation/documents/${documentId}/regenerate`, data);
  },

  // Update document selection status
  selectDocument: async (documentId: string): Promise<void> => {
    return http.patch<void>(`/api/document-generation/documents/${documentId}/select`);
  },

  // Delete a generated document
  deleteDocument: async (documentId: string): Promise<void> => {
    return http.delete<void>(`/api/document-generation/documents/${documentId}`);
  },

  // Download document content
  downloadDocument: async (documentId: string): Promise<Blob> => {
    return http.get<Blob>(`/api/document-generation/documents/${documentId}/download`, {
      responseType: 'blob'
    });
  }
};
