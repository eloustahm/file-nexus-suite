
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Workflow as WorkflowIcon,
  Plus,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  User,
  ArrowRight,
  Edit,
  MoreVertical,
  Settings
} from "lucide-react";

export const Workflow = () => {
  const [workflows] = useState([
    {
      id: 1,
      name: "Document Review Process",
      description: "Standard review workflow for important documents",
      status: "active",
      documentsCount: 12,
      steps: [
        { name: "Draft Creation", assignee: "Author", status: "completed" },
        { name: "Peer Review", assignee: "Team Lead", status: "in-progress" },
        { name: "Final Approval", assignee: "Manager", status: "pending" }
      ]
    },
    {
      id: 2,
      name: "Legal Document Approval",
      description: "Workflow for legal documents requiring compliance review",
      status: "active",
      documentsCount: 5,
      steps: [
        { name: "Initial Draft", assignee: "Legal Team", status: "completed" },
        { name: "Compliance Check", assignee: "Compliance Officer", status: "completed" },
        { name: "Final Review", assignee: "Legal Director", status: "in-progress" }
      ]
    }
  ]);

  const [documentsInWorkflow] = useState([
    {
      id: 1,
      name: "Employee Handbook 2024.docx",
      workflow: "Document Review Process",
      currentStep: "Peer Review",
      assignee: "Sarah Wilson",
      dueDate: "Tomorrow",
      priority: "high",
      status: "in-progress"
    },
    {
      id: 2,
      name: "Privacy Policy Update.pdf",
      workflow: "Legal Document Approval",
      currentStep: "Final Review",
      assignee: "Mike Johnson",
      dueDate: "Dec 25",
      priority: "medium",
      status: "pending"
    },
    {
      id: 3,
      name: "Marketing Guidelines.docx",
      workflow: "Document Review Process",
      currentStep: "Final Approval",
      assignee: "Lisa Chen",
      dueDate: "Dec 30",
      priority: "low",
      status: "review"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Play className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Workflows</h1>
          <p className="text-gray-600 mt-1">Manage document approval and review processes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Workflows</TabsTrigger>
          <TabsTrigger value="documents">Documents in Workflow</TabsTrigger>
          <TabsTrigger value="templates">Workflow Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <WorkflowIcon className="h-5 w-5" />
                        {workflow.name}
                      </CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{workflow.documentsCount} documents in workflow</span>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-900">Workflow Steps</h4>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {workflow.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2 flex-shrink-0">
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                              step.status === 'completed' ? 'bg-green-50 border-green-200' :
                              step.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                              'bg-gray-50 border-gray-200'
                            }`}>
                              {getStatusIcon(step.status)}
                              <div>
                                <p className="text-xs font-medium">{step.name}</p>
                                <p className="text-xs text-gray-500">{step.assignee}</p>
                              </div>
                            </div>
                            {index < workflow.steps.length - 1 && (
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {documentsInWorkflow.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📄</div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <WorkflowIcon className="h-3 w-3" />
                          <span>{doc.workflow}</span>
                          <span>•</span>
                          <span>Current: {doc.currentStep}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <User className="h-3 w-3" />
                          <span>Assigned to {doc.assignee}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>Due {doc.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(doc.priority)}>
                        {doc.priority}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Workflow Template</CardTitle>
              <CardDescription>Design a reusable workflow for document processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Workflow Name</label>
                <Input placeholder="Enter workflow name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the workflow purpose" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Default Assignee</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select default assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button>Save Template</Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
