
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Share, 
  ZoomIn, 
  ZoomOut, 
  FileText,
  Calendar,
  User,
  X
} from 'lucide-react';
import type { Document } from '@/types';

interface DocumentPreviewerProps {
  document: Document | null;
  isVisible: boolean;
  zoom: number;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const DocumentPreviewer = ({
  document,
  isVisible,
  zoom,
  onClose,
  onDownload,
  onShare,
  onZoomIn,
  onZoomOut
}: DocumentPreviewerProps) => {
  if (!isVisible || !document) return null;

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">{document.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge variant="outline">{document.type}</Badge>
                <span>•</span>
                <span>{formatFileSize(document.size)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(document.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onZoomOut} disabled={zoom <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2 min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={onZoomIn} disabled={zoom >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-8">
              <div
                className="prose max-w-none"
                style={{ fontSize: `${zoom}%` }}
              >
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
                  {document.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {document.isShared && (
              <Badge variant="outline" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Shared
              </Badge>
            )}
            {document.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Status: <Badge className={
              document.status === 'active' ? 'bg-green-100 text-green-800' :
              document.status === 'archived' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }>
              {document.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
