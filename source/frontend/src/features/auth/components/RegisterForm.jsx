import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

function RegisterForm() {
  const { registerUser, loading, error, success } = useRegister();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && <div className="alert alert-success">{success}</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Tên đăng nhập</label>

        <input
          className="form-control"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>

        <input
          className="form-control"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mật khẩu</label>

        <input
          className="form-control"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </button>
    </form>
  );
}

export default RegisterForm;
