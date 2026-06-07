import { useState } from "react";
import { register } from "../authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form);

      const response = await register(form);

      console.log(response.data);

      setMessage("Đăng ký thành công");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);

      setMessage("Đăng ký thất bại");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>

{message && (
    <div className="alert alert-success">
        {message}
    </div>
)}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
