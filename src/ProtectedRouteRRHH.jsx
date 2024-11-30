import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRouteRRHH = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if ( isAuthenticated && user.tipo !== "rrhh") return <Navigate to="/inicioPostulante" replace />;
  
  return <Outlet />;
};