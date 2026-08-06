import CrudToolbar from "@/components/toolbar/CrudToolbar";
import Pagination from "@/components/query/pagination/Pagination";
import CrudModal from "@/components/modal/CrudModal";
import { COURECATEGORIE_FEATURE } from "../constants";
import { useCoureCategorieFeature } from "../hooks/useCoureCategorieFeature";
import { CoureCategorieForm } from "../components";
import DataCard from "@/components/card/DataCard";
import DataTable from "@/components/table/DataTable";

function CoureCategoriesPage() {
  const courseCategories = useCoureCategorieFeature();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">
          {COURECATEGORIE_FEATURE.config.entityLabel}
        </h2>
        <span className="badge bg-secondary">
          Tổng số: {courseCategories.crud.pagination.totalRecords} mục
        </span>
      </div>

      <CrudToolbar {...courseCategories.toolbar} />
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <DataTable {...courseCategories.table} />
          {/* <DataCard {...courseCategories.table} /> */}
        </div>

        {courseCategories.table.pagination && (
          <div className="px-3 py-2 border-top bg-light">
            <Pagination {...courseCategories.table.pagination} />
          </div>
        )}
      </div>
      
      <CrudModal
        open={courseCategories.modal.opened}
        title={courseCategories.modal.title}
        onClose={courseCategories.actions.cancel}
        loading={courseCategories.crud.loading}
        actions={
          courseCategories.formView.isWizard || courseCategories.modal.isView
            ? []
            : [...courseCategories.crudModal.actions]
        }
      >
        <CoureCategorieForm
          modal={courseCategories.modal}
          formSchema={courseCategories.formView}
          form={courseCategories.form}
          onSubmit={courseCategories.actions.submit}
          loading={courseCategories.crud.loading}
        />
      </CrudModal>
    </div>
  );
}
export default CoureCategoriesPage;
