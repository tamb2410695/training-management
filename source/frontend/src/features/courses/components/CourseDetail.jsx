const CourseDetail = ({
  course,
  actions,
}) => {
  if (!course) {
    return null;
  }

  return (
    <div className="card">

      <div className="card-header">
        <div className="d-flex justify-content-between align-items-start">

          <div>
            <h4 className="mb-1">
              {course.courseName}
            </h4>

            <div className="text-muted">
              {course.courseCode}
            </div>
          </div>

          <span className="badge bg-success">
            {course.courseStatus}
          </span>

        </div>
      </div>


      <div className="card-body">

        <div className="row g-3">

          <div className="col-md-6">
            <label className="text-muted">
              Danh mục
            </label>

            <div>
              {course.categoryName ?? "-"}
            </div>
          </div>


          <div className="col-md-6">
            <label className="text-muted">
              Mã danh mục
            </label>

            <div>
              {course.categoryCode ?? "-"}
            </div>
          </div>


          <div className="col-md-6">
            <label className="text-muted">
              Thời lượng
            </label>

            <div>
              {course.durationHours}
              {" "}
              giờ
            </div>
          </div>


          <div className="col-md-6">
            <label className="text-muted">
              Ngày tạo
            </label>

            <div>
              {course.createdAt ?? "-"}
            </div>
          </div>


          <div className="col-12">

            <label className="text-muted">
              Mô tả
            </label>

            <div className="mt-1">
              {course.description || "Không có mô tả"}
            </div>

          </div>


        </div>

      </div>


      {actions && (
        <div className="card-footer">
          {actions}
        </div>
      )}

    </div>
  );
};

export default CourseDetail;