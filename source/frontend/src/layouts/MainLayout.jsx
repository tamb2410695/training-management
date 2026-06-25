import Header from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container mt-4">{children}</div>
    </>
  );
}

export default MainLayout;
