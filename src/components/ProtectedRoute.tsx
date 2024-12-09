import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface ProtectedRouteProps {
    children: ReactNode; // Components to render if access is granted
    allowedRoles: string[]; // Array of allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { accessToken, role, authError } = useAuth(); // Extract from context

    // Redirect to login if not authenticated
    if (!accessToken || authError) {
        console.warn("User is not authenticated, redirecting to login");
        return <Navigate to="/auth/login" replace />;
    }

    // Check if the role is authorized
    if (!allowedRoles.includes(role)) {
        console.warn(`Unauthorized access attempt: role=${role}, allowedRoles=${allowedRoles}`);
        return <Navigate to="/unauthorized" replace />;
    }

    // Authorized: Render children
    return <>{children}</>;
};

export default ProtectedRoute;
