import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";

function InstructorLayout() {
  return (
    
    <div className="d-flex flex-column vh-100">
      <header>
        <Header />
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <aside>
          <Sidebar />
        </aside>

        <main className="flex-grow-1 bg-light p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default InstructorLayout;
