
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  FileText, 
  Search, 
  CheckCircle, 
  Star,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AIModules = () => {
  const { toast } = useToast();
  const [testText, setTestText] = useState("");
  const [moduleResults, setModuleResults] = useState<any>({});
  const [activeModules, setActiveModules] = useState({
    summarization: true,
    classification: true,
    sentiment: false,
    keywordExtraction: true,
    readability: false,
    factCheck: false,
    translation: false,
    writing: true
  });

  const aiModules = [
    {
      id: 'summarization',
      name: 'Auto-Summarization',
      description: 'Automatically generate concise summaries of your documents',
      icon: FileText,
      color: 'bg-blue-100 text-blue-800',
      features: ['Extractive summarization', 'Abstractive summarization', 'Custom length']
    },
    {
      id: 'classification',
      name: 'Document Classification',
      description: 'Automatically categorize documents by type, topic, or priority',
      icon: Target,
      color: 'bg-green-100 text-green-800',
      features: ['Content categorization', 'Priority scoring', 'Topic detection']
    },
    {
      id: 'sentiment',
      name: 'Sentiment Analysis',
      description: 'Analyze the emotional tone and sentiment of your documents',
      icon: BarChart3,
      color: 'bg-purple-100 text-purple-800',
      features: ['Emotion detection', 'Tone analysis', 'Confidence scoring']
    },
    {
      id: 'keywordExtraction',
      name: 'Keyword Extraction',
      description: 'Extract key terms and phrases for better searchability',
      icon: Search,
      color: 'bg-orange-100 text-orange-800',
      features: ['Key phrase extraction', 'Entity recognition', 'Tag generation']
    },
    {
      id: 'readability',
      name: 'Readability Analysis',
      description: 'Assess document complexity and reading level',
      icon: CheckCircle,
      color: 'bg-indigo-100 text-indigo-800',
      features: ['Reading level', 'Complexity score', 'Improvement suggestions']
    },
    {
      id: 'factCheck',
      name: 'AI Fact Checking',
      description: 'Verify claims and statements in your documents',
      icon: Star,
      color: 'bg-red-100 text-red-800',
      features: ['Claim verification', 'Source checking', 'Accuracy scoring']
    },
    {
      id: 'translation',
      name: 'Smart Translation',
      description: 'Translate documents while preserving context and meaning',
      icon: MessageSquare,
      color: 'bg-teal-100 text-teal-800',
      features: ['Multi-language support', 'Context preservation', 'Batch translation']
    },
    {
      id: 'writing',
      name: 'Writing Assistant',
      description: 'Get AI-powered suggestions to improve your writing',
      icon: Sparkles,
      color: 'bg-pink-100 text-pink-800',
      features: ['Grammar checking', 'Style suggestions', 'Tone adjustment']
    }
  ];

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    setActiveModules(prev => ({ ...prev, [moduleId]: enabled }));
    toast({
      title: enabled ? "Module Enabled" : "Module Disabled",
      description: `${aiModules.find(m => m.id === moduleId)?.name} has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleTestModule = (moduleId: string) => {
    if (!testText.trim()) {
      toast({
        title: "Test Text Required",
        description: "Please enter some text to test the AI module.",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI processing
    const mockResults = {
      summarization: "This is a sample summary of the provided text, highlighting the key points and main ideas.",
      classification: { category: "Technical Document", confidence: 0.85, topics: ["AI", "Machine Learning", "Technology"] },
      sentiment: { sentiment: "Positive", confidence: 0.78, emotions: ["Interest", "Curiosity"] },
      keywordExtraction: ["artificial intelligence", "machine learning", "technology", "innovation"],
      readability: { level: "College Level", score: 12.5, complexity: "Medium" },
      factCheck: { claims: 2, verified: 1, flagged: 1, accuracy: "75%" },
      translation: { language: "Spanish", text: "Este es un texto traducido de ejemplo." },
      writing: { issues: 3, suggestions: ["Consider shorter sentences", "Use active voice", "Add transitions"] }
    };

    setModuleResults(prev => ({ ...prev, [moduleId]: mockResults[moduleId as keyof typeof mockResults] }));
    
    toast({
      title: "Analysis Complete",
      description: `${aiModules.find(m => m.id === moduleId)?.name} analysis has been completed.`,
    });
  };

  const renderModuleResult = (moduleId: string, result: any) => {
    if (!result) return null;

    switch (moduleId) {
      case 'summarization':
        return <p className="text-sm text-gray-600">{result}</p>;
      
      case 'classification':
        return (
          <div className="space-y-2">
            <p className="text-sm"><strong>Category:</strong> {result.category}</p>
            <p className="text-sm"><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
            <div className="flex flex-wrap gap-1">
              {result.topics.map((topic: string) => (
                <Badge key={topic} variant="outline" className="text-xs">{topic}</Badge>
              ))}
            </div>
          </div>
        );
      
      case 'sentiment':
        return (
          <div className="space-y-2">
            <p className="text-sm"><strong>Sentiment:</strong> {result.sentiment}</p>
            <p className="text-sm"><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
            <div className="flex flex-wrap gap-1">
              {result.emotions.map((emotion: string) => (
                <Badge key={emotion} variant="outline" className="text-xs">{emotion}</Badge>
              ))}
            </div>
          </div>
        );
      
      case 'keywordExtraction':
        return (
          <div className="flex flex-wrap gap-1">
            {result.map((keyword: string) => (
              <Badge key={keyword} variant="outline" className="text-xs">{keyword}</Badge>
            ))}
          </div>
        );
      
      default:
        return <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Modules</h1>
        <p className="text-gray-600 mt-1">Enhance your documents with artificial intelligence</p>
      </div>

      {/* Test Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Test AI Modules
          </CardTitle>
          <CardDescription>
            Enter some text below to test the AI modules in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your text here to test AI modules..."
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="min-h-24"
          />
        </CardContent>
      </Card>

      {/* AI Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {aiModules.map((module) => (
          <Card key={module.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${module.color}`}>
                    <module.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                </div>
                <Switch
                  checked={activeModules[module.id as keyof typeof activeModules]}
                  onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Features:</h4>
                <div className="space-y-1">
                  {module.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleTestModule(module.id)}
                  disabled={!activeModules[module.id as keyof typeof activeModules] || !testText.trim()}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Test Module
                </Button>
              </div>

              {/* Module Results */}
              {moduleResults[module.id] && (
                <div className="border-t pt-3 space-y-2">
                  <h4 className="font-medium text-sm">Result:</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {renderModuleResult(module.id, moduleResults[module.id])}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage & Performance</CardTitle>
          <CardDescription>Monitor your AI module usage and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Documents Processed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">98.2%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2.3s</div>
              <div className="text-sm text-gray-600">Avg Processing Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">847</div>
              <div className="text-sm text-gray-600">API Calls Today</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
