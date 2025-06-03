
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const DocumentOverview = () => {
  const quickStats = [
    { label: "Documents this week", value: "+15", variant: "secondary" as const },
    { label: "Pending reviews", value: "8", variant: "outline" as const },
    { label: "Completed workflows", value: "12", variant: "default" as const },
    { label: "AI chats today", value: "24", variant: "secondary" as const }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Document Overview</CardTitle>
        <CardDescription>Your document statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              <Badge variant={stat.variant} className="font-semibold">{stat.value}</Badge>
            </div>
          ))}
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View All Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
