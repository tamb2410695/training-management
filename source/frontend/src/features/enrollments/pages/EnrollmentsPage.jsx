import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { ENROLLMENT_FEATURE } from "../constants";
import { useEnrollmentFeature } from "../hooks/useEnrollmentFeature";
import { EnrollmentForm } from "../components";

function EnrollmentsPage() {
  const enrollment = useEnrollmentFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {ENROLLMENT_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {enrollment.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...enrollment.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...enrollment.table} />
        </div>

        {enrollment.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...enrollment.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={enrollment.modal.opened}
        title={enrollment.modal.title}
        onClose={enrollment.actions.cancel}
        loading={enrollment.crud.loading}
        actions={
          enrollment.formView.isWizard || enrollment.modal.isView
            ? []
            : [...enrollment.crudModal.actions]
        }
      >
        <EnrollmentForm
          modal={enrollment.modal}
          formSchema={enrollment.formView}
          form={enrollment.form}
          onSubmit={enrollment.actions.submit}
          loading={enrollment.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default EnrollmentsPage;
