import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { ACCOUNT_FEATURE } from "../constants";
import { useAccountFeature } from "../hooks/useAccountFeature";
import { AccountForm } from "../components";

function AccountsPage() {
  const account = useAccountFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {ACCOUNT_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {account.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...account.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...account.table} />
        </div>

        {account.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...account.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={account.modal.opened}
        title={account.modal.title}
        onClose={account.actions.modal.cancel}
        loading={account.crud.loading}
        actions={
          account.formView.isWizard || account.modal.isView
            ? []
            : [...account.crudModal.actions]
        }
      >
        <AccountForm
          modal={account.modal}
          formSchema={account.formView}
          form={account.form}
          onSubmit={account.actions.submit}
          loading={account.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default AccountsPage;
