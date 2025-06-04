
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Workflow as WorkflowIcon, 
  Plus, 
  Play, 
  Pause, 
  MoreVertical,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Activity
} from "lucide-react";
import { useWorkflowsStore } from "@/store/useWorkflowsStore";
import { useToast } from "@/hooks/use-toast";

export const Workflow = () => {
  const { 
    workflows, 
    loading, 
    error,
    fetchWorkflows,
    createWorkflow, 
    executeWorkflow, 
    deleteWorkflow,
    clearError
  } = useWorkflowsStore();
  
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: 'manual' as const,
    steps: []
  });

  // Fetch workflows on component mount
  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Computed statistics from actual workflow data
  const activeWorkflows = workflows.filter(w => w.status === 'active').length;
  const completedWorkflows = workflows.filter(w => w.status === 'completed').length;
  const totalExecutions = workflows.reduce((sum, w) => sum + (w.documentIds?.length || 0), 0);
  const successRate = workflows.length > 0 ? Math.round((completedWorkflows / workflows.length) * 100) : 0;

  const handleCreateWorkflow = async () => {
    if (!newWorkflow.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a workflow name.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createWorkflow(newWorkflow);
      toast({
        title: "Workflow created",
        description: `Workflow "${newWorkflow.name}" has been created successfully.`,
      });
      setNewWorkflow({ name: '', description: '', trigger: 'manual', steps: [] });
      setIsCreateOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workflow.",
        variant: "destructive",
      });
    }
  };

  const handleExecuteWorkflow = async (workflowId: string, documentId: string) => {
    try {
      await executeWorkflow(workflowId, documentId);
      toast({
        title: "Workflow executed",
        description: "Workflow has been executed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute workflow.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    try {
      await deleteWorkflow(workflowId);
      toast({
        title: "Workflow deleted",
        description: "Workflow has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete workflow.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
          <p className="text-gray-600 mt-1">Automate your document processes with custom workflows</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Set up an automated workflow for your documents
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="workflow-name">Workflow Name</Label>
                <Input
                  id="workflow-name"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter workflow name"
                />
              </div>
              <div>
                <Label htmlFor="workflow-description">Description</Label>
                <Textarea
                  id="workflow-description"
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this workflow does"
                />
              </div>
              <div>
                <Label htmlFor="workflow-trigger">Trigger</Label>
                <Select value={newWorkflow.trigger} onValueChange={(value: any) => setNewWorkflow(prev => ({ ...prev, trigger: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Trigger</SelectItem>
                    <SelectItem value="upload">Document Upload</SelectItem>
                    <SelectItem value="schedule">Scheduled</SelectItem>
                    <SelectItem value="approval">Approval Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateWorkflow} disabled={loading || !newWorkflow.name}>
                  {loading ? "Creating..." : "Create Workflow"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Workflow Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <WorkflowIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkflows}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExecutions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <div className="grid gap-6">
        {workflows.length > 0 ? (
          workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <WorkflowIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {workflow.name}
                        <Badge className={getStatusBadgeColor(workflow.status)}>
                          {getStatusIcon(workflow.status)}
                          {workflow.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Trigger: {workflow.trigger}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{workflow.steps?.length || 0} steps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Last run: {workflow.lastRun || 'Never'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExecuteWorkflow(workflow.id, 'sample-doc-id')}
                      disabled={loading}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <WorkflowIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first workflow to automate document processing
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Workflow
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
