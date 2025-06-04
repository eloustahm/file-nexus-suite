
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PublicRoutes } from './PublicRoutes';

export const PublicRouteWrapper = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // If already authenticated, send to /dashboard
    // (we preserve no "from" state here; always go to /dashboard)
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // Otherwise render everything in <PublicRoutes />, e.g. /login, /register, etc.
    return <PublicRoutes isAuthenticated={false} />;
};
