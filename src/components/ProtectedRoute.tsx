// ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
