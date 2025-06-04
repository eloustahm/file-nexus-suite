
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthenticatedLayout } from '@/pages/layouts/AuthenticatedLayout';
import { Dashboard } from '@/pages/components/Dashboard';
import { Document } from '@/pages/components/Document/Document';
import { ModernDocumentChat } from '@/pages/components/Document/ModernDocumentChat';
import { ModernGenerateDocument } from '@/pages/components/Document/ModernGenerateDocument';
import { ChatHistoryWrapper } from '@/pages/components/ChatHistoryWrapper';
import { DocumentGenerationHistory } from '@/pages/components/DocumentGenerationHistory';
import { SharedDocuments } from '@/pages/components/SharedDocuments';
import { Folders } from '@/pages/components/Folders';
import { Shared } from '@/pages/components/Shared';
import { ActivityLogs } from '@/pages/components/ActivityLogs';
import { AIModules } from '@/pages/components/AIModules';
import { TeamCollaboration } from '@/pages/components/TeamCollaboration';
import { Workflow } from '@/pages/components/Workflow';
import { Settings } from '@/pages/components/Settings';
import { UserProfile } from '@/pages/components/UserProfile';
import { Integrations } from '@/pages/components/Integrations';
import { PricingPlans } from '@/pages/components/PricingPlans';
import { DocumentSharing } from '@/pages/components/DocumentSharing';
import { ChatListPage } from '@/pages/components/ChatListPage';
import { NewChatPage } from '@/pages/components/NewChatPage';
import { ChatWithDocumentAgent } from '@/pages/components/ChatWithDocumentAgent';

export const ProtectedRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/documents" element={<Document />} />
        
        {/* Consolidated Chat Routes */}
        <Route path="/chat" element={<ModernDocumentChat />} />
        <Route path="/chat/new" element={<NewChatPage />} />
        <Route path="/chat/history" element={<ChatHistoryWrapper />} />
        <Route path="/chat/list" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatWithDocumentAgent />} />
        <Route path="/chat/document/:documentId" element={<ChatWithDocumentAgent />} />
        
        {/* Document Routes */}
        <Route path="/documents/chat" element={<ModernDocumentChat />} />
        <Route path="/documents/generate" element={<ModernGenerateDocument />} />
        <Route path="/generate" element={<ModernGenerateDocument />} />
        <Route path="/generation-history" element={<DocumentGenerationHistory />} />
        
        {/* Organization Routes */}
        <Route path="/folders" element={<Folders />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/shared-documents" element={<SharedDocuments />} />
        <Route path="/sharing" element={<DocumentSharing />} />
        
        {/* Activity & Insights */}
        <Route path="/activity" element={<ActivityLogs />} />
        <Route path="/ai-modules" element={<AIModules />} />
        
        {/* Team & Collaboration */}
        <Route path="/team" element={<TeamCollaboration />} />
        <Route path="/workflows" element={<Workflow />} />
        <Route path="/workflow" element={<Workflow />} />
        
        {/* Settings & Profile */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/pricing" element={<PricingPlans />} />
      </Routes>
    </AuthenticatedLayout>
  );
};
