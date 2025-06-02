
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap, 
  Users, 
  FileText, 
  Database,
  Clock,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  description: string;
  features: string[];
  limits: {
    documents: number | 'unlimited';
    templates: number | 'unlimited';
    folders: number | 'unlimited';
    storage: string;
    apiCalls: number | 'unlimited';
    users: number | 'unlimited';
  };
  popular?: boolean;
  icon: any;
  color: string;
}

export const PricingPlans = () => {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currentPlan, setCurrentPlan] = useState('free');

  // Mock usage data
  const usage = {
    documents: 3,
    templates: 2,
    folders: 8,
    storage: 125, // MB
    apiCalls: 847,
    users: 1
  };

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billing: billingCycle,
      description: 'Perfect for getting started',
      features: [
        '5 documents',
        '3 templates',
        'Unlimited folders',
        '250MB storage',
        'Basic AI modules',
        'Email support'
      ],
      limits: {
        documents: 5,
        templates: 3,
        folders: 'unlimited',
        storage: '250MB',
        apiCalls: 1000,
        users: 1
      },
      icon: FileText,
      color: 'text-gray-600'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 9 : 90,
      billing: billingCycle,
      description: 'Great for individuals and small teams',
      features: [
        '50 documents',
        '15 templates',
        'Unlimited folders',
        '5GB storage',
        'All AI modules',
        'Priority support',
        'Document sharing',
        'Basic analytics'
      ],
      limits: {
        documents: 50,
        templates: 15,
        folders: 'unlimited',
        storage: '5GB',
        apiCalls: 10000,
        users: 3
      },
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 29 : 290,
      billing: billingCycle,
      description: 'Perfect for growing businesses',
      popular: true,
      features: [
        '200 documents',
        '50 templates',
        'Unlimited folders',
        '25GB storage',
        'Advanced AI modules',
        'Team collaboration',
        'Role-based permissions',
        'Advanced analytics',
        'API access',
        'Custom branding'
      ],
      limits: {
        documents: 200,
        templates: 50,
        folders: 'unlimited',
        storage: '25GB',
        apiCalls: 50000,
        users: 10
      },
      icon: Star,
      color: 'text-purple-600'
    },
    {
      id: 'business',
      name: 'Business',
      price: billingCycle === 'monthly' ? 59 : 590,
      billing: billingCycle,
      description: 'For larger teams and organizations',
      features: [
        '1000 documents',
        '200 templates',
        'Unlimited folders',
        '100GB storage',
        'All AI features',
        'Advanced workflows',
        'SSO integration',
        'Custom integrations',
        'Dedicated support',
        'Training sessions'
      ],
      limits: {
        documents: 1000,
        templates: 200,
        folders: 'unlimited',
        storage: '100GB',
        apiCalls: 200000,
        users: 50
      },
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 149 : 1490,
      billing: billingCycle,
      description: 'For large enterprises with custom needs',
      features: [
        'Unlimited documents',
        'Unlimited templates',
        'Unlimited folders',
        '1TB storage',
        'Custom AI models',
        'White-label solution',
        'On-premise deployment',
        'Custom SLAs',
        '24/7 phone support',
        'Dedicated success manager'
      ],
      limits: {
        documents: 'unlimited',
        templates: 'unlimited',
        folders: 'unlimited',
        storage: '1TB',
        apiCalls: 'unlimited',
        users: 'unlimited'
      },
      icon: Crown,
      color: 'text-orange-600'
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: billingCycle === 'monthly' ? 299 : 2990,
      billing: billingCycle,
      description: 'Everything plus premium features',
      features: [
        'Everything in Enterprise',
        'AI model training',
        'Custom workflows',
        'Advanced security',
        'Compliance certifications',
        'Multi-region deployment',
        'Custom development',
        'Executive reporting'
      ],
      limits: {
        documents: 'unlimited',
        templates: 'unlimited',
        folders: 'unlimited',
        storage: 'unlimited',
        apiCalls: 'unlimited',
        users: 'unlimited'
      },
      icon: Shield,
      color: 'text-red-600'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setCurrentPlan(planId);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${plans.find(p => p.id === planId)?.name} plan.`,
    });
  };

  const getUsagePercentage = (current: number, limit: number | string) => {
    if (limit === 'unlimited') return 0;
    return Math.min((current / Number(limit)) * 100, 100);
  };

  const currentPlanData = plans.find(p => p.id === currentPlan);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-600 mt-2">Select the perfect plan for your needs</p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={billingCycle === 'monthly' ? 'font-medium' : 'text-gray-500'}>Monthly</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative"
          >
            <div className={`w-12 h-6 rounded-full transition-colors ${billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </div>
          </Button>
          <span className={billingCycle === 'yearly' ? 'font-medium' : 'text-gray-500'}>
            Yearly 
            <Badge variant="secondary" className="ml-2">Save 17%</Badge>
          </span>
        </div>
      </div>

      {/* Current Usage */}
      {currentPlanData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Current Usage - {currentPlanData.name} Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Documents</span>
                  <span className="text-sm text-gray-600">
                    {usage.documents} / {currentPlanData.limits.documents}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.documents, currentPlanData.limits.documents)} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Templates</span>
                  <span className="text-sm text-gray-600">
                    {usage.templates} / {currentPlanData.limits.templates}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.templates, currentPlanData.limits.templates)} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-gray-600">
                    {usage.storage}MB / {currentPlanData.limits.storage}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.storage, 250)} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-purple-500 shadow-lg scale-105' : ''} ${currentPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                Most Popular
              </Badge>
            )}
            
            <CardHeader>
              <div className="flex items-center gap-2">
                <plan.icon className={`h-6 w-6 ${plan.color}`} />
                <CardTitle>{plan.name}</CardTitle>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={currentPlan === plan.id ? "default" : "outline"}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
              </Button>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Limits:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Documents: {plan.limits.documents}</div>
                  <div>Templates: {plan.limits.templates}</div>
                  <div>Storage: {plan.limits.storage}</div>
                  <div>Users: {plan.limits.users}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>Compare all plans side by side</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="text-center p-2">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Documents</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center p-2">{plan.limits.documents}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Templates</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center p-2">{plan.limits.templates}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Storage</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center p-2">{plan.limits.storage}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Team Users</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center p-2">{plan.limits.users}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
