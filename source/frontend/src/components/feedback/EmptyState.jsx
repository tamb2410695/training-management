function EmptyState({
  title = "Không có dữ liệu",
  description = "Hiện tại hệ thống chưa ghi nhận bất kỳ bản ghi nào trong mục này.",
  action,
}) {
  return (
    <div className="text-center py-5 px-4 border border-dashed rounded bg-light my-3">
      <div
        className="display-6 text-muted opacity-50 mb-3"
        style={{ userSelect: "none" }}
      >
        [ ∅ ]
      </div>
      <h5 className="fw-bold text-dark mb-2">{title}</h5>
      <p
        className="text-muted small mx-auto mb-3"
        style={{ maxWidth: "380px" }}
      >
        {description}
      </p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export default EmptyState;
