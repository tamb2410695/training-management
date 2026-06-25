import { useEffect, useState } from "react";

function AccountFormModal({ open, account, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleName: "STUDENT",
  });

  useEffect(() => {
    if (account) {
      setFormData({
        username: account.username,
        email: account.email,
        password: "",
        roleName: account.roleName,
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        roleName: "STUDENT",
      });
    }
  }, [account]);

  if (!open) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div
      className="
        position-fixed
        top-0
        start-0
        w-100
        h-100
        bg-dark
        bg-opacity-50
      "
    >
      <div
        className="
          card
          p-4
          mx-auto
          mt-5
          w-50
        "
      >
        <h4>{account ? "Edit Account" : "Create Account"}</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="
              form-control
              mb-3
            "
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            className="
              form-control
              mb-3
            "
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="
              form-control
              mb-3
            "
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            className="
              form-select
              mb-3
            "
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
          >
            <option value="ADMIN">ADMIN</option>

            <option value="STUDENT">STUDENT</option>

            <option value="INSTRUCTOR">INSTRUCTOR</option>
          </select>

          <button
            className="
              btn
              btn-primary
              me-2
            "
          >
            Save
          </button>

          <button
            type="button"
            className="
              btn
              btn-secondary
            "
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountFormModal;
