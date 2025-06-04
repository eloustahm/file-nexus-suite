
import { create } from 'zustand';

/**
 * Settings UI Store - Manages only UI state for settings interface
 */
interface SettingsUIState {
  // Active section/tab
  activeSection: 'profile' | 'security' | 'notifications' | 'integrations' | 'billing';
  
  // Modal and dialog UI state
  showPasswordModal: boolean;
  showDeleteAccountConfirm: boolean;
  showIntegrationModal: string | null; // integration provider
  
  // Form states
  isEditing: boolean;
  unsavedChanges: boolean;
  
  // Actions
  setActiveSection: (section: 'profile' | 'security' | 'notifications' | 'integrations' | 'billing') => void;
  setShowPasswordModal: (show: boolean) => void;
  setShowDeleteAccountConfirm: (show: boolean) => void;
  setShowIntegrationModal: (provider: string | null) => void;
  setIsEditing: (editing: boolean) => void;
  setUnsavedChanges: (changes: boolean) => void;
  reset: () => void;
}

export const useSettingsUIStore = create<SettingsUIState>((set) => ({
  activeSection: 'profile',
  showPasswordModal: false,
  showDeleteAccountConfirm: false,
  showIntegrationModal: null,
  isEditing: false,
  unsavedChanges: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setShowPasswordModal: (show) => set({ showPasswordModal: show }),
  setShowDeleteAccountConfirm: (show) => set({ showDeleteAccountConfirm: show }),
  setShowIntegrationModal: (provider) => set({ showIntegrationModal: provider }),
  setIsEditing: (editing) => set({ isEditing: editing }),
  setUnsavedChanges: (changes) => set({ unsavedChanges: changes }),
  reset: () => set({ 
    activeSection: 'profile',
    showPasswordModal: false,
    showDeleteAccountConfirm: false,
    showIntegrationModal: null,
    isEditing: false,
    unsavedChanges: false
  }),
}));
