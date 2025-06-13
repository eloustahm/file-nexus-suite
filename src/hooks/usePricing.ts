import { useQuery } from '@tanstack/react-query';
import { PRICING_PLANS, PRICING_FAQS, type PricingPlan } from '@/constants/pricing';

// Mock API function - replace with actual API call
const fetchPricingData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    plans: PRICING_PLANS,
    faqs: PRICING_FAQS
  };
};

export const usePricing = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pricing'],
    queryFn: fetchPricingData
  });

  const getPlan = (id: string) => {
    return data?.plans.find(plan => plan.id === id);
  };

  const getPopularPlan = () => {
    return data?.plans.find(plan => plan.isPopular);
  };

  const getFaq = (id: string) => {
    return data?.faqs.find(faq => faq.id === id);
  };

  return {
    plans: data?.plans ?? [],
    faqs: data?.faqs ?? [],
    isLoading,
    error,
    getPlan,
    getPopularPlan,
    getFaq
  };
}; 