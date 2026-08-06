import ActivateAccountForm from "@/features/auth/components/ActivateAccountForm";

function ActivateAccount() {
  return (
    <div
      className="
        min-vh-100
        d-flex
        justify-content-center
        align-items-center
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
            <h3>Kích hoạt tài khoản</h3>

            <p className="text-muted">Nhập mã kích hoạt được gửi tới email</p>
          </div>

          <ActivateAccountForm />
        </div>
      </div>
    </div>
  );
}

export default ActivateAccount;
