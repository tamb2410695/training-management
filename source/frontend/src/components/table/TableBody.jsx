import TableRow from "./TableRow";

const TableBody = ({
  columns,
  data,
  rowKey,
  showIndex = true
}) => {
  return (
    <tbody>
      {data.map((row) => (
        <TableRow
          key={row[rowKey]}
          rowKey={rowKey}
          row={row}
          columns={columns}
          showIndex={showIndex}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
