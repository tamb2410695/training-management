import { Link, useLocation } from "react-router-dom";

import { STATUS_CONFIG } from "./statusConfig";

function StatusPage({ statusCode = 500 }) {
  const location = useLocation();

  const config = STATUS_CONFIG[statusCode] || STATUS_CONFIG[500];

  return (
    <div
      className="
        min-vh-100
        d-flex
        justify-content-center
        align-items-center
        bg-light
      "
    >
      <div
        className="
          card
          shadow-sm
          border-0
        "
        style={{
          maxWidth: 520,
          width: "100%",
        }}
      >
        <div className="card-body text-center p-5">
          <div
            className={`
              rounded-circle
              bg-${config.color}
              bg-opacity-10
              text-${config.color}
              d-inline-flex
              align-items-center
              justify-content-center
              mb-4
            `}
            style={{
              width: 100,
              height: 100,
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            {statusCode}
          </div>

          <h2 className="mb-3">{config.title}</h2>

          <p className="text-muted mb-4">{config.message}</p>

          {location.pathname && (
            <p className="small text-muted">
              Đường dẫn: <strong>{location.pathname}</strong>
            </p>
          )}

          <div className="d-flex justify-content-center">
            <Link className={`btn btn-${config.color}`} to={config.buttonPath}>
              {config.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;
