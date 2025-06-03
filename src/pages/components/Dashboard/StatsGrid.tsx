
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Activity, Users, Folder, ArrowUpRight } from "lucide-react";

export const StatsGrid = () => {
  const stats = [
    {
      title: "Total Documents",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Workflows",
      value: "23",
      change: "+5%", 
      changeType: "positive" as const,
      icon: Activity,
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      changeType: "neutral" as const,
      icon: Users,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Storage Used",
      value: "2.1 GB",
      change: "+0.5 GB",
      changeType: "neutral" as const,
      icon: Folder,
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const getChangeColor = (type: string) => {
    switch (type) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className={`text-sm flex items-center ${getChangeColor(stat.changeType)}`}>
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
