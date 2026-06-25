import { Link } from "react-router-dom";
import { SIDEBAR_MENU } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";

function Sidebar() {
  const { user } = useAuth();

  const menus = SIDEBAR_MENU[user.roleName] || [];
  const handleLogout = useLogout();

  return (
    <div>
      <h3>{user.roleName}</h3>

      {menus.map((menu) => (
        <div key={menu.path}>
          <Link to={menu.path}>{menu.label}</Link>
        </div>
      ))}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
