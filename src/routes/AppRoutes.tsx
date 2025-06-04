
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRouteWrapper } from './ProtectedRouteWrapper';
import { PublicRouteWrapper } from './PublicRouteWrapper';
import { NotFound } from '@/pages/NotFound';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading application…" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard/*" element={<ProtectedRouteWrapper />} />
      <Route path="/*" element={<PublicRouteWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
