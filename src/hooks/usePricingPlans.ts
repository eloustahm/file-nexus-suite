import { useQuery } from '@tanstack/react-query';
import { PRICING_PLANS, PRICING_FAQS, PricingPlan } from '@/constants/pricing';

// Mock API function - replace with actual API call
const fetchPricingPlans = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return PRICING_PLANS;
};

export const usePricingPlans = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ['pricingPlans'],
    queryFn: fetchPricingPlans
  });

  const getPlanById = (id: string) => {
    return plans?.find(plan => plan.id === id);
  };

  const getPopularPlan = () => {
    return plans?.find(plan => plan.popular);
  };

  const getPlansByBillingPeriod = (period: 'monthly' | 'yearly') => {
    return plans?.filter(plan => plan.billingPeriod === period) ?? [];
  };

  return {
    plans,
    isLoading,
    getPlanById,
    getPopularPlan,
    getPlansByBillingPeriod,
    faqs: PRICING_FAQS
  };
}; 