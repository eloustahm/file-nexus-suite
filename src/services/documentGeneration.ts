import { http } from '@/lib/api';
import type { Template, GeneratedDocument, TemplateField, DocumentFormData } from '@/types';

// API Response interfaces for transformation
interface ApiTemplateField {
  id: string;
  label: string;
  type: string;
  value: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface ApiTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: ApiTemplateField[];
  category?: string;
}

interface ApiGeneratedDocument {
  id: string;
  title: string;
  purpose?: string;
  instructions?: string;
  templateId?: string;
  content: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
  isSelected: boolean;
}

export const documentGenerationService = {
  async getTemplates(): Promise<Template[]> {
    return http.get<Template[]>('/document-generation/templates');
  },

  async getGeneratedDocuments(): Promise<GeneratedDocument[]> {
    return http.get<GeneratedDocument[]>('/document-generation/documents');
  },

  async getDocument(documentId: string): Promise<GeneratedDocument> {
    return http.get<GeneratedDocument>(`/document-generation/documents/${documentId}`);
  },

  async generateDocument(data: DocumentFormData): Promise<GeneratedDocument> {
    return http.post<GeneratedDocument>('/document-generation/generate', data);
  },

  async regenerateDocument(documentId: string, data: DocumentFormData): Promise<GeneratedDocument> {
    return http.put<GeneratedDocument>(`/document-generation/documents/${documentId}/regenerate`, data);
  },

  async selectDocument(documentId: string): Promise<void> {
    await http.patch<void>(`/document-generation/documents/${documentId}/select`);
  },

  async deleteDocument(documentId: string): Promise<void> {
    await http.delete<void>(`/document-generation/documents/${documentId}`);
  },

  async downloadDocument(documentId: string): Promise<Blob> {
    return http.get<Blob>(`/document-generation/documents/${documentId}/download`, {
      responseType: 'blob'
    });
  }
};
