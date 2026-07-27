const TableCell = ({ column, row }) => {
  const value = row[column.key];

  const cellClass = [column.className, column.nowrap && "text-nowrap"]
    .filter(Boolean)
    .join(" ");

  const cellStyle = {
    width: column.width ? `${column.width}px` : undefined,
    textAlign: column.align ?? "left",
  };

  const renderValue = () => {
    if ((column.type === "badge" || column.type === "select") && column.enum) {
      const enumConfig = column.enum.map[value] ?? null;

      if (enumConfig) {
        return (
          <span className={`badge bg-${enumConfig.color ?? "secondary"}`}>
            {enumConfig.label}
          </span>
        );
      }
    }

    if (column.type === "date" && value) {
      return new Date(value).toLocaleDateString("vi-VN");
    }

    if (typeof column.render === "function") {
      return column.render(value, row);
    }

    return value ?? "-";
  };

  return (
    <td className={cellClass} style={cellStyle}>
      {renderValue()}
    </td>
  );
};

export default TableCell;
