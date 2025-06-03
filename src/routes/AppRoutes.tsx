
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { NotFound } from '@/pages/NotFound';

export const AppRoutes = () => {
  const { user, isAuthenticated, loading, getCurrentUser } = useAuthStore();

  // Try to get current user on app load
  useEffect(() => {
    if (!user && !loading) {
      getCurrentUser();
    }
  }, [user, loading, getCurrentUser]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/*" element={<PublicRoutes isAuthenticated={isAuthenticated} />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard/*" element={
        isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" replace />
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
