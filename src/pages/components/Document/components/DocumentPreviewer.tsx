
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDocumentGenerationStore } from '@/store/useDocumentGenerationStore';
import { Eye, Download, RotateCcw, X } from 'lucide-react';

interface DocumentPreviewerProps {
  document: string | null;
  onClose: () => void;
  onRegenerate?: (documentId: string) => void;
}

export const DocumentPreviewer = ({ document: documentId, onClose, onRegenerate }: DocumentPreviewerProps) => {
  const { generatedDocuments } = useDocumentGenerationStore();
  
  const document = documentId ? generatedDocuments.find(doc => doc.id === documentId) : null;

  const handleDownload = () => {
    if (!document) return;
    
    const blob = new Blob([document.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.title}.txt`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!document) return null;

  return (
    <Dialog open={!!documentId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {document.title}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {onRegenerate && (
                <Button variant="outline" size="sm" onClick={() => onRegenerate(document.id)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] w-full border rounded-lg p-4">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {document.content}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
