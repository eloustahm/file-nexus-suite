
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Download,
  Edit,
  Share,
  MoreVertical,
  Eye,
  Clock,
  User
} from "lucide-react";
import { DocumentPreview } from "./DocumentPreview";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number | string;
  createdAt: string;
  updatedAt: string;
  folderId?: string;
  content?: string;
  tags?: string[];
  url?: string;
  status?: 'processing' | 'ready' | 'error';
}

interface DocumentGridProps {
  viewMode: "grid" | "list";
  searchQuery: string;
  documents: Document[];
}

export const DocumentGrid = ({ viewMode, searchQuery, documents }: DocumentGridProps) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  
  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (size: number | string): string => {
    if (typeof size === 'string') return size;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-green-100 text-green-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return "📄";
    if (type.includes('word') || type.includes('doc')) return "📝";
    if (type.includes('excel') || type.includes('sheet')) return "📊";
    if (type.includes('powerpoint') || type.includes('presentation')) return "📋";
    return "📄";
  };

  if (filteredDocuments.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Modified</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="text-2xl">{getFileIcon(doc.type)}</div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      System
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-gray-600">{doc.type}</div>
                <div className="col-span-2 text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(doc.updatedAt)}
                </div>
                <div className="col-span-2 text-sm text-gray-600">{formatFileSize(doc.size)}</div>
                <div className="col-span-1">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status || 'ready'}
                  </Badge>
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedDocument(doc)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-gray-50 rounded-t-lg flex items-center justify-center">
                <div className="text-6xl opacity-60">{getFileIcon(doc.type)}</div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate flex-1 mr-2">{doc.name}</h3>
                  <Badge className={`${getStatusColor(doc.status)} text-xs`}>
                    {doc.status || 'ready'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3">{doc.type}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    System
                  </span>
                  <span>{formatFileSize(doc.size)}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(doc.updatedAt)}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedDocument(doc)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDocument && (
        <DocumentPreview 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </>
  );
};
