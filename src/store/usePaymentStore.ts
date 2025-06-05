
import { create } from 'zustand';

/**
 * UI-only state for payment (no server data)
 */
interface PaymentUIState {
  // UI State
  selectedPlan: string | null;
  isAnnual: boolean;
  showUpgradeModal: boolean;
  
  // UI Actions
  setSelectedPlan: (planId: string | null) => void;
  setIsAnnual: (annual: boolean) => void;
  setShowUpgradeModal: (show: boolean) => void;
}

export const usePaymentStore = create<PaymentUIState>((set) => ({
  // Initial UI state
  selectedPlan: null,
  isAnnual: false,
  showUpgradeModal: false,

  // UI Actions
  setSelectedPlan: (planId) => set({ selectedPlan: planId }),
  setIsAnnual: (annual) => set({ isAnnual: annual }),
  setShowUpgradeModal: (show) => set({ showUpgradeModal: show }),
}));
