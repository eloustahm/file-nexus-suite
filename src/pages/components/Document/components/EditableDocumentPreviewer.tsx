
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  Download, 
  Edit, 
  Save, 
  X, 
  Copy, 
  Printer, 
  Share,
  Undo,
  Redo,
  FileText,
  Clock
} from 'lucide-react';
import { useDocumentGeneration } from '@/hooks/useDocumentGeneration';
import { toast } from 'sonner';

interface EditableDocumentPreviewerProps {
  document: string | null;
  onClose: () => void;
  onRegenerate?: (documentId: string) => void;
}

export const EditableDocumentPreviewer = ({ 
  document: documentId, 
  onClose, 
  onRegenerate 
}: EditableDocumentPreviewerProps) => {
  const { documents, downloadDocument } = useDocumentGeneration();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  
  const document = documentId ? documents.find(doc => doc.id === documentId) : null;

  useEffect(() => {
    if (document) {
      setEditedContent(document.content);
      setEditedTitle(document.title);
      setWordCount(document.content.split(/\s+/).filter(word => word.length > 0).length);
    }
  }, [document]);

  useEffect(() => {
    if (document) {
      const hasContentChanged = editedContent !== document.content;
      const hasTitleChanged = editedTitle !== document.title;
      setHasChanges(hasContentChanged || hasTitleChanged);
      
      // Update word count
      setWordCount(editedContent.split(/\s+/).filter(word => word.length > 0).length);
    }
  }, [editedContent, editedTitle, document]);

  const handleSave = async () => {
    if (!document || !hasChanges) return;
    
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 500));
      setLastSaved(new Date());
      setHasChanges(false);
      toast.success('Document saved successfully');
    } catch (error) {
      toast.error('Failed to save document');
    }
  };

  const handleDownload = async () => {
    if (!document) return;
    
    try {
      const content = isEditing ? editedContent : document.content;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = `${editedTitle || document.title}.txt`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Document downloaded');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handleCopy = async () => {
    const content = isEditing ? editedContent : document?.content || '';
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Content copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy content');
    }
  };

  const handlePrint = () => {
    const content = isEditing ? editedContent : document?.content || '';
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${editedTitle || document?.title}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
              h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
              pre { white-space: pre-wrap; font-size: 14px; }
            </style>
          </head>
          <body>
            <h1>${editedTitle || document?.title}</h1>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const toggleEditMode = () => {
    if (isEditing && hasChanges) {
      // Ask for confirmation if there are unsaved changes
      if (window.confirm('You have unsaved changes. Do you want to save before exiting edit mode?')) {
        handleSave();
      }
    }
    setIsEditing(!isEditing);
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  if (!document) return null;

  return (
    <Dialog open={!!documentId} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <FileText className="h-6 w-6 text-blue-600" />
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-lg font-semibold border-none p-0 h-auto"
                  />
                ) : (
                  <DialogTitle className="text-lg">{editedTitle}</DialogTitle>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{document.purpose}</span>
                  {lastSaved && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Saved {formatLastSaved(lastSaved)}</span>
                      </div>
                    </>
                  )}
                  {hasChanges && (
                    <Badge variant="outline" className="text-xs">
                      Unsaved changes
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <Separator />
        
        {/* Toolbar */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={toggleEditMode}
            >
              {isEditing ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
            
            {isEditing && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasChanges}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Separator orientation="vertical" className="h-6" />
              </>
            )}
            
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {onRegenerate && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRegenerate(document.id)}
              >
                Regenerate
              </Button>
            )}
          </div>
        </div>
        
        <Separator />
        
        {/* Content Area */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6">
              {isEditing ? (
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[600px] text-sm leading-relaxed font-mono resize-none border-none p-0 focus:ring-0"
                  placeholder="Start typing your document content..."
                />
              ) : (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {editedContent}
                  </pre>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 py-2 px-1 bg-gray-50 rounded">
          <div className="flex items-center gap-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {editedContent.length}</span>
            {isEditing && (
              <span>Lines: {editedContent.split('\n').length}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing && (
              <>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Undo className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Redo className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
