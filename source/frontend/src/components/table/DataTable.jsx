import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";

const DataTable = ({
  columns = [],
  rows = [],
  rowKey = "id",

  loading = false,

  actions = [],
  showIndex = true,

  emptyMessage,

  scrollX = true,

  striped = true,
  hover = true,

  className = "",
}) => {
  const hasActions = actions.length > 0;

  const columnLength = columns.length + Number(showIndex) + Number(hasActions);

  const tableClass = [
    "table",
    striped && "table-striped",
    hover && "table-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={scrollX ? "table-responsive" : ""}>
      <table className={tableClass}>
        <TableHeader
          columns={columns}
          showIndex={showIndex}
          hasActions={hasActions}
        />

        {loading ? (
          <TableLoading colSpan={columnLength} />
        ) : rows.length === 0 ? (
          <TableEmpty colSpan={columnLength} message={emptyMessage} />
        ) : (
          <TableBody
            rowKey={rowKey}
            columns={columns}
            data={rows}
            showIndex={showIndex}
            actions={actions}
          />
        )}
      </table>
    </div>
  );
};

export default DataTable;
