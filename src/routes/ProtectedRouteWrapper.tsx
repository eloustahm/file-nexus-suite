
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoutes } from './ProtectedRoutes';

export const ProtectedRouteWrapper = () => {
    const { isAuthenticated } = useAuth();

    // If not logged in, send to /login (or "/" which PublicRoutes will interpret as login)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise render all /dashboard/* routes
    return <ProtectedRoutes />;
};
