import { useEffect } from "react";
import { useAuth, useNavigateByRole } from "../../hooks";

function AnonymousRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const navigateByRole = useNavigateByRole();
  useEffect(() => {
    const userRoleCode = user?.roleCodes?.[0]; 
    if (isAuthenticated && userRoleCode) {
      navigateByRole(userRoleCode);
    }
  }, [isAuthenticated, user, navigateByRole]);
  if (isAuthenticated) {
    return null;
  }
  return children;
}

export default AnonymousRoute;