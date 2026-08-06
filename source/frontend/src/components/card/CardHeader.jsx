const CardHeader = ({
  data,
  fields,
}) => {
  const titleField = fields.find(
    (field) => field.type === "title",
  );

  const badgeField = fields.find(
    (field) => field.type === "badge",
  );

  return (
    <div className="card-header d-flex justify-content-between">
      <h5 className="mb-0">
        {data[titleField?.key]}
      </h5>

      {badgeField && (
        <span className="badge bg-success">
          {data[badgeField.key]}
        </span>
      )}
    </div>
  );
};

export default CardHeader;