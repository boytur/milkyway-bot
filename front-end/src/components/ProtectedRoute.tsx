import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/authContext";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { authState } = useAuthContext();
  const location = useLocation();

  if (!authState.isLoggedin && !authState.isFetching) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
