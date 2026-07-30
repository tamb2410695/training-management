import CrudToolbar from "@/components/toolbar/CrudToolbar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { COURSE_FEATURE } from "../constants";
import { useCoursesFeature } from "../hooks/useCoursesFeature";
import { CourseForm } from "../components";

function CoursesPage() {
  const course = useCoursesFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {COURSE_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {course.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...course.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...course.table} />
        </div>

        {course.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...course.table.pagination} />
          </div>
        )}
      </div>

      <CrudModal
        open={course.modal.opened}
        title={course.modal.title}
        onClose={course.actions.modal.cancel}
        loading={course.crud.loading}
        actions={
          course.formView.isWizard || course.modal.isView
            ? []
            : [...course.crudModal.actions]
        }
      >
        <CourseForm
          modal={course.modal}
          formSchema={course.formView}
          form={course.form}
          onSubmit={course.actions.submit}
          loading={course.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default CoursesPage;
