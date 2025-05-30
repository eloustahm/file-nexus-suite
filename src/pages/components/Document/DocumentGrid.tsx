
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

interface DocumentGridProps {
  viewMode: "grid" | "list";
  searchQuery: string;
}

export const DocumentGrid = ({ viewMode, searchQuery }: DocumentGridProps) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  
  const documents = [
    {
      id: 1,
      name: "Project Proposal Q4.docx",
      type: "Word Document",
      size: "2.1 MB",
      modified: "2 hours ago",
      author: "John Doe",
      status: "draft",
      icon: "📄",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Financial Report.xlsx",
      type: "Excel Spreadsheet",
      size: "1.8 MB",
      modified: "4 hours ago",
      author: "Jane Smith",
      status: "final",
      icon: "📊",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Marketing Strategy.pptx",
      type: "PowerPoint Presentation",
      size: "5.2 MB",
      modified: "1 day ago",
      author: "Mike Johnson",
      status: "review",
      icon: "📋",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Contract Template.pdf",
      type: "PDF Document",
      size: "890 KB",
      modified: "2 days ago",
      author: "Sarah Wilson",
      status: "approved",
      icon: "📕",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Meeting Notes.docx",
      type: "Word Document",
      size: "1.2 MB",
      modified: "3 days ago",
      author: "John Doe",
      status: "draft",
      icon: "📄",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Budget Analysis.xlsx",
      type: "Excel Spreadsheet",
      size: "3.4 MB",
      modified: "1 week ago",
      author: "Alice Brown",
      status: "final",
      icon: "📊",
      thumbnail: "/placeholder.svg"
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "final": return "bg-green-100 text-green-800";
      case "review": return "bg-blue-100 text-blue-800";
      case "approved": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
                  <div className="text-2xl">{doc.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {doc.author}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-gray-600">{doc.type}</div>
                <div className="col-span-2 text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {doc.modified}
                </div>
                <div className="col-span-2 text-sm text-gray-600">{doc.size}</div>
                <div className="col-span-1">
                  <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
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
                <div className="text-6xl opacity-60">{doc.icon}</div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate flex-1 mr-2">{doc.name}</h3>
                  <Badge className={`${getStatusColor(doc.status)} text-xs`}>
                    {doc.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3">{doc.type}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {doc.author}
                  </span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {doc.modified}
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
