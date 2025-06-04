
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDocumentGenerationStore } from '@/store/useDocumentGenerationStore';
import { 
  X, 
  Download, 
  RotateCcw, 
  Trash2, 
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentPreviewerProps {
  documentId: string | null;
  onClose: () => void;
  onRegenerate: (documentId: string) => void;
}

export const DocumentPreviewer = ({ documentId, onClose, onRegenerate }: DocumentPreviewerProps) => {
  const { toast } = useToast();
  const { 
    generatedDocuments, 
    selectDocument, 
    deleteDocument 
  } = useDocumentGenerationStore();

  const document = documentId ? generatedDocuments.find(doc => doc.id === documentId) : null;

  if (!document) return null;

  const handleSelect = () => {
    selectDocument(document.id);
    toast({
      title: "Document selected",
      description: `${document.title} is now your active document`,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([document.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: `${document.title} is being downloaded`,
    });
  };

  const handleDelete = () => {
    deleteDocument(document.id);
    onClose();
    toast({
      title: "Document deleted",
      description: `${document.title} has been removed`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={!!documentId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <div>
                <DialogTitle className="text-lg">{document.title}</DialogTitle>
                <p className="text-sm text-gray-600">{document.purpose}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(document.status)}>
                {document.status}
              </Badge>
              {document.isSelected && (
                <Badge variant="outline" className="border-blue-500 text-blue-700">
                  Selected
                </Badge>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(document.createdAt)}</span>
            </div>
            {document.wordCount && (
              <>
                <span>•</span>
                <span>{document.wordCount.toLocaleString()} words</span>
              </>
            )}
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        {/* Task Bar */}
        <div className="flex items-center gap-2 mb-4 flex-shrink-0">
          <Button
            variant={document.isSelected ? "default" : "outline"}
            size="sm"
            onClick={handleSelect}
            disabled={document.status !== 'completed'}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {document.isSelected ? 'Selected' : 'Select'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRegenerate(document.id)}
            disabled={document.status === 'generating'}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={document.status !== 'completed'}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full border rounded-lg">
            <div className="p-6 bg-gray-50">
              {document.status === 'completed' ? (
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                  {document.content}
                </pre>
              ) : document.status === 'generating' ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating document...</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-red-600">Failed to generate document</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
