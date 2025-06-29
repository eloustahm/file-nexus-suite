
import { useQuery } from '@tanstack/react-query';
import { pricingService } from '@/services/pricing';

export const usePricing = () => {
  const { data: plans = [], isLoading: isLoadingPlans, error: plansError } = useQuery({
    queryKey: ['pricing', 'plans'],
    queryFn: pricingService.getPlans
  });

  const { data: faqs = [], isLoading: isLoadingFaqs, error: faqsError } = useQuery({
    queryKey: ['pricing', 'faqs'],
    queryFn: pricingService.getFaqs
  });

  const getPlan = (id: string) => {
    return plans?.find(plan => plan.id === id);
  };

  const getPopularPlan = () => {
    return plans?.find(plan => plan.popular);
  };

  const getFaq = (id: string) => {
    return faqs?.find(faq => faq.id === id);
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
