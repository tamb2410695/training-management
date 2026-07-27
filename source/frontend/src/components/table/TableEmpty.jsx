const TableEmpty = ({
  colSpan,
  message = "Không có dữ liệu.",
}) => {
  return (
    <tbody>
      <tr>
        <td
          colSpan={colSpan}
          className="text-center p-4"
        >
          {message}
        </td>
      </tr>
    </tbody>
  );
};

export default TableEmpty;