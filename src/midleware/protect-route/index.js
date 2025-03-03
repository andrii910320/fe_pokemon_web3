import { Navigate, Outlet } from "react-router-dom";

const ReRoute = ({ isAuthenticated, route }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={route} replace />;
};

export default ReRoute;
