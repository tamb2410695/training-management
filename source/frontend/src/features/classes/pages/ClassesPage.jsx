import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { CLASS_FEATURE } from "../constants";
import { useClasseFeature } from "../hooks/useClasseFeature";
import { ClasseForm } from "../components";

function ClassesPage() {
  const classe = useClasseFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {CLASS_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {classe.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...classe.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...classe.table} />
        </div>

        {classe.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...classe.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={classe.modal.opened}
        title={classe.modal.title}
        onClose={classe.actions.cancel}
        loading={classe.crud.loading}
        actions={
          classe.formView.isWizard || classe.modal.isView
            ? []
            : [...classe.crudModal.actions]
        }
      >
        <ClasseForm
          modal={classe.modal}
          formSchema={classe.formView}
          form={classe.form}
          onSubmit={classe.actions.submit}
          loading={classe.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default ClassesPage;
