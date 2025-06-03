
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, MessageSquare, Activity } from "lucide-react";

export const ActionCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Upload className="h-5 w-5" />
            </div>
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100 mb-6">
            Drag and drop files or browse to upload new documents
          </p>
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-100 mb-6">
            Chat with AI about your documents and get insights
          </p>
          <Button className="w-full bg-white text-green-600 hover:bg-gray-100">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            Create Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100 mb-6">
            Automate document processing with custom workflows
          </p>
          <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
            <Activity className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
