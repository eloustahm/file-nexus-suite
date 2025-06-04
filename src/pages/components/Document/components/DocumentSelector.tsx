
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, FolderOpen } from "lucide-react";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
}

interface DocumentSelectorProps {
  documents: DocumentItem[];
  selectedDocuments: string[];
  onDocumentToggle: (docName: string) => void;
  onSelectAll: () => void;
}

export const DocumentSelector = ({ documents, selectedDocuments, onDocumentToggle, onSelectAll }: DocumentSelectorProps) => {
  const allSelected = selectedDocuments.length === documents.length;
  const someSelected = selectedDocuments.length > 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Documents
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </CardTitle>
        {someSelected && (
          <Badge variant="secondary" className="w-fit">
            {selectedDocuments.length} selected
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
            onClick={() => onDocumentToggle(doc.name)}
          >
            <Checkbox
              checked={selectedDocuments.includes(doc.name)}
              onChange={() => onDocumentToggle(doc.name)}
            />
            <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{doc.name}</div>
              <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
