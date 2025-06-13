import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDocumentGeneration } from '@/hooks/useDocumentGeneration';
import { Eye, Download, RotateCcw, X } from 'lucide-react';

interface DocumentPreviewerProps {
  document: string | null;
  onClose: () => void;
  onRegenerate?: (documentId: string) => void;
}

export const DocumentPreviewer = ({ document: documentId, onClose, onRegenerate }: DocumentPreviewerProps) => {
  const { documents, downloadDocument } = useDocumentGeneration();
  
  const document = documentId ? documents.find(doc => doc.id === documentId) : null;

  const handleDownload = async () => {
    if (!document) return;
    
    try {
      const blob = await downloadDocument(document.id);
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = `${document.title}.txt`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
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
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Purpose: {document.purpose}</span>
            {document.wordCount && (
              <>
                <span>•</span>
                <span>{document.wordCount.toLocaleString()} words</span>
              </>
            )}
          </div>
          <ScrollArea className="h-[60vh] border rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm">
              {document.content}
            </pre>
          </ScrollArea>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {onRegenerate && (
              <Button onClick={() => onRegenerate(document.id)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
