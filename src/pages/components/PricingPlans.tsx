
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { usePaymentStore } from '@/store/usePaymentStore';
import { useToast } from '@/hooks/use-toast';

export const PricingPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { createSubscription, loading } = usePaymentStore();
  const { toast } = useToast();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small teams',
      monthlyPrice: 9,
      annualPrice: 99,
      icon: Star,
      features: [
        '100 document uploads per month',
        '5GB storage',
        'Basic AI features',
        'Email support',
        '3 team members'
      ],
      limitations: [
        'Limited workflow automation',
        'Basic integrations only'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing teams and businesses',
      monthlyPrice: 29,
      annualPrice: 299,
      icon: Zap,
      popular: true,
      features: [
        'Unlimited document uploads',
        '100GB storage',
        'Advanced AI features',
        'Priority support',
        '15 team members',
        'Custom workflows',
        'Advanced integrations',
        'API access'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 99,
      annualPrice: 999,
      icon: Shield,
      features: [
        'Unlimited everything',
        'Unlimited storage',
        'Custom AI models',
        '24/7 dedicated support',
        'Unlimited team members',
        'Advanced security',
        'On-premise deployment',
        'Custom integrations',
        'SLA guarantee'
      ],
      limitations: []
    }
  ];

  const handleSubscribe = async (planId: string) => {
    try {
      await createSubscription(planId);
      toast({
        title: "Subscription created",
        description: "Your subscription has been activated successfully!",
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error creating your subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const annualTotal = plan.annualPrice;
    const monthlyTotal = plan.monthlyPrice * 12;
    return monthlyTotal - annualTotal;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 mb-8">
          Unlock the full potential of AI-powered document management
        </p>
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-gray-500'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge className="bg-green-100 text-green-800 ml-2">
              Save up to 20%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-blue-500 border-2 shadow-lg' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <plan.icon className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-gray-500">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-green-600 mt-1">
                    Save ${getSavings(plan)} per year
                  </p>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Get ${plan.name}`}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                No setup fees • Cancel anytime
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Can I change plans later?</h4>
              <p className="text-sm text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Is there a free trial?</h4>
              <p className="text-sm text-gray-600">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What happens to my data if I cancel?</h4>
              <p className="text-sm text-gray-600">
                You can export all your data before cancellation. We keep your data for 30 days after cancellation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
