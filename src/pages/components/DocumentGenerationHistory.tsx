
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Calendar, 
  Download, 
  Eye, 
  RotateCcw,
  Trash2,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GenerationHistory {
  id: string;
  templateName: string;
  agentName: string;
  status: 'completed' | 'generating' | 'failed';
  createdAt: Date;
  content: string;
  wordCount: number;
  downloadCount: number;
}

export const DocumentGenerationHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<GenerationHistory | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Mock data - replace with store integration
  const [generationHistory] = useState<GenerationHistory[]>([
    {
      id: '1',
      templateName: 'Business Plan',
      agentName: 'Business Analyst',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000),
      content: '# Business Plan\n\nExecutive Summary...',
      wordCount: 1250,
      downloadCount: 3
    },
    {
      id: '2',
      templateName: 'Contract Agreement',
      agentName: 'Legal Expert',
      status: 'completed',
      createdAt: new Date(Date.now() - 172800000),
      content: '# Contract Agreement\n\nThis agreement...',
      wordCount: 890,
      downloadCount: 1
    },
    {
      id: '3',
      templateName: 'Project Proposal',
      agentName: 'Project Manager',
      status: 'generating',
      createdAt: new Date(Date.now() - 3600000),
      content: '',
      wordCount: 0,
      downloadCount: 0
    }
  ]);

  const filteredHistory = generationHistory.filter(item =>
    item.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.agentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreview = (document: GenerationHistory) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  const handleDownload = (document: GenerationHistory) => {
    // Create a blob with the content
    const blob = new Blob([document.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.templateName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: `${document.templateName} is being downloaded`,
    });
  };

  const handleRegenerate = (document: GenerationHistory) => {
    toast({
      title: "Regenerating document",
      description: `Starting regeneration of ${document.templateName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Generation History</h1>
        <p className="text-gray-600 mt-1">View and manage your generated documents</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search generated documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHistory.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.templateName}</CardTitle>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>Agent: {item.agentName}</p>
                  <p>Words: {item.wordCount.toLocaleString()}</p>
                  <p>Downloads: {item.downloadCount}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{item.createdAt.toLocaleDateString()}</span>
                  <span>{item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <div className="flex gap-1">
                    {item.status === 'completed' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handlePreview(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownload(item)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRegenerate(item)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedDocument?.templateName}
            </DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Agent: {selectedDocument.agentName}</span>
                <span>•</span>
                <span>Words: {selectedDocument.wordCount.toLocaleString()}</span>
                <span>•</span>
                <span>Created: {selectedDocument.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">
                  {selectedDocument.content}
                </pre>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={() => handleRegenerate(selectedDocument)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No generated documents found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "Generate your first document to see it here"}
          </p>
        </div>
      )}
    </div>
  );
};
