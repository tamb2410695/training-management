import { buildFields, defineFields, Rules } from "@/utils";

const Field = buildFields();

export const COURSE_FIELDS = defineFields({
  departmentId: Field.text("departmentId", "Mã định danh")
    .disableApi()
    .disableOnCreate()
    .disableOnUpdate()
    .hideOnForm()
    .sortable(),

  departmentCode: Field.text("departmentCode", "Mã phòng ban")
    .required()
    .placeholder("Nhập mã phòng ban")
    .searchable()
    .sortable()
    .tableWidth(180)
    .col(6)
    .validation(
      Rules.minLength(2),
      Rules.maxLength(50),
    ),

  departmentName: Field.text("departmentName", "Tên phòng ban")
    .required()
    .placeholder("Nhập tên phòng ban")
    .searchable()
    .sortable()
    .tableWidth(250)
    .col(6)
    .validation(
      Rules.minLength(2),
      Rules.maxLength(255),
    ),
});