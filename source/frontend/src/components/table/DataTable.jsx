import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";

const DataTable = ({
  columns = [],
  rows = [],
  rowKey = "id",
  loading = false,
  showIndex = true,
  emptyMessage,
  scrollX = true,
  striped = true,
  hover = true,
  className = "",
}) => {

  const columnLength = columns.length + Number(showIndex);

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
          />
        )}
      </table>
    </div>
  );
};

export default DataTable;
