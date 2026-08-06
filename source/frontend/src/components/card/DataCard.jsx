import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardEmpty from "./CardEmpty";
import CardLoading from "./CardLoading";

const DataCard = ({
  fields = [],
  rows = [],
  rowKey = "id",
  loading = false,
  emptyMessage,
  columns = 3,
  className = "",
}) => {
  return (
    <div className={`row g-3 ${className}`}>
      {loading ? (
        <CardLoading count={columns} />
      ) : rows.length === 0 ? (
        <CardEmpty message={emptyMessage} />
      ) : (
        rows.map((row) => (
          <div
            key={row[rowKey]}
            className={`col-md-${12 / columns}`}
          >
            <div className="card h-100">
              <CardHeader
                data={row}
                fields={fields}
              />

              <CardBody
                data={row}
                fields={fields}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DataCard;