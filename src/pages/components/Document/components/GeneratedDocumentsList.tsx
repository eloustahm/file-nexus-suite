import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useDocumentGeneration } from '@/hooks/useDocumentGeneration';
import { FileText, Search, Eye, Clock } from 'lucide-react';
import { useState } from 'react';
import { SectionLoading } from '@/components/LoadingStates';

interface GeneratedDocumentsListProps {
  onPreviewDocument: (documentId: string) => void;
}

export const GeneratedDocumentsList = ({ onPreviewDocument }: GeneratedDocumentsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { documents, isLoadingDocuments } = useDocumentGeneration();

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoadingDocuments) {
    return <SectionLoading message="Loading generated documents..." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generated Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No documents found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{doc.title}</h4>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {doc.isSelected && (
                        <Badge variant="outline" className="border-blue-500 text-blue-700">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{doc.purpose}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(doc.createdAt)}</span>
                      {doc.wordCount && (
                        <>
                          <span>•</span>
                          <span>{doc.wordCount.toLocaleString()} words</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPreviewDocument(doc.id)}
                      disabled={doc.status === 'generating'}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
