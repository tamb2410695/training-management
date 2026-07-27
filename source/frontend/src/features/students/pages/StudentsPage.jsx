import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { STUDENT_FEATURE } from "../constants";
import { useStudentFeature } from "../hooks/useStudentFeature";
import { StudentForm } from "../components";

function StudentsPage() {
  const student = useStudentFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {STUDENT_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {student.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...student.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...student.table} />
        </div>

        {student.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...student.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={student.modal.opened}
        title={student.modal.title}
        onClose={student.actions.modal.cancel}
        loading={student.crud.loading}
        actions={
          student.formView.isWizard || student.modal.isView
            ? []
            : [...student.crudModal.actions]
        }
      >
        <StudentForm
          modal={student.modal}
          formSchema={student.formView.formSchema}
          viewSchema={student.formView.viewSchema}
          wizardSchema={student.formView.wizardSchema}
          form={student.form}
          onSubmit={student.actions.submit}
          loading={student.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default StudentsPage;
