
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Download,
  Share,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface DocumentPreviewProps {
  document: {
    id: string;
    name: string;
    type: string;
    size: string;
    content: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onDownload,
  onShare
}) => {
  const [zoom, setZoom] = React.useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <div className="flex flex-col h-full">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div>
          <h3 className="font-semibold">{document.name}</h3>
          <p className="text-sm text-gray-600">{document.type} • {document.size}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm px-2">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          {onShare && (
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share className="h-4 w-4" />
            </Button>
          )}
          {onDownload && (
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4">
        <Card className="p-6 bg-gray-50 min-h-full">
          <pre 
            className="whitespace-pre-wrap font-mono text-sm leading-relaxed"
            style={{ fontSize: `${zoom}%` }}
          >
            {document.content}
          </pre>
        </Card>
      </div>
    </div>
  );
};
