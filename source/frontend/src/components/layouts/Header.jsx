import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";
// import { useNavigateByRole } from "../../hooks/useNavigateByRole";

function Header() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const handleLogout = useLogout();

  // const navigateByRole = useNavigateByRole();
  // const handleNavigateByRole = () => {
  //   if (user?.roleName) navigateByRole(user.roleName);
  // };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={ROUTES.HOME}>
            Training Management
          </Link>

          {user ? (
            <div>
              <div className="d-flex align-items-center gap-3 text-white">
                <Link
                  className="btn btn-primary btn-sm"
                  to={ROUTES[user.roleName]?.DASHBOARD || ROUTES.HOME}
                >
                  Dashboard
                </Link>
                <p className="mb-0">Xin chào, {user.username}!</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              >
                Đăng nhập
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(ROUTES.AUTH.REGISTER)}
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
