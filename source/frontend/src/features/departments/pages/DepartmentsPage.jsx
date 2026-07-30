import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { DEPARTMENT_FEATURE } from "../constants";
import { useDepartmentsFeature } from "../hooks/useDepartmentsFeature";
import { DepartmentForm } from "../components";

function DepartmentsPage() {
  const department = useDepartmentsFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {DEPARTMENT_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {department.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...department.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...department.table} />
        </div>

        {department.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...department.table.pagination} />
          </div>
        )}
      </div>

      <CrudModal
        open={department.modal.opened}
        title={department.modal.title}
        onClose={department.actions.modal.cancel}
        loading={department.crud.loading}
        actions={
          department.formView.isWizard || department.modal.isView
            ? []
            : [...department.crudModal.actions]
        }
      >
        <DepartmentForm
          modal={department.modal}
          formSchema={department.formView}
          form={department.form}
          onSubmit={department.actions.submit}
          loading={department.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default DepartmentsPage;
