// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Show a loading spinner while checking auth
  if (!user) return <Navigate to="/login" replace />; // Redirect to login if not authenticated

  return <>{children}</>;
};

export default PrivateRoute;
