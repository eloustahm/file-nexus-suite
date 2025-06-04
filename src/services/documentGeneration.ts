
import { http } from '@/lib/api';
import type { Template, GeneratedDocument, TemplateField } from '@/types';

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
  getTemplates: async (): Promise<Template[]> => {
    const apiTemplates = await http.get<ApiTemplate[]>('/api/document-generation/templates');
    
    // Transform API response to unified Template interface
    return apiTemplates.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category || 'General',
      fields: template.fields.map(field => ({
        name: field.id, // Transform id to name for unified interface
        type: field.type as 'text' | 'textarea' | 'select' | 'date',
        label: field.label,
        required: field.required,
        options: field.options,
        value: field.value,
        placeholder: field.placeholder
      }))
    }));
  },

  // Get all generated documents for the user
  getGeneratedDocuments: async (): Promise<GeneratedDocument[]> => {
    const apiDocuments = await http.get<ApiGeneratedDocument[]>('/api/document-generation/documents');
    
    // Transform API response to unified GeneratedDocument interface
    return apiDocuments.map(doc => ({
      id: doc.id,
      title: doc.title,
      content: doc.content,
      templateId: doc.templateId || '',
      createdAt: doc.createdAt,
      status: doc.status === 'failed' ? 'error' : doc.status as 'generating' | 'completed' | 'error',
      purpose: doc.purpose || 'Document generation',
      instructions: doc.instructions,
      isSelected: doc.isSelected,
      wordCount: doc.wordCount
    }));
  },

  // Get a specific generated document
  getDocument: async (documentId: string): Promise<GeneratedDocument> => {
    const apiDoc = await http.get<ApiGeneratedDocument>(`/api/document-generation/documents/${documentId}`);
    
    return {
      id: apiDoc.id,
      title: apiDoc.title,
      content: apiDoc.content,
      templateId: apiDoc.templateId || '',
      createdAt: apiDoc.createdAt,
      status: apiDoc.status === 'failed' ? 'error' : apiDoc.status as 'generating' | 'completed' | 'error',
      purpose: apiDoc.purpose || 'Document generation',
      instructions: apiDoc.instructions,
      isSelected: apiDoc.isSelected,
      wordCount: apiDoc.wordCount
    };
  },

  // Generate a new document
  generateDocument: async (data: DocumentFormData): Promise<GeneratedDocument> => {
    const apiDoc = await http.post<ApiGeneratedDocument>('/api/document-generation/generate', data);
    
    return {
      id: apiDoc.id,
      title: apiDoc.title,
      content: apiDoc.content,
      templateId: apiDoc.templateId || '',
      createdAt: apiDoc.createdAt,
      status: apiDoc.status === 'failed' ? 'error' : apiDoc.status as 'generating' | 'completed' | 'error',
      purpose: data.purpose,
      instructions: data.instructions,
      isSelected: apiDoc.isSelected,
      wordCount: apiDoc.wordCount
    };
  },

  // Regenerate an existing document
  regenerateDocument: async (documentId: string, data: DocumentFormData): Promise<GeneratedDocument> => {
    const apiDoc = await http.put<ApiGeneratedDocument>(`/api/document-generation/documents/${documentId}/regenerate`, data);
    
    return {
      id: apiDoc.id,
      title: apiDoc.title,
      content: apiDoc.content,
      templateId: apiDoc.templateId || '',
      createdAt: apiDoc.createdAt,
      status: apiDoc.status === 'failed' ? 'error' : apiDoc.status as 'generating' | 'completed' | 'error',
      purpose: data.purpose,
      instructions: data.instructions,
      isSelected: apiDoc.isSelected,
      wordCount: apiDoc.wordCount
    };
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
