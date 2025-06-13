import { useState } from 'react';
import { useDocuments } from './useDocuments';

export const useSharedDocuments = () => {
  const { documents, isLoading, error, refetch } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Filter documents to only show shared ones
  const sharedDocuments = documents.filter(doc => doc.isShared);

  return {
    sharedDocuments,
    isLoading,
    error,
    refetch,
    searchTerm,
    filterRole,
    setSearchTerm,
    setFilterRole
  };
}; 