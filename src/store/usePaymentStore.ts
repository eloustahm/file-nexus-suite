
import { create } from 'zustand';
import { paymentApi } from '@/services/payment';
import type { Plan, Usage } from '@/services/payment';

/**
 * Payment store with both UI state and server data methods
 */
interface PaymentState {
  // UI State
  selectedPlan: string | null;
  showCancelDialog: boolean;
  
  // Server data (temporary until React Query)
  plans: Plan[];
  usage: Usage | null;
  loading: boolean;
  error: string | null;
  
  // UI Actions
  setSelectedPlan: (planId: string | null) => void;
  setShowCancelDialog: (show: boolean) => void;
  
  // Server actions (temporary)
  fetchPlans: () => Promise<void>;
  fetchUsage: () => Promise<void>;
  createSubscription: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  // Initial UI state
  selectedPlan: null,
  showCancelDialog: false,
  
  // Initial server state
  plans: [],
  usage: null,
  loading: false,
  error: null,

  // UI Actions
  setSelectedPlan: (planId) => set({ selectedPlan: planId }),
  setShowCancelDialog: (show) => set({ showCancelDialog: show }),
  
  // Server actions (mock implementations)
  fetchPlans: async () => {
    set({ loading: true, error: null });
    try {
      // Mock data for now
      const mockPlans: Plan[] = [
        {
          id: 'starter',
          name: 'Starter',
          description: 'Perfect for individuals',
          price: 9,
          interval: 'month',
          features: ['100 documents', '5GB storage']
        },
        {
          id: 'professional', 
          name: 'Professional',
          description: 'For growing teams',
          price: 29,
          interval: 'month',
          features: ['Unlimited documents', '100GB storage'],
          popular: true
        }
      ];
      set({ plans: mockPlans, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchUsage: async () => {
    set({ loading: true, error: null });
    try {
      const mockUsage: Usage = {
        documentsUploaded: 45,
        documentsLimit: 100,
        storageUsed: 2.1,
        storageLimit: 5,
        apiCalls: 1250,
        apiLimit: 5000
      };
      set({ usage: mockUsage, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createSubscription: async (planId: string) => {
    set({ loading: true, error: null });
    try {
      // Mock subscription creation
      console.log('Creating subscription for plan:', planId);
      set({ loading: false, selectedPlan: planId });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  cancelSubscription: async () => {
    set({ loading: true, error: null });
    try {
      // Mock subscription cancellation
      console.log('Cancelling subscription');
      set({ loading: false, selectedPlan: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));
