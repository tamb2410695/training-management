import TableCell from "./TableCell";

const TableRow = ({
  row,
  columns = [],
  rowKey = "id",
  actions = [],
  showIndex = false,
}) => {
  return (
    <tr>
      {showIndex && (
        <td className="text-center">{row.__index ?? row[rowKey]}</td>
      )}

      {columns.map((column) => (
        <TableCell key={column.key} column={column} row={row} />
      ))}

      {actions.length > 0 && (
        <td className="text-center">
          <div className="btn-group btn-group-sm">
            {actions.map((action) => (
              <button
                key={action.key}
                type="button"
                className={`btn btn-${action.variant ?? "secondary"} d-flex text-center`}
                disabled={
                  typeof action.disabled === "function"
                    ? action.disabled(row)
                    : action.disabled
                }
                onClick={() => action.onClick(row)}
              >
                {action.icon && <i className={`bi-${action.icon} me-1`} />}
                {action.label}
              </button>
            ))}
          </div>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
