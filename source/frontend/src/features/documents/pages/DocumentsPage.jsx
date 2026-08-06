import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { DOCUMENT_FEATURE } from "../constants";
import { useDocumentFeature } from "../hooks/useDocumentFeature";
import { DocumentForm } from "../components";

function DocumentsPage() {
  const document = useDocumentFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {DOCUMENT_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {document.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...document.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...document.table} />
        </div>

        {document.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...document.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={document.modal.opened}
        title={document.modal.title}
        onClose={document.actions.cancel}
        loading={document.crud.loading}
        actions={
          document.formView.isWizard || document.modal.isView
            ? []
            : [...document.crudModal.actions]
        }
      >
        <DocumentForm
          modal={document.modal}
          formSchema={document.formView}
          form={document.form}
          onSubmit={document.actions.submit}
          loading={document.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default DocumentsPage;
