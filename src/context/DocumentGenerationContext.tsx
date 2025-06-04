
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { documentGenerationApi } from '@/services/documentGeneration';
import type { Template, GeneratedDocument } from '@/types';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface DocumentGenerationContextState extends BaseContextState {
  templates: Template[];
  selectedTemplate: Template | null;
  generatedDocuments: GeneratedDocument[];
  selectedDocument: GeneratedDocument | null;
  previewDocument: GeneratedDocument | null;
  isGenerating: boolean;
}

interface DocumentGenerationContextActions extends BaseContextActions {
  fetchTemplates: () => Promise<void>;
  selectTemplate: (template: Template) => void;
  generateDocument: (data: { title: string; purpose: string; instructions?: string; templateId?: string }) => Promise<void>;
  generateDocumentFromForm: (formData: any) => Promise<void>;
  regenerateDocument: (documentId: string, changes?: any) => Promise<void>;
  fetchGeneratedDocuments: () => Promise<void>;
  selectDocument: (document: GeneratedDocument) => void;
  setPreviewDocument: (document: GeneratedDocument | null) => void;
}

interface DocumentGenerationContextValue extends DocumentGenerationContextState, DocumentGenerationContextActions {}

const DocumentGenerationContext = createContext<DocumentGenerationContextValue | undefined>(undefined);

interface DocumentGenerationProviderProps {
  children: ReactNode;
}

export const DocumentGenerationProvider: React.FC<DocumentGenerationProviderProps> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<GeneratedDocument | null>(null);
  const [previewDocument, setPreviewDocument] = useState<GeneratedDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchTemplates = async () => {
    await handleAsyncAction(
      async () => {
        const templatesData = await documentGenerationApi.getTemplates();
        setTemplates(templatesData);
      },
      setLoading,
      setError
    );
  };

  const selectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const generateDocument = async (data: { title: string; purpose: string; instructions?: string; templateId?: string }) => {
    await handleAsyncAction(
      async () => {
        const document = await documentGenerationApi.generateDocument(data);
        setGeneratedDocuments(prev => [document, ...prev]);
      },
      setIsGenerating,
      setError
    );
  };

  const generateDocumentFromForm = async (formData: any) => {
    await handleAsyncAction(
      async () => {
        const document = await documentGenerationApi.generateDocument(formData);
        setGeneratedDocuments(prev => [document, ...prev]);
      },
      setIsGenerating,
      setError
    );
  };

  const regenerateDocument = async (documentId: string, changes?: any) => {
    await handleAsyncAction(
      async () => {
        const document = await documentGenerationApi.regenerateDocument(documentId, changes);
        setGeneratedDocuments(prev => prev.map(doc => doc.id === documentId ? document : doc));
      },
      setIsGenerating,
      setError
    );
  };

  const fetchGeneratedDocuments = async () => {
    await handleAsyncAction(
      async () => {
        const documents = await documentGenerationApi.getGeneratedDocuments();
        setGeneratedDocuments(documents);
      },
      setLoading,
      setError
    );
  };

  const selectDocument = (document: GeneratedDocument) => {
    setSelectedDocument(document);
  };

  const value: DocumentGenerationContextValue = {
    // State
    templates,
    selectedTemplate,
    generatedDocuments,
    selectedDocument,
    previewDocument,
    loading,
    error,
    isGenerating,
    // Actions
    fetchTemplates,
    selectTemplate,
    generateDocument,
    generateDocumentFromForm,
    regenerateDocument,
    fetchGeneratedDocuments,
    selectDocument,
    setPreviewDocument,
    ...baseActions,
  };

  return <DocumentGenerationContext.Provider value={value}>{children}</DocumentGenerationContext.Provider>;
};

export const useDocumentGeneration = () => {
  const context = useContext(DocumentGenerationContext);
  if (context === undefined) {
    throw new Error('useDocumentGeneration must be used within a DocumentGenerationProvider');
  }
  return context;
};
