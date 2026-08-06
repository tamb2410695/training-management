const CardLoading = ({
  count = 3,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="col-md-4"
        >
          <div className="card h-100">
            <div className="card-header">
              <div className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </div>
            </div>

            <div className="card-body">
              <div className="placeholder-glow mb-2">
                <span className="placeholder col-4"></span>
              </div>

              <div className="placeholder-glow mb-2">
                <span className="placeholder col-8"></span>
              </div>

              <div className="placeholder-glow mb-2">
                <span className="placeholder col-7"></span>
              </div>

              <div className="placeholder-glow">
                <span className="placeholder col-5"></span>
              </div>
            </div>

            <div className="card-footer">
              <div className="placeholder-glow">
                <span className="placeholder col-4"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardLoading;