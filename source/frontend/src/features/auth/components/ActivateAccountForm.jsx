import { useState } from "react";
import { useActivateAccount } from "../hooks/useActivateAccount";

function ActivateAccountForm() {
  const { activateAccount, loading, error, success } = useActivateAccount();

  const [form, setForm] = useState({
    email: "",
    activationCode: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await activateAccount(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && <div className="alert alert-success">{success}</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email đăng ký</label>

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
        <label className="form-label">Mã kích hoạt</label>

        <input
          className="form-control"
          name="activationCode"
          placeholder="Nhập mã kích hoạt"
          value={form.activationCode}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Đang kích hoạt..." : "Kích hoạt tài khoản"}
      </button>
    </form>
  );
}

export default ActivateAccountForm;
