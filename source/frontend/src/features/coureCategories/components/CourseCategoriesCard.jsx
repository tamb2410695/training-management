import BaseCard from "@/components/card/BaseCard";


const CourseCategoryCard = ({
  category,
  actions,
}) => {
  return (
    <BaseCard
      title={category.categoryName}
      subtitle={category.categoryCode}
      footer={actions}
    >
      <p className="text-muted">
        {category.description || "Không có mô tả"}
      </p>

      {category.courseCount !== undefined && (
        <div>
          <strong>Số khóa học:</strong>{" "}
          {category.courseCount}
        </div>
      )}
    </BaseCard>
  );
};

export default CourseCategoryCard;