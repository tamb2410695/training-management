import { buildFields, Rules, defineFields } from "@/utils";

const Field = buildFields();

export const COURSE_CATEGORY_FIELDS = defineFields({
  categoryCode: Field.text(
    "categoryCode",
    "Mã danh mục"
  )
    .placeholder("CAT001")
    .searchable()
    .sortable()
    .tableWidth(160)
    .col(6)
    .validation(
      Rules.maxLength(30),
    ),

  categoryName: Field.text(
    "categoryName",
    "Tên danh mục"
  )
    .requiredOnCreate()
    .searchable()
    .sortable()
    .tableWidth(240)
    .col(6)
    .validation(
      Rules.maxLength(100),
    ),

  description: Field.textarea(
    "description",
    "Mô tả"
  )
    .searchable()
    .col(12)
    .validation(
      Rules.maxLength(255),
    ),

});