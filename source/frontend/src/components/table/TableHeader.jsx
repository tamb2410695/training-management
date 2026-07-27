const TableHeader = ({ columns = [], hasActions, showIndex = true }) => {
  return (
    <thead className="table-light">
      <tr>
        {showIndex && (
          <th
            className="text-center"
            style={{
              width: 60,
            }}
          >
            STT
          </th>
        )}

        {columns.map((column) => (
          <th
            key={column.key}
            className={column.align ? `text-${column.align}` : ""}
            style={{
              width: column.width,
              whiteSpace: "nowrap",
            }}
          >
            {column.label}
          </th>
        ))}

        {hasActions && (
          <th
            className="text-center"
            style={{
              width: "auto",
              whiteSpace: "nowrap",
            }}
          >
            Thao tác
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
