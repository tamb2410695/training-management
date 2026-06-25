import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks";

function RoleRoute({ children, roles }) {
  const { user } = useAuth();

  if (!roles.includes(user.roleName)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} />;
  }

  return children;
}

export default RoleRoute;
