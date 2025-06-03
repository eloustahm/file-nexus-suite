
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Zap, 
  FileText, 
  MessageSquare, 
  Search, 
  BarChart3,
  Settings,
  Activity,
  Cpu,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AIModules = () => {
  const { toast } = useToast();
  const [activeModules, setActiveModules] = useState({
    documentAnalysis: true,
    chatAssistant: true,
    smartSearch: false,
    dataExtraction: true,
    summaryGeneration: true,
    workflowAutomation: false
  });

  const aiModules = [
    {
      id: 'documentAnalysis',
      name: 'Document Analysis',
      description: 'AI-powered document classification and content analysis',
      icon: FileText,
      usage: 85,
      status: 'active',
      features: ['Content Classification', 'Sentiment Analysis', 'Key Entity Recognition']
    },
    {
      id: 'chatAssistant',
      name: 'AI Chat Assistant',
      description: 'Intelligent document-based question answering',
      icon: MessageSquare,
      usage: 72,
      status: 'active',
      features: ['Natural Language Queries', 'Context-Aware Responses', 'Multi-Document Search']
    },
    {
      id: 'smartSearch',
      name: 'Smart Search',
      description: 'Semantic search across all your documents',
      icon: Search,
      usage: 45,
      status: 'inactive',
      features: ['Semantic Matching', 'Fuzzy Search', 'Content Recommendations']
    },
    {
      id: 'dataExtraction',
      name: 'Data Extraction',
      description: 'Automatically extract structured data from documents',
      icon: Database,
      usage: 63,
      status: 'active',
      features: ['Form Data Extraction', 'Table Recognition', 'Invoice Processing']
    },
    {
      id: 'summaryGeneration',
      name: 'Summary Generation',
      description: 'Generate concise summaries of long documents',
      icon: BarChart3,
      usage: 90,
      status: 'active',
      features: ['Executive Summaries', 'Key Points Extraction', 'Multi-Language Support']
    },
    {
      id: 'workflowAutomation',
      name: 'Workflow Automation',
      description: 'AI-driven document workflow automation',
      icon: Zap,
      usage: 25,
      status: 'inactive',
      features: ['Auto-Routing', 'Approval Workflows', 'Task Assignment']
    }
  ];

  const handleToggleModule = (moduleId: string) => {
    setActiveModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId as keyof typeof activeModules]
    }));
    
    const module = aiModules.find(m => m.id === moduleId);
    toast({
      title: `${module?.name} ${activeModules[moduleId as keyof typeof activeModules] ? 'Disabled' : 'Enabled'}`,
      description: `AI module has been ${activeModules[moduleId as keyof typeof activeModules] ? 'deactivated' : 'activated'}.`,
    });
  };

  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'text-red-600';
    if (usage > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Modules</h1>
        <p className="text-gray-600 mt-1">Manage and configure your AI-powered features</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Object.values(activeModules).filter(Boolean).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  of {aiModules.length} total modules
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Processing</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4k</div>
                <p className="text-xs text-muted-foreground">
                  documents processed today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">
                  accuracy rate this month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent AI Activity</CardTitle>
              <CardDescription>Latest AI processing activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Document analyzed', document: 'Contract_2024.pdf', module: 'Document Analysis', time: '2 min ago' },
                  { action: 'Summary generated', document: 'Meeting Notes.docx', module: 'Summary Generation', time: '5 min ago' },
                  { action: 'Data extracted', document: 'Invoice_001.pdf', module: 'Data Extraction', time: '8 min ago' },
                  { action: 'Chat query answered', document: 'Project Plan.pdf', module: 'AI Chat Assistant', time: '12 min ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.document}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs mb-1">
                        {activity.module}
                      </Badge>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid gap-6">
            {aiModules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <module.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {module.name}
                          <Badge className={getStatusColor(module.status)}>
                            {module.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={activeModules[module.id as keyof typeof activeModules]}
                      onCheckedChange={() => handleToggleModule(module.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Usage this month</span>
                        <span className={getUsageColor(module.usage)}>
                          {module.usage}%
                        </span>
                      </div>
                      <Progress value={module.usage} className="h-2" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Analytics</CardTitle>
              <CardDescription>Detailed insights into AI module performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Analytics dashboard coming soon</p>
                <Button variant="outline">Request Analytics Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
