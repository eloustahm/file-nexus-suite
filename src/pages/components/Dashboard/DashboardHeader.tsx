
import { Sparkles } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Here's what's happening with your documents today.</p>
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};
