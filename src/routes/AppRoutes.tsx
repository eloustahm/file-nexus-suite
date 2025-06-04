
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRouteWrapper } from './ProtectedRouteWrapper';
import { PublicRouteWrapper } from './PublicRouteWrapper';
import { NotFound } from '@/pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<ProtectedRouteWrapper />} />
      <Route path="/*" element={<PublicRouteWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
