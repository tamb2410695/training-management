import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";


function PublicLayout() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Outlet/>
      </main>
    </>
  );
}

export default PublicLayout;
