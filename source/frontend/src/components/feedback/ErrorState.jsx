function ErrorState({
  title = "Mất kết nối dữ liệu",
  description = "Hệ thống gặp sự cố khi đồng bộ thông tin hoặc máy chủ không phản hồi. Vui lòng kiểm tra lại đường truyền mạng.",
  onRetry,
}) {
  return (
    <div className="text-center py-5 px-4 border border-danger border-opacity-25 rounded bg-danger bg-opacity-10 my-3">
      <div
        className="h3 fw-bold text-danger mb-3"
        style={{ userSelect: "none" }}
      >
        ! ! !
      </div>
      <h5 className="fw-bold text-danger mb-2">{title}</h5>
      <p
        className="text-secondary small mx-auto mb-4"
        style={{ maxWidth: "420px" }}
      >
        {description}
      </p>
      {onRetry && (
        <button
          type="button"
          className="btn btn-danger btn-sm px-4 fw-medium shadow-sm"
          onClick={onRetry}
        >
          Tải lại trang
        </button>
      )}
    </div>
  );
}

export default ErrorState;
