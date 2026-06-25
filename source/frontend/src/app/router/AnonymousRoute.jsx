import { useEffect } from "react";
import { useAuth, useNavigateByRole } from "../../hooks";

function AnonymousRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const navigateByRole = useNavigateByRole();
  useEffect(() => {
    if (isAuthenticated && user?.roleName) {
      navigateByRole(user.roleName);
    }
  }, [isAuthenticated, user, navigateByRole]);
  if (isAuthenticated) {
    return null;
  }
  return children;
}

export default AnonymousRoute;