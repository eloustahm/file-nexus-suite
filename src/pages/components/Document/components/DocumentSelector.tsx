
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Files, Search, Upload, FileText } from "lucide-react";
import { Document } from '../types/chatTypes';

interface DocumentSelectorProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentToggle: (docName: string) => void;
  onSelectAll: () => void;
}

export const DocumentSelector = ({ documents, selectedDocuments, onDocumentToggle, onSelectAll }: DocumentSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Files className="h-5 w-5" />
          Select Documents
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="text-xs"
          >
            {selectedDocuments.length === documents.length ? 'Deselect All' : 'Select All'}
          </Button>
          <span className="text-xs text-gray-500">
            {selectedDocuments.length} of {documents.length} selected
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedDocuments.includes(doc.name)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onDocumentToggle(doc.name)}
            >
              <div className="flex items-center gap-2 mb-1">
                <Checkbox 
                  checked={selectedDocuments.includes(doc.name)}
                  onChange={() => onDocumentToggle(doc.name)}
                />
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-sm flex-1">{doc.name}</span>
              </div>
              <div className="text-xs text-gray-500 ml-6">{doc.type} • {doc.size}</div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Upload New Document
        </Button>
      </CardContent>
    </Card>
  );
};
