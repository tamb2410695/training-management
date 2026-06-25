import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";

function AdminLayout() {
  return (
    <>
      <Header />

      <Sidebar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
