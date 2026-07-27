import { FIELD_DEFAULTS } from "@/constants";

export class FieldBuilder {
  constructor(type, key, label) {
    this.schema = structuredClone(FIELD_DEFAULTS[type]);

    this.schema.key = key;
    this.schema.label = label;
    this.schema.type = type;
  }

  build() {
    return Object.freeze(this.schema);
  }

  col(value = 12) {
    this.schema.form.layout = {
      ...this.schema.form.layout,
      col: value,
    };

    return this;
  }

  hideOnForm() {
    this.schema.form.visible = false;
    return this;
  }

  showOnForm() {
    this.schema.form.visible = true;
    return this;
  }

  formComponent(component) {
    this.schema.form.component = component;
    return this;
  }

  viewComponent(component) {
    this.schema.view.component = component;
    return this;
  }

  showOnView() {
    this.schema.view.visible = true;
    return this;
  }

  hideView() {
    this.schema.view.visible = false;
    return this;
  }

  tableWarp() {
    this.schema.table.nowarp = false;
    return this;
  }

  placeholder(text) {
    this.schema.form.placeholder = text;
    return this;
  }

  disableApiUpdate() {
    this.schema.api.update = false;
    return this;
  }

  disableApiCreate() {
    this.schema.api.create = false;
    return this;
  }

  disableApi() {
    this.schema.api.create = false;
    this.schema.api.update = false;
    return this;
  }

  disabled(config = {}) {
    this.schema.form.disabled = {
      ...this.schema.form.disabled,
      ...config,
    };
    return this;
  }

  disableOnCreate() {
    this.schema.form.disabled.create = true;
    return this;
  }

  disableOnUpdate() {
    this.schema.form.disabled.update = true;
    return this;
  }

  hideOnTable() {
    this.schema.table.visible = false;
    return this;
  }

  showOnTable() {
    this.schema.table.visible = true;
    return this;
  }

  tableWidth(value) {
    this.schema.table.width = value;
    return this;
  }

  align(value) {
    this.schema.table.align = value;
    return this;
  }

  formatter(fn) {
    this.schema.table.formatter = fn;
    return this;
  }

  searchable(value = true) {
    this.schema.query.searchable = value;
    return this;
  }

  sortable(value = true) {
    this.schema.query.sortable = value;
    return this;
  }

  readonly(value = true) {
    this.schema.form.readonly = value;
    return this;
  }

  visibleOnForm(value = true) {
    this.schema.form.visible = value;
    return this;
  }

  visibleOnTable(value = true) {
    this.schema.table.visible = value;
    return this;
  }

  renderer(fn) {
    this.schema.table.renderer = fn;
    return this;
  }
  query(...configs) {
    configs.forEach((config) => {
      this.schema.query = {
        ...this.schema.query,
        ...config,
      };
    });

    return this;
  }
  
  filter(type, defaultValue = null) {
    this.schema.query.filter = {
      type,
      defaultValue,
    };

    return this;
  }

  clearFilter() {
    this.schema.query.filter = null;
    return this;
  }

  required(config = true) {
    if (typeof config === "boolean") {
      this.schema.validation.required = {
        create: config,
        update: config,
      };
    } else {
      this.schema.validation.required = {
        ...this.schema.validation.required,
        ...config,
      };
    }

    return this;
  }

  requiredOnCreate() {
    this.schema.validation.required.create = true;
    return this;
  }

  requiredOnUpdate() {
    this.schema.validation.required.update = true;
    return this;
  }

  validation(...rules) {
    this.schema.validation.rules.push(...rules);
    return this;
  }

  rule(rule) {
    this.schema.validation.rules.push(rule);
    return this;
  }

  enum(enumDefinition) {
    this.schema.enum = enumDefinition;

    if (this.schema.defaultValue === null && enumDefinition.options?.length) {
      this.schema.defaultValue = enumDefinition.options[0].value;
    }

    return this;
  }

  options(options) {
    this.schema.enum ??= {};
    this.schema.enum.options = options;
    return this;
  }

  defaultValue(value) {
    this.schema.defaultValue = value;
    return this;
  }

  exportable(value = true) {
    this.schema.export.visible = value;
    return this;
  }

  importable(value = true) {
    this.schema.import.visible = value;
    return this;
  }

  creatable(value = true) {
    this.schema.api.create = value;
    return this;
  }

  updatable(value = true) {
    this.schema.api.update = value;
    return this;
  }
}
