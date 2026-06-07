import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(username, password);

      localStorage.setItem("user", JSON.stringify(result));

      console.log(result);
            navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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