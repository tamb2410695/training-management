import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { STAFF_PROFILE_FEATURE } from "../constants";
import { useStaffProfileFeature } from "../hooks/useProfilesFeature";
import { StaffProfilesForm } from "../components";

function ProfilesPage() {
  const staffProfile = useStaffProfileFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {STAFF_PROFILE_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {staffProfile.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...staffProfile.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...staffProfile.table} />
        </div>

        {staffProfile.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...staffProfile.table.pagination} />
          </div>
        )}
      </div>

      <CrudModal
        open={staffProfile.modal.opened}
        title={staffProfile.modal.title}
        onClose={staffProfile.actions.modal.cancel}
        loading={staffProfile.crud.loading}
        actions={
          staffProfile.formView.isWizard || staffProfile.modal.isView
            ? []
            : [...staffProfile.crudModal.actions]
        }
      >
        <StaffProfilesForm
          modal={staffProfile.modal}
          formSchema={staffProfile.formView}
          form={staffProfile.form}
          onSubmit={staffProfile.actions.submit}
          loading={staffProfile.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default ProfilesPage;
