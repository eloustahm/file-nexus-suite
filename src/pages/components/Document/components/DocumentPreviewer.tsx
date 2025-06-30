
import React from 'react';
import { EditableDocumentPreviewer } from './EditableDocumentPreviewer';

interface DocumentPreviewerProps {
  document: string | null;
  onClose: () => void;
  onRegenerate?: (documentId: string) => void;
}

export const DocumentPreviewer = ({ document, onClose, onRegenerate }: DocumentPreviewerProps) => {
  return (
    <EditableDocumentPreviewer
      document={document}
      onClose={onClose}
      onRegenerate={onRegenerate}
    />
  );
};
