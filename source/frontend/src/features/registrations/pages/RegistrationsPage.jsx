import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { REGISTRATION_FEATURE } from "../constants";
import { useRegistrationFeature } from "../hooks/useRegistrationFeature";
import { RegistrationForm } from "../components";

function RegistrationsPage() {
  const registration = useRegistrationFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {REGISTRATION_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {registration.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...registration.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...registration.table} />
        </div>

        {registration.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...registration.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={registration.modal.opened}
        title={registration.modal.title}
        onClose={registration.actions.cancel}
        loading={registration.crud.loading}
        actions={
          registration.formView.isWizard || registration.modal.isView
            ? []
            : [...registration.crudModal.actions]
        }
      >
        <RegistrationForm
          modal={registration.modal}
          formSchema={registration.formView}
          form={registration.form}
          onSubmit={registration.actions.submit}
          loading={registration.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default RegistrationsPage;
