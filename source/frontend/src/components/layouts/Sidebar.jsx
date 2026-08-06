import { NavLink } from "react-router-dom";
import { ROLES, SIDEBAR_MENU } from "@/constants";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLogout } from "@/hooks/auth/useLogout";

function Sidebar() {
  const { user } = useAuth();

  const userRoleCode = user?.roleCode;
  const userRoleLabel = ROLES[userRoleCode].LABEL || "Không xác định"
  const menus = SIDEBAR_MENU[userRoleCode] || [];
  const handleLogout = useLogout();

  return (
    <aside
      className="d-flex flex-column bg-dark text-white vh-100"
      style={{
        width: "260px",
      }}
    >
      {/* Header */}
      <div className="p-3 border-bottom border-secondary">
        <h5 className="mb-1">Quản lý</h5>

        <small className="text-secondary">
          Vai trò: {userRoleLabel}
        </small>
      </div>

      {/* Menu */}
      <nav className="flex-grow-1 p-3">
        <ul className="nav nav-pills flex-column gap-2">
          {menus.map((menu) => (
            <li className="nav-item" key={menu.path}>
              <NavLink
                to={menu.path}
                end
                className={({ isActive }) =>
                  [
                    "nav-link",
                    "text-white",
                    "d-flex",
                    "align-items-center",
                    "gap-2",
                    isActive ? "active bg-primary" : "",
                  ].join(" ")
                }
              >
                {menu.icon && (
                  <span>
                    {menu.icon}
                  </span>
                )}

                <span style={{ whiteSpace: "pre-line" }}>{menu.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-top border-secondary">
        <div className="mb-2">
          <div className="fw-semibold">
            {user?.name}
          </div>

          <small className="text-secondary">
            {user?.email}
          </small>
        </div>

        <button
          className="btn btn-outline-danger w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;