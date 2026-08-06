import LoginForm from "@/features/auth/components/LoginForm";

function Login() {
  return (
    <div
      className="
        min-vh-100
        d-flex
        align-items-center
        justify-content-center
        bg-light
      "
    >
      <div
        className="card shadow-sm"
        style={{
          width: 420,
        }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h3>Training Management</h3>

            <p className="text-muted">Đăng nhập hệ thống</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
