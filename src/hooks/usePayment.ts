
import { usePaymentQuery } from '@/hooks/queries/usePaymentQuery';

/**
 * Combined hook that provides server data for payment management
 */
export const usePayment = () => {
  const paymentQuery = usePaymentQuery();

  return {
    // Server data
    plans: paymentQuery.plans,
    usage: paymentQuery.usage,
    
    // Server state
    isLoadingPlans: paymentQuery.isLoadingPlans,
    isLoadingUsage: paymentQuery.isLoadingUsage,
    plansError: paymentQuery.plansError?.message || '',
    usageError: paymentQuery.usageError?.message || '',
    
    // Payment actions
    createSubscription: paymentQuery.createSubscription,
    cancelSubscription: paymentQuery.cancelSubscription,
    refetchPlans: paymentQuery.refetchPlans,
    refetchUsage: paymentQuery.refetchUsage,
    
    // Mutation states
    isCreatingSubscription: paymentQuery.isCreatingSubscription,
    isCancellingSubscription: paymentQuery.isCancellingSubscription,
  };
};
