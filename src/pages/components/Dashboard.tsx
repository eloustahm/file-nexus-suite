
import { QuickActionsDashboard } from "./QuickActionsDashboard";
import { DashboardHeader } from "./Dashboard/DashboardHeader";
import { StatsGrid } from "./Dashboard/StatsGrid";
import { RecentActivity } from "./Dashboard/RecentActivity";
import { DocumentOverview } from "./Dashboard/DocumentOverview";
import { AIInsights } from "./Dashboard/AIInsights";
import { ActionCards } from "./Dashboard/ActionCards";
import { WelcomeBanner } from "./Dashboard/WelcomeBanner";

export const Dashboard = () => {
  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen p-6">
      {/* Header */}
      <DashboardHeader />

      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Actions */}
      <QuickActionsDashboard />

      {/* Stats Grid */}
      <StatsGrid />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <RecentActivity />

        {/* Document Overview */}
        <DocumentOverview />
      </div>

      {/* AI Insights */}
      <AIInsights />

      {/* Action Cards */}
      <ActionCards />
    </div>
  );
};
