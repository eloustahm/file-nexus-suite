
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { NotFound } from '@/pages/NotFound';

export const AppRoutes = () => {
  const { user, isAuthenticated, loading, getCurrentUser } = useAuthStore();

  // Only try to get current user once on app load if no user exists
  useEffect(() => {
    const hasTriedAuth = sessionStorage.getItem('auth_attempted');
    if (!user && !loading && !hasTriedAuth) {
      sessionStorage.setItem('auth_attempted', 'true');
      getCurrentUser().catch(() => {
        // Silently handle auth failure
        console.log('User not authenticated');
      });
    }
  }, []);

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
