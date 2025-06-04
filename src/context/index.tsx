
import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { DocumentsProvider } from './DocumentsContext';
import { DocumentChatProvider } from './DocumentChatContext';
import { DocumentGenerationProvider } from './DocumentGenerationContext';
import { ChatProvider } from './ChatContext';
import { ActivityProvider } from './ActivityContext';

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
                {children}
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
