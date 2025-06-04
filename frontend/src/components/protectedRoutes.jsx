import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isPremium = localStorage.getItem("isPremium") === "true";

  return isPremium ? <Outlet /> : <Navigate to="/upgrade" />;
};

export default ProtectedRoute;
