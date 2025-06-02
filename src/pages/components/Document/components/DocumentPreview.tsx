
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Edit, Save, Copy, RefreshCw, Download } from "lucide-react";

interface DocumentPreviewProps {
  generatedContent: string;
  isEditing: boolean;
  editedContent: string;
  onEditedContentChange: (content: string) => void;
  onEditToggle: () => void;
  onCopy: () => void;
  onRefresh: () => void;
}

export const DocumentPreview = ({
  generatedContent,
  isEditing,
  editedContent,
  onEditedContentChange,
  onEditToggle,
  onCopy,
  onRefresh
}: DocumentPreviewProps) => {
  if (!generatedContent) return null;

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            {isEditing ? 'Edit Document' : 'Preview'}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEditToggle}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={onCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="bg-white border rounded-lg p-4 max-h-[500px] overflow-y-auto">
          {isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => onEditedContentChange(e.target.value)}
              className="min-h-[400px] font-mono text-sm resize-none border-none p-0 focus:ring-0"
            />
          ) : (
            <pre className="whitespace-pre-wrap text-sm text-gray-900">
              {generatedContent}
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
