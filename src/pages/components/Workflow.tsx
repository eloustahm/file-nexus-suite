
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Settings,
  Trash2,
  Save
} from "lucide-react";

export const Workflow = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Document Review Process",
      description: "Standard review workflow for important documents",
      status: "active",
      documentsCount: 12,
      steps: [
        { id: 1, name: "Draft Creation", assignee: "Author", status: "completed" },
        { id: 2, name: "Peer Review", assignee: "Team Lead", status: "in-progress" },
        { id: 3, name: "Final Approval", assignee: "Manager", status: "pending" }
      ]
    },
    {
      id: 2,
      name: "Legal Document Approval",
      description: "Workflow for legal documents requiring compliance review",
      status: "active",
      documentsCount: 5,
      steps: [
        { id: 1, name: "Initial Draft", assignee: "Legal Team", status: "completed" },
        { id: 2, name: "Compliance Check", assignee: "Compliance Officer", status: "completed" },
        { id: 3, name: "Final Review", assignee: "Legal Director", status: "in-progress" }
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

  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    defaultAssignee: "",
    steps: []
  });

  const [editingStep, setEditingStep] = useState(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [createWorkflowOpen, setCreateWorkflowOpen] = useState(false);

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

  const handleDeleteStep = (workflowId: number, stepId: number) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === workflowId 
        ? { ...workflow, steps: workflow.steps.filter(step => step.id !== stepId) }
        : workflow
    ));
  };

  const handleEditStep = (workflowId: number, stepId: number, newData: any) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === workflowId 
        ? { 
            ...workflow, 
            steps: workflow.steps.map(step => 
              step.id === stepId ? { ...step, ...newData } : step
            )
          }
        : workflow
    ));
    setEditingStep(null);
  };

  const handleCreateWorkflow = () => {
    if (newWorkflow.name && newWorkflow.description) {
      const newId = Math.max(...workflows.map(w => w.id)) + 1;
      setWorkflows([...workflows, {
        id: newId,
        name: newWorkflow.name,
        description: newWorkflow.description,
        status: "active",
        documentsCount: 0,
        steps: []
      }]);
      setNewWorkflow({ name: "", description: "", defaultAssignee: "", steps: [] });
      setCreateWorkflowOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Workflows</h1>
          <p className="text-gray-600 mt-1">Manage document approval and review processes</p>
        </div>
        <Dialog open={createWorkflowOpen} onOpenChange={setCreateWorkflowOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>Design a new workflow for document processing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Workflow Name</label>
                <Input 
                  placeholder="Enter workflow name" 
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe the workflow purpose" 
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Default Assignee</label>
                <Select value={newWorkflow.defaultAssignee} onValueChange={(value) => setNewWorkflow({...newWorkflow, defaultAssignee: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select default assignee" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateWorkflow}>Create Workflow</Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
              {showAdvancedSettings && (
                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-medium">Advanced Configuration</h4>
                  <div>
                    <label className="text-sm font-medium">Auto-assign documents</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select auto-assignment rule" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="load-based">Load Based</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deadline (days)</label>
                    <Input type="number" placeholder="7" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email notifications</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select notification frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
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
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border relative group ${
                              step.status === 'completed' ? 'bg-green-50 border-green-200' :
                              step.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                              'bg-gray-50 border-gray-200'
                            }`}>
                              {getStatusIcon(step.status)}
                              <div>
                                <p className="text-xs font-medium">{step.name}</p>
                                <p className="text-xs text-gray-500">{step.assignee}</p>
                              </div>
                              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => setEditingStep({ workflowId: workflow.id, stepId: step.id, ...step })}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 text-red-500 hover:text-red-700"
                                  onClick={() => handleDeleteStep(workflow.id, step.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
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
                          <Play className="h-4 w-4" />
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
                  <SelectContent className="bg-white">
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button>Save Template</Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Step Dialog */}
      {editingStep && (
        <Dialog open={!!editingStep} onOpenChange={() => setEditingStep(null)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Edit Workflow Step</DialogTitle>
              <DialogDescription>Modify the step details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Step Name</label>
                <Input 
                  value={editingStep.name}
                  onChange={(e) => setEditingStep({...editingStep, name: e.target.value})}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Assignee</label>
                <Input 
                  value={editingStep.assignee}
                  onChange={(e) => setEditingStep({...editingStep, assignee: e.target.value})}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={editingStep.status} 
                  onValueChange={(value) => setEditingStep({...editingStep, status: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEditStep(editingStep.workflowId, editingStep.stepId, {
                    name: editingStep.name,
                    assignee: editingStep.assignee,
                    status: editingStep.status
                  })}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingStep(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
