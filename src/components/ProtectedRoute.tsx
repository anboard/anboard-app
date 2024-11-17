// ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accessToken, authError } = useAuth();

    if (!accessToken || authError) {
        return <Navigate to="/auth/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
