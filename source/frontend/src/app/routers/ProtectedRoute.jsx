import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} />;
  }

  return children;
}

export default ProtectedRoute;
