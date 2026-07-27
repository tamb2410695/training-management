import TableRow from "./TableRow";

const TableBody = ({
  columns,
  data,
  actions,
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
          actions={actions}
          showIndex={showIndex}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
