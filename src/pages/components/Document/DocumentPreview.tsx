
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download,
  Edit,
  Share,
  Clock,
  User,
  FileText,
  Eye,
  X,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { DocumentViewer } from "./DocumentViewer";

interface DocumentPreviewProps {
  document: {
    id: number;
    name: string;
    type: string;
    size: string;
    modified: string;
    author: string;
    status: string;
    icon: string;
  };
  onClose: () => void;
}

export const DocumentPreview = ({ document, onClose }: DocumentPreviewProps) => {
  const [showFullViewer, setShowFullViewer] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "final": return "bg-green-100 text-green-800";
      case "review": return "bg-blue-100 text-blue-800";
      case "approved": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Add mock content based on document type
  const documentWithContent = {
    ...document,
    content: getDefaultContent(document.type)
  };

  if (showFullViewer) {
    return (
      <DocumentViewer 
        document={documentWithContent} 
        onClose={() => setShowFullViewer(false)} 
      />
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{document.icon}</div>
              <div>
                <DialogTitle className="text-lg">{document.name}</DialogTitle>
                <DialogDescription>{document.type}</DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(document.status)}>
                {document.status}
              </Badge>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="flex gap-6 h-full">
          <div className="flex-1">
            <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">{document.icon}</div>
                <p className="text-gray-600 mb-4">Document Preview</p>
                <p className="text-sm text-gray-500 mb-6">
                  Click "Open in Editor" to view and edit the full document
                </p>
                <Button onClick={() => setShowFullViewer(true)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Editor
                </Button>
              </div>
            </div>
          </div>

          <div className="w-80 space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Document Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{document.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Modified:</span>
                  <span className="font-medium">{document.modified}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{document.size}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start" onClick={() => setShowFullViewer(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Open in Editor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Version History</h3>
              <div className="space-y-2">
                <div className="p-2 rounded-lg border">
                  <p className="text-sm font-medium">Current Version</p>
                  <p className="text-xs text-gray-500">Modified {document.modified} by {document.author}</p>
                </div>
                <div className="p-2 rounded-lg bg-gray-50">
                  <p className="text-sm font-medium">Version 1.0</p>
                  <p className="text-xs text-gray-500">Created 1 week ago by {document.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to generate default content based on document type
function getDefaultContent(type: string): string {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes("word") || lowerType.includes("docx")) {
    return `# Document Title

This is a sample Word document with some content. You can edit this text and format it as needed.

## Section 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Section 2
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Click the Edit button to start making changes to this document.`;
  } else if (lowerType.includes("excel") || lowerType.includes("xlsx")) {
    return JSON.stringify({
      'A1': 'Name', 'B1': 'Age', 'C1': 'City',
      'A2': 'John Doe', 'B2': '30', 'C2': 'New York',
      'A3': 'Jane Smith', 'B3': '25', 'C3': 'Los Angeles'
    });
  } else if (lowerType.includes("powerpoint") || lowerType.includes("pptx")) {
    return JSON.stringify([
      { id: 1, title: "Welcome to Our Presentation", content: "This is the first slide of our presentation." },
      { id: 2, title: "Key Points", content: "• Point 1\n• Point 2\n• Point 3" }
    ]);
  } else {
    return "This is a sample document. Click Edit to modify the content.";
  }
}
