
import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { DocumentsProvider } from './DocumentsContext';
import { DocumentChatProvider } from './DocumentChatContext';
import { DocumentGenerationProvider } from './DocumentGenerationContext';
import { ChatProvider } from './ChatContext';
import { ActivityProvider } from './ActivityContext';
import { FoldersProvider } from './FoldersContext';
import { NotificationsProvider } from './NotificationsContext';
import { PaymentProvider } from './PaymentContext';
import { SettingsProvider } from './SettingsContext';
import { TeamChatProvider } from './TeamChatContext';
import { TeamCollaborationProvider } from './TeamCollaborationContext';
import { TeamProvider } from './TeamContext';
import { WorkflowsProvider } from './WorkflowsContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <DocumentsProvider>
        <DocumentChatProvider>
          <DocumentGenerationProvider>
            <ChatProvider>
              <ActivityProvider>
                <FoldersProvider>
                  <NotificationsProvider>
                    <PaymentProvider>
                      <SettingsProvider>
                        <TeamChatProvider>
                          <TeamCollaborationProvider>
                            <TeamProvider>
                              <WorkflowsProvider>
                                {children}
                              </WorkflowsProvider>
                            </TeamProvider>
                          </TeamCollaborationProvider>
                        </TeamChatProvider>
                      </SettingsProvider>
                    </PaymentProvider>
                  </NotificationsProvider>
                </FoldersProvider>
              </ActivityProvider>
            </ChatProvider>
          </DocumentGenerationProvider>
        </DocumentChatProvider>
      </DocumentsProvider>
    </AuthProvider>
  );
};

// Export all hooks
export { useAuth } from './AuthContext';
export { useDocuments } from './DocumentsContext';
export { useDocumentChat } from './DocumentChatContext';
export { useDocumentGeneration } from './DocumentGenerationContext';
export { useChat } from './ChatContext';
export { useActivity } from './ActivityContext';
export { useFolders } from './FoldersContext';
export { useNotifications } from './NotificationsContext';
export { usePayment } from './PaymentContext';
export { useSettings } from './SettingsContext';
export { useTeamChat } from './TeamChatContext';
export { useTeamCollaboration } from './TeamCollaborationContext';
export { useTeam } from './TeamContext';
export { useWorkflows } from './WorkflowsContext';
