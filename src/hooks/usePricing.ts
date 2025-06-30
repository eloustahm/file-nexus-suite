
import { useQuery } from '@tanstack/react-query';
import { pricingService } from '@/services/pricing';
import { PRICING_PLANS, PRICING_FAQS } from '@/constants/pricing';

export const usePricing = () => {
  const { data: plans = PRICING_PLANS, isLoading: isLoadingPlans, error: plansError } = useQuery({
    queryKey: ['pricing', 'plans'],
    queryFn: () => Promise.resolve(PRICING_PLANS),
    initialData: PRICING_PLANS
  });

  const { data: faqs = PRICING_FAQS, isLoading: isLoadingFaqs, error: faqsError } = useQuery({
    queryKey: ['pricing', 'faqs'],
    queryFn: () => Promise.resolve(PRICING_FAQS),
    initialData: PRICING_FAQS
  });

  const getPlan = (id: string) => {
    return plans.find(plan => plan.id === id);
  };

  const getPopularPlan = () => {
    return plans.find(plan => plan.popular);
  };

  const getFaq = (id: string) => {
    return faqs.find(faq => faq.id === id);
  };

  return {
    plans: plans ?? [],
    faqs: faqs ?? [],
    isLoading: isLoadingPlans || isLoadingFaqs,
    error: plansError || faqsError,
    getPlan,
    getPopularPlan,
    getFaq
  };
};
