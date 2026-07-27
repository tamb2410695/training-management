import ModalFooter from "./ModalFooter";

function CrudModal({
  title = "Thông tin",
  open = false,
  loading = false,
  onClose,
  children,
  actions = [],
  size = "modal-lg",
}) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={loading ? undefined : onClose}
      />

      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className={`modal-dialog modal-dialog-centered ${size}`}>
          <div className="modal-content shadow-lg position-relative">
            {loading && (
              <div
                className="
                  position-absolute
                  top-0
                  start-0
                  w-100
                  h-100
                  d-flex
                  justify-content-center
                  align-items-center
                "
                style={{
                  background: "rgba(255,255,255,.7)",
                  zIndex: 1060,
                }}
              >
                <div className="text-center">
                  <div className="spinner-border text-primary" />

                  <div className="mt-2">Đang xử lý...</div>
                </div>
              </div>
            )}

            <div className="modal-header">
              <h5 className="modal-title fw-semibold">{title}</h5>

              <button
                type="button"
                className="btn-close"
                disabled={loading}
                onClick={onClose}
              />
            </div>

            <div className="modal-body">{children}</div>


            <ModalFooter
              actions={actions}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CrudModal;
