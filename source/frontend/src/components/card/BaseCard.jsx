const BaseCard = ({
  title,
  subtitle,
  badge,
  children,
  footer,
  className = "",
}) => {
  return (
    <div className={`card h-100 ${className}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-1">
              {title}
            </h5>

            {subtitle && (
              <div className="text-muted small">
                {subtitle}
              </div>
            )}
          </div>

          {badge}
        </div>

        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default BaseCard;