import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRouteCandidato = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if ( isAuthenticated && user.tipo !== "candidato" ) return <Navigate to="/inicioRRHH" replace />;
  
  return <Outlet />;
};