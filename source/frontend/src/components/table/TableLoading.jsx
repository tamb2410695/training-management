const TableLoading = ({ colSpan }) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="text-center p-4">
          Đang tải dữ liệu...
        </td>
      </tr>
    </tbody>
  );
};

export default TableLoading;
