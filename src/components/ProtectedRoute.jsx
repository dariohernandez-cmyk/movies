import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/movies" />;
  }

  return children;
}
