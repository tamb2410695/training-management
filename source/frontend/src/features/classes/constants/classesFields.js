import { buildFields, Rules, defineFields } from "@/utils";
import { CLASS_STATUS } from "./classesEnums";

const Field = buildFields();

export const CLASS_FIELDS = defineFields({
  courseId: Field.select(
    "courseId",
    "Khóa học",
    [],
  )
    .requiredOnCreate()
    .filter("text")
    .sortable()
    .col(6),

  teacherId: Field.select(
    "teacherId",
    "Giảng viên",
    [],
  )
    .requiredOnCreate()
    .filter("text")
    .sortable()
    .col(6),

  classCode: Field.text(
    "classCode",
    "Mã lớp",
  )
    .placeholder("CLASS001")
    .searchable()
    .sortable()
    .tableWidth(160)
    .col(6)
    .validation(
      Rules.maxLength(30),
    ),

  className: Field.text(
    "className",
    "Tên lớp",
  )
    .searchable()
    .sortable()
    .tableWidth(220)
    .col(6)
    .validation(
      Rules.maxLength(100),
    ),

  startDate: Field.date(
    "startDate",
    "Ngày bắt đầu",
  )
    .requiredOnCreate()
    .sortable()
    .tableWidth(140)
    .col(6),

  endDate: Field.date(
    "endDate",
    "Ngày kết thúc",
  )
    .requiredOnCreate()
    .sortable()
    .tableWidth(140)
    .col(6),

  maxStudents: Field.number(
    "maxStudents",
    "Số học viên tối đa",
  )
    .sortable()
    .col(6)
    .validation(
      Rules.min(1),
    ),

  classStatus: Field.badge(
    "classStatus",
    "Trạng thái lớp",
    CLASS_STATUS,
  )
    .filter("text")
    .defaultValue(CLASS_STATUS.values[0])
    .sortable()
    .tableWidth(140)
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