import { useState } from 'react';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'size' | 'type';
type SortOrder = 'asc' | 'desc';

/**
 * Hook for managing documents UI state
 */
export const useDocumentsUI = () => {
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

  return {
    // State
    searchQuery,
    selectedDocumentIds,
    viewMode,
    sortBy,
    sortOrder,
    filterTags,
    showUploadModal,
    showDeleteConfirm,

    // Actions
    setSearchQuery,
    setSelectedDocumentIds,
    toggleDocumentSelection,
    setViewMode,
    setSorting,
    setFilterTags,
    setShowUploadModal,
    setShowDeleteConfirm,
    clearFilters,
  };
}; 