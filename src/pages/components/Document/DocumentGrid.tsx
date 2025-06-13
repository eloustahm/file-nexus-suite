
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MoreVertical, Share2, Download, Trash2 } from 'lucide-react';
import { formatDate, formatFileSize } from '@/lib/utils';
import type { Document } from '@/types';

interface DocumentGridProps {
  viewMode: 'grid' | 'list';
  filteredDocuments: Document[];
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({ viewMode, filteredDocuments }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-2">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      {doc.type} • {formatFileSize(doc.size)} • {formatDate(doc.updatedAt)}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredDocuments.map((doc) => (
        <Card key={doc.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-gray-400" />
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h3 className="font-medium text-sm truncate">{doc.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{doc.type}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatFileSize(doc.size)}</span>
                <span>{formatDate(doc.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
