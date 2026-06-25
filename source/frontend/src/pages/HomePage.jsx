import { useAuth } from "../hooks/useAuth";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container text-center mt-5">
      <p>Trang chủ</p>
      { user ? (
        <p>Tài khoản {user.username}</p>
      ) : (
        <p>Vui lòng đăng nhập</p>
      )}
    </div>
  );
}

export default HomePage;