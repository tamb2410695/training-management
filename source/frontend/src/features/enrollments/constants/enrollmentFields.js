import { buildFields, defineFields } from "@/utils";
import { ENROLLMENT_STATUS } from "./enrollmentEnums";

const Field = buildFields();

export const ENROLLMENT_FIELDS = defineFields({
  studentId: Field.select(
    "studentId",
    "Học viên",
    [],
  )
    .requiredOnCreate()
    .filter("text")
    .sortable()
    .tableWidth(160)
    .col(6),

  studentCode: Field.text(
    "studentCode",
    "Mã học viên",
  )
    .searchable()
    .sortable()
    .tableWidth(150)
    .disableApi()
    .col(6),

  studentName: Field.text(
    "studentName",
    "Tên học viên",
  )
    .searchable()
    .sortable()
    .tableWidth(220)
    .disableApi()
    .col(6),

  classId: Field.select(
    "classId",
    "Lớp học",
    [],
  )
    .requiredOnCreate()
    .filter("text")
    .sortable()
    .tableWidth(160)
    .col(6),

  classCode: Field.text(
    "classCode",
    "Mã lớp",
  )
    .searchable()
    .sortable()
    .tableWidth(150)
    .disableApi()
    .col(6),

  className: Field.text(
    "className",
    "Tên lớp",
  )
    .searchable()
    .sortable()
    .tableWidth(220)
    .disableApi()
    .col(6),

  enrollmentDate: Field.date(
    "enrollmentDate",
    "Ngày đăng ký",
  )
    .sortable()
    .tableWidth(160)
    .disableApi()
    .col(6),

  enrollmentStatus: Field.badge(
    "enrollmentStatus",
    "Trạng thái đăng ký",
    ENROLLMENT_STATUS,
  )
    .filter("text")
    .defaultValue(ENROLLMENT_STATUS.values[0])
    .sortable()
    .tableWidth(150)
    .requiredOnUpdate()
    .disabled({
      create: true,
      update: false,
    })
    .col(6),

  createdAt: Field.date(
    "createdAt",
    "Ngày tạo",
  )
    .sortable()
    .hideOnForm()
    .tableWidth(160)
    .disableApi()
    .col(6),

  updatedAt: Field.date(
    "updatedAt",
    "Cập nhật cuối",
  )
    .sortable()
    .hideOnTable()
    .hideOnForm()
    .tableWidth(160)
    .disableApi()
    .col(6),
});