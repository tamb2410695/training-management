import { Link } from "react-router-dom";
import { ROUTES } from "../constants/";

function UnauthorizedPage() {

  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="p-5 bg-light rounded-3 shadow-sm border border-danger">
            <h1 className="display-1 text-danger font-weight-bold">403</h1>
            <h2 className="mb-3">Truy Cập Bị Từ Chối!</h2>
            <p className="text-muted mb-4">
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link 
                className="btn btn-danger" 
                to={ROUTES.HOME}
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;