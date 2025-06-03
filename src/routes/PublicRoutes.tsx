
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GuestLayout } from '@/pages/layouts/GuestLayout';
import { LandingPage } from '@/pages/LandingPage';
import { AboutPage } from '@/pages/AboutPage';
import { BlogPage } from '@/pages/BlogPage';
import { CareersPage } from '@/pages/CareersPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';

interface PublicRoutesProps {
  isAuthenticated: boolean;
}

export const PublicRoutes = ({ isAuthenticated }: PublicRoutesProps) => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        
        {/* Auth Routes - redirect if authenticated */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
        } />
        <Route path="/forgot-password" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />
        } />
        <Route path="/reset-password" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ResetPasswordPage />
        } />
      </Route>
    </Routes>
  );
};
