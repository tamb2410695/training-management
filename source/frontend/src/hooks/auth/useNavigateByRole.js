import { useNavigate } from "react-router-dom";

import { ROLES, ROUTES } from "@/constants";


export const useNavigateByRole = () => {
  const navigate = useNavigate();

  const navigateByRole = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        navigate(ROUTES.ADMIN.DASHBOARD);
        console.log(role)
        break;

      case ROLES.STUDENT:
        navigate(ROUTES.STUDENT.PROFILE);
        console.log(role)
        break;

      case ROLES.INSTRUCTOR:
        navigate(ROUTES.INSTRUCTOR.PROFILE);
        console.log(role)
        break;

      default:
        navigate(ROUTES.HOME);
    }
  };

  return navigateByRole;
};
