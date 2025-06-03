
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthenticatedLayout } from '@/pages/layouts/AuthenticatedLayout';
import { Dashboard } from '@/pages/components/Dashboard';
import { Document } from '@/pages/components/Document/Document';
import { DocumentChat } from '@/pages/components/Document/DocumentChat';
import { DocumentGenerator } from '@/pages/components/Document/DocumentGenerator';
import { Folders } from '@/pages/components/Folders';
import { Shared } from '@/pages/components/Shared';
import { ActivityLogs } from '@/pages/components/ActivityLogs';
import { AIModules } from '@/pages/components/AIModules';
import { TeamCollaboration } from '@/pages/components/TeamCollaboration';
import { Workflow } from '@/pages/components/Workflow';
import { Settings } from '@/pages/components/Settings';
import { UserProfile } from '@/pages/components/UserProfile';

export const ProtectedRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/documents" element={<Document />} />
        <Route path="/documents/chat" element={<DocumentChat />} />
        <Route path="/documents/generate" element={<DocumentGenerator />} />
        <Route path="/chat" element={<DocumentChat />} />
        <Route path="/generate" element={<DocumentGenerator />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/activity" element={<ActivityLogs />} />
        <Route path="/ai-modules" element={<AIModules />} />
        <Route path="/team" element={<TeamCollaboration />} />
        <Route path="/workflows" element={<Workflow />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </AuthenticatedLayout>
  );
};
