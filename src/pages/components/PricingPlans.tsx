import { useState } from 'react';
import { usePricing } from '@/hooks/usePricing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const {
    plans,
    faqs,
    isLoading
  } = usePricing();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const getPrice = (price: number) => {
    return billingPeriod === 'yearly' ? price * 10 : price;
  };

  return (
    <div className="space-y-12">
      {/* Billing Period Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-lg border p-1 bg-muted">
          <button
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              billingPeriod === 'monthly'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              billingPeriod === 'yearly'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly
            <span className="ml-1 text-xs text-primary">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "p-6 relative",
              plan.isPopular && "border-primary shadow-lg"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">${getPrice(plan.price)}</span>
                <span className="text-muted-foreground">/{billingPeriod}</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-3">
                  <Check
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      feature.included ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      !feature.included && "text-muted-foreground"
                    )}
                  >
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
            <Button
              variant={plan.buttonVariant}
              className="w-full"
            >
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
