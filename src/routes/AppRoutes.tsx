import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRouteWrapper } from '@/routes/ProtectedRouteWrapper';
import { PublicRouteWrapper } from '@/routes/PublicRouteWrapper';
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
