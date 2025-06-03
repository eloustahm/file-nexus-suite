
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

// Layouts
import { AuthenticatedLayout } from '@/pages/layouts/AuthenticatedLayout';
import { GuestLayout } from '@/pages/layouts/GuestLayout';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';

// Main Pages
import { LandingPage } from '@/pages/LandingPage';
import { AboutPage } from '@/pages/AboutPage';
import { BlogPage } from '@/pages/BlogPage';
import { CareersPage } from '@/pages/CareersPage';
import { NotFound } from '@/pages/NotFound';

// Dashboard Components
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

export const AppRoutes = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        
        {/* Auth Routes - only show if not authenticated */}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </>
        )}
        
        {/* Redirect authenticated users from auth pages */}
        {isAuthenticated && (
          <>
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Navigate to="/dashboard" replace />} />
            <Route path="/forgot-password" element={<Navigate to="/dashboard" replace />} />
            <Route path="/reset-password" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Route>

      {/* Protected Routes */}
      {isAuthenticated ? (
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/documents/chat" element={<DocumentChat />} />
          <Route path="/documents/generate" element={<DocumentGenerator />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/activity" element={<ActivityLogs />} />
          <Route path="/ai-modules" element={<AIModules />} />
          <Route path="/team" element={<TeamCollaboration />} />
          <Route path="/workflows" element={<Workflow />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      ) : (
        // Redirect unauthenticated users to login
        <Route path="/*" element={<Navigate to="/login" replace />} />
      )}

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
