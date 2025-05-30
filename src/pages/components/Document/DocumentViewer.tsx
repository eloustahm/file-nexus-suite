
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Edit, 
  Save, 
  Download, 
  Share, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Eye,
  Settings,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Wand2,
  Sparkles,
  RefreshCw,
  Copy,
  Plus
} from "lucide-react";

interface DocumentViewerProps {
  document: {
    id: number;
    name: string;
    type: string;
    size: string;
    modified: string;
    author: string;
    status: string;
    icon: string;
    content?: string;
  };
  onClose: () => void;
}

export const DocumentViewer = ({ document, onClose }: DocumentViewerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(document.content || "");
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState("view");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [aiContentType, setAiContentType] = useState("paragraph");

  const handleSave = () => {
    console.log("Saving document:", { id: document.id, content });
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      let generated = "";
      
      switch (aiContentType) {
        case "paragraph":
          generated = `This is AI-generated content based on your prompt: "${aiPrompt}". Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
          break;
        case "bullet-points":
          generated = `• Key point about ${aiPrompt}\n• Important consideration regarding the topic\n• Additional insight that provides value\n• Conclusion or next steps`;
          break;
        case "heading":
          generated = `# ${aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1)}`;
          break;
        case "summary":
          generated = `**Summary**: This section provides a comprehensive overview of ${aiPrompt}, highlighting the main points and key takeaways for readers to understand the core concepts.`;
          break;
        default:
          generated = `Generated content for: ${aiPrompt}`;
      }
      
      setGeneratedContent(generated);
      setIsGenerating(false);
    }, 2000);
  };

  const insertGeneratedContent = () => {
    const newContent = content + "\n\n" + generatedContent;
    setContent(newContent);
    setGeneratedContent("");
    setAiPrompt("");
  };

  const replaceWithGeneratedContent = () => {
    setContent(generatedContent);
    setGeneratedContent("");
    setAiPrompt("");
  };

  const renderDocumentPreview = () => {
    const docType = document.type.toLowerCase();
    
    if (docType.includes("word") || docType.includes("docx")) {
      return <WordDocumentViewer content={content} isEditing={isEditing} onContentChange={setContent} />;
    } else if (docType.includes("excel") || docType.includes("xlsx")) {
      return <ExcelDocumentViewer content={content} isEditing={isEditing} onContentChange={setContent} />;
    } else if (docType.includes("powerpoint") || docType.includes("pptx")) {
      return <PowerPointViewer content={content} isEditing={isEditing} onContentChange={setContent} />;
    } else if (docType.includes("pdf")) {
      return <PDFViewer content={content} isEditing={isEditing} onContentChange={setContent} />;
    } else {
      return <GenericDocumentViewer content={content} isEditing={isEditing} onContentChange={setContent} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white w-full h-full flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xl">{document.icon}</div>
            <div>
              <h1 className="text-lg font-semibold">{document.name}</h1>
              <p className="text-sm text-gray-500">{document.type}</p>
            </div>
            <Badge variant="secondary">{document.status}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            {isEditing ? (
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        {/* Toolbar for editing */}
        {isEditing && (
          <div className="border-b p-2 flex items-center gap-1 bg-gray-50">
            <Button variant="ghost" size="sm">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignRight className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("ai")}>
              <Wand2 className="h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 overflow-auto">
            <div className="p-6" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
              {renderDocumentPreview()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l bg-gray-50 p-4 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="view" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Document Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Author:</span>
                      <span className="ml-2 font-medium">{document.author}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Modified:</span>
                      <span className="ml-2 font-medium">{document.modified}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-2 font-medium">{document.size}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="edit" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Edit Properties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Document Title</label>
                      <Input defaultValue={document.name} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Tags</label>
                      <Input placeholder="Add tags..." className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Description</label>
                      <Textarea placeholder="Add description..." className="mt-1" rows={3} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      AI Content Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">Content Type</label>
                      <Select value={aiContentType} onValueChange={setAiContentType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paragraph">Paragraph</SelectItem>
                          <SelectItem value="bullet-points">Bullet Points</SelectItem>
                          <SelectItem value="heading">Heading</SelectItem>
                          <SelectItem value="summary">Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500">Describe what you want to generate</label>
                      <Textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g., Write a paragraph about project management best practices..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerateContent}
                      disabled={!aiPrompt.trim() || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {generatedContent && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Generated Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white border rounded-lg p-3 text-sm">
                        <div className="whitespace-pre-wrap">{generatedContent}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" onClick={insertGeneratedContent}>
                          <Plus className="h-4 w-4 mr-1" />
                          Insert
                        </Button>
                        <Button size="sm" variant="outline" onClick={replaceWithGeneratedContent}>
                          Replace All
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(generatedContent)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleGenerateContent}
                        className="w-full"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setAiPrompt("Improve the writing style and clarity of this document");
                        setAiContentType("paragraph");
                      }}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Improve Writing
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setAiPrompt("Create a summary of the main points");
                        setAiContentType("summary");
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Summarize
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setAiPrompt("Expand on this topic with more details");
                        setAiContentType("paragraph");
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Expand Content
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Word Document Viewer Component
const WordDocumentViewer = ({ content, isEditing, onContentChange }: any) => {
  if (isEditing) {
    return (
      <div className="bg-white border rounded-lg shadow-sm min-h-[800px]">
        <div className="p-8">
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full min-h-[600px] border-none resize-none text-base leading-relaxed"
            placeholder="Start typing your document content..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm min-h-[800px]">
      <div className="p-8">
        <div className="prose max-w-none">
          {content ? (
            <div className="whitespace-pre-wrap text-base leading-relaxed">
              {content}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Word Document Preview</p>
              <p className="text-sm mt-2">Click Edit to start adding content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Excel Document Viewer Component
const ExcelDocumentViewer = ({ content, isEditing, onContentChange }: any) => {
  const [cells, setCells] = useState<Record<string, string>>({});

  const updateCell = (key: string, value: string) => {
    const newCells = { ...cells, [key]: value };
    setCells(newCells);
    onContentChange(JSON.stringify(newCells));
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border w-12 h-8 bg-gray-100 text-xs"></th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="border min-w-[100px] h-8 bg-gray-100 text-xs">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, row) => (
              <tr key={row}>
                <td className="border w-12 h-8 bg-gray-100 text-xs text-center">
                  {row + 1}
                </td>
                {Array.from({ length: 10 }, (_, col) => {
                  const cellKey = `${String.fromCharCode(65 + col)}${row + 1}`;
                  return (
                    <td key={col} className="border h-8 p-0">
                      {isEditing ? (
                        <Input
                          value={cells[cellKey] || ""}
                          onChange={(e) => updateCell(cellKey, e.target.value)}
                          className="border-none h-8 text-xs rounded-none"
                        />
                      ) : (
                        <div className="px-2 py-1 text-xs min-h-[32px]">
                          {cells[cellKey] || ""}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PowerPoint Viewer Component
const PowerPointViewer = ({ content, isEditing, onContentChange }: any) => {
  const [slides, setSlides] = useState([
    { id: 1, title: "Slide 1", content: content || "Click to edit slide content" },
    { id: 2, title: "Slide 2", content: "Second slide content" }
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Slide Navigator */}
      <div className="w-48 space-y-2">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`border rounded p-2 cursor-pointer ${
              activeSlide === index ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
          >
            <div className="aspect-video bg-white border rounded text-xs p-1">
              {slide.title}
            </div>
          </div>
        ))}
      </div>

      {/* Main Slide View */}
      <div className="flex-1">
        <div className="bg-white border rounded-lg shadow-sm aspect-video p-8">
          {isEditing ? (
            <div>
              <Input
                value={slides[activeSlide]?.title}
                onChange={(e) => {
                  const newSlides = [...slides];
                  newSlides[activeSlide].title = e.target.value;
                  setSlides(newSlides);
                }}
                className="text-2xl font-bold mb-4 border-none"
                placeholder="Slide title..."
              />
              <Textarea
                value={slides[activeSlide]?.content}
                onChange={(e) => {
                  const newSlides = [...slides];
                  newSlides[activeSlide].content = e.target.value;
                  setSlides(newSlides);
                  onContentChange(JSON.stringify(newSlides));
                }}
                className="w-full h-64 border-none resize-none"
                placeholder="Slide content..."
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">{slides[activeSlide]?.title}</h2>
              <p className="text-lg">{slides[activeSlide]?.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PDF Viewer Component
const PDFViewer = ({ content, isEditing, onContentChange }: any) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm min-h-[800px]">
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">📕</div>
        <h3 className="text-lg font-medium mb-2">PDF Document</h3>
        <p className="text-gray-600 mb-4">PDF preview and annotation tools would be integrated here</p>
        {isEditing && (
          <div className="space-y-4 max-w-md mx-auto">
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Add annotations or notes..."
              rows={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Generic Document Viewer
const GenericDocumentViewer = ({ content, isEditing, onContentChange }: any) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm min-h-[600px]">
      <div className="p-8">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full min-h-[400px] border-none resize-none"
            placeholder="Document content..."
          />
        ) : (
          <div className="text-center py-20 text-gray-500">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Document Preview</p>
            <p className="text-sm mt-2">Generic document viewer</p>
          </div>
        )}
      </div>
    </div>
  );
};
