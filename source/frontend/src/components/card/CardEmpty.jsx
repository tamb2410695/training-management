const CardEmpty = ({
  message = "Không có dữ liệu",
  icon = null,
  action = null,
}) => {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body text-center py-5">

          {icon && (
            <div className="mb-3">
              {icon}
            </div>
          )}

          <div className="text-muted mb-3">
            {message}
          </div>

          {action && action}
        </div>
      </div>
    </div>
  );
};

export default CardEmpty;