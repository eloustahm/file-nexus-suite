
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp, BarChart3 } from "lucide-react";

export const AIInsights = () => {
  const aiInsights = [
    {
      title: "Document Processing",
      description: "AI processed 156 documents this week",
      value: "87%",
      progress: 87,
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Team Efficiency", 
      description: "Workflow completion rate improved",
      value: "+23%",
      progress: 73,
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Storage Optimization",
      description: "Space usage optimized by AI",
      value: "2.1GB",
      progress: 45,
      icon: BarChart3,
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {aiInsights.map((insight, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">{insight.title}</CardTitle>
                <CardDescription className="mt-1">{insight.description}</CardDescription>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center shadow-lg`}>
                <insight.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-3">{insight.value}</div>
            <Progress value={insight.progress} className="h-2 mb-2" />
            <p className="text-xs text-gray-500">Progress: {insight.progress}%</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
