import { buildFields, Rules, defineFields } from "@/utils";
import { COURSE_STATUS } from "./courseEnums";

const Field = buildFields();

export const COURSE_FIELDS = defineFields({
  categoryId: Field.select(
    "categoryId",
    "Danh mục",
    []
  )
    .requiredOnCreate()
    .hideOnTable()
    .filter("text")
    .col(6),

  categoryName: Field.text(
    "categoryName",
    "Danh mục khóa học"
  )
    .searchable()
    .sortable()
    .hideOnForm()
    .tableWidth(220),

  categoryCode: Field.text(
    "categoryCode",
    "Mã danh mục"
  )
    .searchable()
    .sortable()
    .hideOnForm()
    .tableWidth(180),

  courseCode: Field.text(
    "courseCode",
    "Mã khóa học"
  )
    .placeholder("COURSE001")
    .searchable()
    .sortable()
    .tableWidth(180)
    .col(6)
    .validation(
      Rules.maxLength(50),
    ),

  courseName: Field.text(
    "courseName",
    "Tên khóa học"
  )
    .requiredOnCreate()
    .searchable()
    .sortable()
    .tableWidth(260)
    .col(6)
    .validation(
      Rules.maxLength(255),
    ),

  description: Field.textarea(
    "description",
    "Mô tả"
  )
    .searchable()
    .col(12)
    .validation(
      Rules.maxLength(1000),
    ),

  durationHours: Field.number(
    "durationHours",
    "Thời lượng (giờ)"
  )
    .requiredOnCreate()
    .sortable()
    .tableWidth(140)
    .col(6),

  courseStatus: Field.badge(
    "courseStatus",
    "Trạng thái",
    COURSE_STATUS,
  )
    .filter("text")
    .sortable()
    .requiredOnUpdate()
    .disabled({
      create: true,
      update: false,
    })
    .defaultValue(COURSE_STATUS.values[0])
    .tableWidth(140)
    .col(6),

  createdAt: Field.date(
    "createdAt",
    "Ngày tạo"
  )
    .sortable()
    .hideOnForm()
    .disableApi()
    .tableWidth(160),

  updatedAt: Field.date(
    "updatedAt",
    "Cập nhật cuối"
  )
    .sortable()
    .hideOnForm()
    .hideOnTable()
    .disableApi(),
});