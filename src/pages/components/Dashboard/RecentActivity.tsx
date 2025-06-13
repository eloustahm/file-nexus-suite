
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, Loader2 } from "lucide-react";
import { useDashboardQuery } from "@/hooks/queries/useDashboardQuery";
import { formatDate } from "@/lib/utils";

export const RecentActivity = () => {
  const { stats, isLoading, error } = useDashboardQuery();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              <CardDescription>Latest actions in your workspace</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              <CardDescription>Latest actions in your workspace</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600 p-8">
            Error loading recent activity
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentActivities = stats?.recentActivities || [];

  return (
    <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest actions in your workspace</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentActivities.length === 0 ? (
            <div className="text-center text-gray-500 p-8">
              No recent activity found
            </div>
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                <div className="flex-shrink-0">
                  {getStatusIcon('completed')}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details || activity.entityType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.userId || 'System'}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
