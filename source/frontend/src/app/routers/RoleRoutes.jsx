import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";

function RoleRoute({ children, roles }) {
  const { user } = useAuth();

  const userRoleCode = user?.roleCode; 
  if (!roles.includes(userRoleCode)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} />;
  }

  return children;
}

export default RoleRoute;
