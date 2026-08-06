const CardBody = ({
  data,
  fields,
}) => {
  return (
    <div className="card-body">
      {fields
        .filter(
          (field) =>
            !["title", "badge"].includes(field.type),
        )
        .map((field) => (
          <div
            key={field.key}
            className="mb-2"
          >
            <div className="text-muted small">
              {field.label}
            </div>

            <div>
              {field.formatter
                ? field.formatter(data[field.key])
                : data[field.key] ?? "-"
              }
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardBody;