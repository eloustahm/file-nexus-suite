
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Star, Zap, Crown, Rocket, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PricingPlans = () => {
  const { toast } = useToast();
  const [currentPlan] = useState("free");
  
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      icon: Star,
      color: "bg-gray-100 text-gray-800",
      limits: {
        documents: 5,
        templates: 3,
        folders: "unlimited",
        storage: "250MB",
        aiRequests: 50,
        teamMembers: 1
      },
      features: [
        "5 documents",
        "3 workflow templates",
        "Unlimited folders",
        "250MB storage",
        "50 AI requests/month",
        "Basic document management",
        "Email support"
      ]
    },
    {
      id: "starter",
      name: "Starter",
      price: "$9",
      period: "per month",
      icon: Zap,
      color: "bg-blue-100 text-blue-800",
      popular: true,
      limits: {
        documents: 50,
        templates: 10,
        folders: "unlimited",
        storage: "2GB",
        aiRequests: 500,
        teamMembers: 3
      },
      features: [
        "50 documents",
        "10 workflow templates",
        "Unlimited folders",
        "2GB storage",
        "500 AI requests/month",
        "Advanced AI modules",
        "Team collaboration (3 members)",
        "Priority support"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      price: "$29",
      period: "per month",
      icon: Crown,
      color: "bg-purple-100 text-purple-800",
      limits: {
        documents: 200,
        templates: 25,
        folders: "unlimited",
        storage: "10GB",
        aiRequests: 2000,
        teamMembers: 10
      },
      features: [
        "200 documents",
        "25 workflow templates",
        "Unlimited folders",
        "10GB storage",
        "2000 AI requests/month",
        "All AI modules",
        "Team collaboration (10 members)",
        "Advanced sharing & permissions",
        "Activity logs",
        "Priority support"
      ]
    },
    {
      id: "business",
      name: "Business",
      price: "$79",
      period: "per month",
      icon: Rocket,
      color: "bg-green-100 text-green-800",
      limits: {
        documents: 1000,
        templates: 100,
        folders: "unlimited",
        storage: "50GB",
        aiRequests: 10000,
        teamMembers: 50
      },
      features: [
        "1000 documents",
        "100 workflow templates",
        "Unlimited folders",
        "50GB storage",
        "10,000 AI requests/month",
        "All AI modules + custom models",
        "Team collaboration (50 members)",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "Dedicated support"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      period: "per month",
      icon: Building,
      color: "bg-red-100 text-red-800",
      limits: {
        documents: "unlimited",
        templates: "unlimited",
        folders: "unlimited",
        storage: "500GB",
        aiRequests: "unlimited",
        teamMembers: "unlimited"
      },
      features: [
        "Unlimited documents",
        "Unlimited workflow templates",
        "Unlimited folders",
        "500GB storage",
        "Unlimited AI requests",
        "Custom AI models",
        "Unlimited team members",
        "Advanced security & compliance",
        "SSO integration",
        "Custom branding",
        "24/7 phone support",
        "Dedicated account manager"
      ]
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: "$499",
      period: "per month",
      icon: Star,
      color: "bg-yellow-100 text-yellow-800",
      limits: {
        documents: "unlimited",
        templates: "unlimited",
        folders: "unlimited",
        storage: "2TB",
        aiRequests: "unlimited",
        teamMembers: "unlimited"
      },
      features: [
        "Everything in Enterprise",
        "2TB storage",
        "White-label solution",
        "On-premise deployment option",
        "Custom AI model training",
        "Advanced workflow automation",
        "Multi-region data hosting",
        "Custom SLA",
        "Priority feature requests",
        "Quarterly business reviews"
      ]
    }
  ];

  const currentPlanData = plans.find(plan => plan.id === currentPlan);
  const usageData = {
    documents: { used: 3, limit: currentPlanData?.limits.documents || 5 },
    storage: { used: 125, limit: 250 }, // in MB
    aiRequests: { used: 23, limit: 50 }
  };

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Plan Upgrade",
      description: `Upgrading to ${plans.find(p => p.id === planId)?.name} plan...`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
        <p className="text-gray-600 mt-1">Choose the perfect plan for your needs</p>
      </div>

      {/* Current Plan Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Plan Usage</span>
            <Badge className={currentPlanData?.color}>
              {currentPlanData?.name}
            </Badge>
          </CardTitle>
          <CardDescription>
            Track your current usage against plan limits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Documents</span>
                <span className="text-sm text-gray-600">
                  {usageData.documents.used}/{usageData.documents.limit}
                </span>
              </div>
              <Progress 
                value={(usageData.documents.used / usageData.documents.limit) * 100} 
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-gray-600">
                  {usageData.storage.used}MB/{usageData.storage.limit}MB
                </span>
              </div>
              <Progress 
                value={(usageData.storage.used / usageData.storage.limit) * 100} 
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">AI Requests</span>
                <span className="text-sm text-gray-600">
                  {usageData.aiRequests.used}/{usageData.aiRequests.limit}
                </span>
              </div>
              <Progress 
                value={(usageData.aiRequests.used / usageData.aiRequests.limit) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className={`inline-flex p-3 rounded-full ${plan.color} mx-auto mb-4`}>
                <plan.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleUpgrade(plan.id)}
                className="w-full"
                variant={plan.id === currentPlan ? "outline" : "default"}
                disabled={plan.id === currentPlan}
              >
                {plan.id === currentPlan ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Can I change my plan at any time?</h4>
            <p className="text-sm text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">What happens if I exceed my plan limits?</h4>
            <p className="text-sm text-gray-600">
              You'll receive notifications as you approach your limits. If exceeded, you'll need to upgrade or some features may be temporarily restricted.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Is there a free trial for paid plans?</h4>
            <p className="text-sm text-gray-600">
              Yes, all paid plans come with a 14-day free trial. No credit card required to start.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
