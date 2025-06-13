import { useDocumentsQuery } from '@/hooks/queries/useDocumentsQuery';
import { useMemo, useState } from 'react';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'size' | 'type';
type SortOrder = 'asc' | 'desc';

/**
 * Combined hook that provides both UI state and server data for documents
 */
export const useDocuments = () => {
  const documentsQuery = useDocumentsQuery({ page: 1, limit: 50 });

  // Search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  
  // Modal and dialog UI state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const toggleDocumentSelection = (id: string) => {
    setSelectedDocumentIds(prev => {
      const isSelected = prev.includes(id);
      return isSelected
        ? prev.filter(docId => docId !== id)
        : [...prev, id];
    });
  };

  const setSorting = (newSortBy: SortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterTags([]);
    setSelectedDocumentIds([]);
  };

  const resetGenerationState = () => {
    setShowGenerateModal(false);
    setShowRegenerateModal(false);
    setSelectedTemplate(null);
  };

  // Apply client-side filtering based on UI state
  const filteredDocuments = useMemo(() => {
    let filtered = documentsQuery.documents;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply tag filters
    if (filterTags.length > 0) {
      filtered = filtered.filter(doc =>
        filterTags.some(tag => doc.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [documentsQuery.documents, searchQuery, filterTags, sortBy, sortOrder]);

  return {
    // Server data with client-side filtering
    documents: documentsQuery.documents,
    filteredDocuments,
    
    // Server state
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error?.message,
    
    // Document actions
    createDocument: documentsQuery.createDocument,
    updateDocument: documentsQuery.updateDocument,
    deleteDocument: documentsQuery.deleteDocument,
    refetch: documentsQuery.refetch,
    
    // Mutation states
    isCreating: documentsQuery.isCreating,
    isUpdating: documentsQuery.isUpdating,
    isDeleting: documentsQuery.isDeleting,
    
    // UI state
    searchQuery,
    selectedDocumentIds,
    viewMode,
    sortBy,
    sortOrder,
    filterTags,
    showUploadModal,
    showDeleteConfirm,
    showGenerateModal,
    showRegenerateModal,
    selectedTemplate,
    
    // UI actions
    setSearchQuery,
    setSelectedDocuments: setSelectedDocumentIds,
    toggleDocumentSelection,
    setViewMode,
    setSorting,
    setFilterTags,
    setShowUploadModal,
    setShowDeleteConfirm,
    setShowGenerateModal,
    setShowRegenerateModal,
    setSelectedTemplate,
    clearFilters,
    resetGenerationState,
  };
};
