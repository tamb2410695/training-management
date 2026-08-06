import { buildFields, Rules, defineFields } from "@/utils";
import {
  DOCUMENT_STATUS,
} from "./documentEnums";

const Field = buildFields();

export const DOCUMENT_FIELDS = defineFields({
  documentCode: Field.text("documentCode", "Mã tài liệu")
    .sortable()
    .searchable()
    .tableWidth(150)
    .hideOnForm(),

  title: Field.text("title", "Tên tài liệu")
    .placeholder("Nhập tên tài liệu")
    .required()
    .searchable()
    .sortable()
    .tableWidth(280)
    .col(12)
    .validation(Rules.minLength(2), Rules.maxLength(255)),

  description: Field.textarea("description", "Mô tả")
    .placeholder("Nhập mô tả")
    .col(12)
    .validation(Rules.maxLength(1000)),

  courseId: Field.select("courseId", "Học phần")
    .required()
    .filter("text")
    .tableWidth(220)
    .col(6),

  documentStatus: Field.badge("documentStatus", "Trạng thái", DOCUMENT_STATUS)
    .filter("text")
    .sortable()
    .defaultValue(DOCUMENT_STATUS.values[0])
    .tableWidth(150)
    .disabled()
    .col(6),

  createdAt: Field.date("createdAt", "Ngày tạo")
    .sortable()
    .hideOnForm()
    .tableWidth(170)
    .disableApi(),

  updatedAt: Field.date("updatedAt", "Cập nhật")
    .sortable()
    .hideOnForm()
    .tableWidth(170)
    .disableApi(),
});
