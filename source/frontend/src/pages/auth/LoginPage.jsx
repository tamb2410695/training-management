import { useState } from "react";
import { ROLES } from "../../constants/";
import { ROUTES } from "../../constants/";
import authService from "../../features/auth/services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ usernameOrEmail, password });
      const {user, accessToken} = response.data;


      console.log({ usernameOrEmail, password })
      login(user, accessToken);

      switch (user?.roleName) {
        case ROLES.ADMIN:
          navigate(ROUTES.ADMIN.DASHBOARD);

          break;

        case ROLES.STUDENT:
          navigate(ROUTES.STUDENT.PROFILE);

          break;

        case ROLES.INSTRUCTOR:
          navigate(ROUTES.INSTRUCTOR.PROFILE);

          break;

        default:
          navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;