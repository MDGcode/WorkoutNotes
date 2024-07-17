// ProtectedRoute.tsx
import React from "react";
import useAuthStore from "../store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen font-bold md:text-2xl">
        Please log in to use the app.
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
