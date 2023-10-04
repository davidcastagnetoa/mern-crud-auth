import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  console.log("In ProtectedRoute.jsx isAuthenticated is :" + isAuthenticated);
  console.log("In ProtectedRoute.jsx loading is :" + loading);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
