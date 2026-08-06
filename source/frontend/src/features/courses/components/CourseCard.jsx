import BaseCard from "@/components/card/BaseCard";

const CourseCard = ({
  course,
  actions,
}) => {
  return (
    <BaseCard
      title={course.courseName}
      subtitle={course.courseCode}
      badge={
        <span className="badge bg-success">
          {course.courseStatus}
        </span>
      }
      footer={actions}
    >
      <div className="mb-2">
        <strong>Danh mục:</strong>{" "}
        {course.categoryName ?? "-"}
      </div>

      <div className="mb-2">
        <strong>Thời lượng:</strong>{" "}
        {course.durationHours} giờ
      </div>

      {course.description && (
        <p className="text-muted mb-0">
          {course.description}
        </p>
      )}
    </BaseCard>
  );
};

export default CourseCard;