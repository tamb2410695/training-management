import { useEffect, useState } from "react";
import {
  ACCOUNT_ROLE_OPTIONS,
  ACCOUNT_STATUS_OPTIONS,
} from "../constants/accountEnums";

function AccountFormModal({ open, account, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleCodes: ["STUDENT"],
    accountStatus: "ACTIVE",
  });

  useEffect(() => {
    if (open) {
      if (account) {
        let initialRoles = ["STUDENT"];
        if (
          account.roleCodes &&
          Array.isArray(account.roleCodes) &&
          account.roleCodes.length > 0
        ) {
          initialRoles = account.roleCodes;
        } else if (account.roleCode) {
          initialRoles = [account.roleCode];
        }

        setFormData({
          username: account.username || "",
          email: account.email || "",
          password: "",
          roleCodes: initialRoles,
          accountStatus: account.accountStatus || "ACTIVE",
        });
      } else {
        setFormData({
          username: "",
          email: "",
          password: "",
          roleCodes: ["STUDENT"],
          accountStatus: "ACTIVE",
        });
      }
    }
  }, [account, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roleCodes") {
      setFormData((prev) => ({
        ...prev,
        roleCodes: [value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start pt-5"
      style={{ zIndex: 1050 }}
    >
      <div className="card p-4 mx-auto w-50 shadow-lg border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-primary fw-bold">
            {account ? "Cập Nhật Tài Khoản" : "Tạo Tài Khoản Mới"}
          </h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tên đăng nhập */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Tên đăng nhập
            </label>
            <input
              className="form-control"
              name="username"
              placeholder="Nhập tên đăng nhập..."
              value={formData.username}
              onChange={handleChange}
              required
              disabled={!!account} // Khóa không cho sửa username theo chuẩn hệ thống
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Địa chỉ Email
            </label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Mật khẩu{" "}
              {account && (
                <span className="text-muted fw-normal">
                  (Bỏ trống nếu không đổi)
                </span>
              )}
            </label>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder={account ? "••••••••" : "Nhập mật khẩu..."}
              value={formData.password}
              onChange={handleChange}
              required={!account}
            />
          </div>

          {/* Vai trò */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Vai trò quản trị
            </label>
            <select
              className="form-select"
              name="roleCodes"
              value={formData.roleCodes?.[0] || "STUDENT"}
              onChange={handleChange}
            >
              {ACCOUNT_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Trạng thái tài khoản (Chỉ hiện khi EDIT) */}
          {account && (
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary">
                Trạng thái tài khoản
              </label>
              <select
                className="form-select"
                name="accountStatus"
                value={formData.accountStatus}
                onChange={handleChange}
              >
                {ACCOUNT_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn btn-primary px-4">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountFormModal;
