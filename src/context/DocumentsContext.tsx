
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { documentsApi, Document, CreateDocumentData, ShareDocumentData } from '@/services/documents';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface DocumentsContextState extends BaseContextState {
  documents: Document[];
  selectedDocument: Document | null;
  searchQuery: string;
  filterTags: string[];
  sortBy: 'name' | 'date' | 'type' | 'size';
  sortOrder: 'asc' | 'desc';
  filteredDocuments: Document[];
}

interface DocumentsContextActions extends BaseContextActions {
  fetchDocuments: () => Promise<void>;
  getDocument: (id: string) => Promise<void>;
  createDocument: (data: CreateDocumentData) => Promise<void>;
  uploadDocument: (file: File) => Promise<void>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  shareDocument: (id: string, shareData: ShareDocumentData) => Promise<void>;
  downloadDocument: (id: string) => Promise<void>;
  setSelectedDocument: (document: Document | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterTags: (tags: string[]) => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

interface DocumentsContextValue extends DocumentsContextState, DocumentsContextActions {}

const DocumentsContext = createContext<DocumentsContextValue | undefined>(undefined);

interface DocumentsProviderProps {
  children: ReactNode;
}

export const DocumentsProvider: React.FC<DocumentsProviderProps> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [sortBy, setSortByState] = useState<'name' | 'date' | 'type' | 'size'>('name');
  const [sortOrder, setSortOrderState] = useState<'asc' | 'desc'>('asc');

  const baseActions = createBaseActions(setLoading, setError);

  const fetchDocuments = async () => {
    await handleAsyncAction(
      async () => {
        const docs = await documentsApi.getAll();
        setDocuments(docs);
      },
      setLoading,
      setError
    );
  };

  const getDocument = async (id: string) => {
    await handleAsyncAction(
      async () => {
        const document = await documentsApi.getById(id);
        setSelectedDocument(document);
      },
      setLoading,
      setError
    );
  };

  const createDocument = async (data: CreateDocumentData) => {
    await handleAsyncAction(
      async () => {
        const document = await documentsApi.create(data);
        setDocuments(prev => [document, ...prev]);
      },
      setLoading,
      setError
    );
  };

  const uploadDocument = async (file: File) => {
    await handleAsyncAction(
      async () => {
        const formData = new FormData();
        formData.append('file', file);
        const document = await documentsApi.upload(formData);
        setDocuments(prev => [document, ...prev]);
      },
      setLoading,
      setError
    );
  };

  const updateDocument = async (id: string, data: Partial<Document>) => {
    await handleAsyncAction(
      async () => {
        const updatedDocument = await documentsApi.update(id, data);
        setDocuments(prev => prev.map(doc => doc.id === id ? updatedDocument : doc));
        if (selectedDocument?.id === id) {
          setSelectedDocument(updatedDocument);
        }
      },
      setLoading,
      setError
    );
  };

  const deleteDocument = async (id: string) => {
    await handleAsyncAction(
      async () => {
        await documentsApi.delete(id);
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        if (selectedDocument?.id === id) {
          setSelectedDocument(null);
        }
      },
      setLoading,
      setError
    );
  };

  const shareDocument = async (id: string, shareData: ShareDocumentData) => {
    await handleAsyncAction(
      async () => {
        await documentsApi.share(id, shareData);
        const updatedDocument = await documentsApi.getById(id);
        setDocuments(prev => prev.map(doc => doc.id === id ? updatedDocument : doc));
      },
      setLoading,
      setError
    );
  };

  const downloadDocument = async (id: string) => {
    try {
      const blob = await documentsApi.download(id);
      const document = documents.find(doc => doc.id === id);
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document?.name || 'document';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const setSorting = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSortByState(sortBy as any);
    setSortOrderState(sortOrder);
  };

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterTags.length > 0) {
      filtered = filtered.filter(doc =>
        filterTags.some(tag => doc.tags.includes(tag))
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [documents, searchQuery, filterTags, sortBy, sortOrder]);

  const value: DocumentsContextValue = {
    // State
    documents,
    selectedDocument,
    loading,
    error,
    searchQuery,
    filterTags,
    sortBy,
    sortOrder,
    filteredDocuments,
    // Actions
    fetchDocuments,
    getDocument,
    createDocument,
    uploadDocument,
    updateDocument,
    deleteDocument,
    shareDocument,
    downloadDocument,
    setSelectedDocument,
    setSearchQuery,
    setFilterTags,
    setSorting,
    ...baseActions,
  };

  return <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>;
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
};
