import PageButton from "./PageButton";
import PageInfo from "./PageInfo";

const Pagination = ({ page, totalPages, hasNext, hasPrev, nextPage, prevPage }) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3">
      <PageButton disabled={!hasPrev} onClick={prevPage}>
        Trước
      </PageButton>

      <PageInfo page={page} totalPages={totalPages} />

      <PageButton disabled={!hasNext} onClick={nextPage}>
        Sau
      </PageButton>
    </div>
  );
};

export default Pagination;
