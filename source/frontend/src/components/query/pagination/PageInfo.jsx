const PageInfo = ({
  page,
  totalPages,
}) => (
  <span className="mx-3">

    Trang {page} / {totalPages}

  </span>
);

export default PageInfo;