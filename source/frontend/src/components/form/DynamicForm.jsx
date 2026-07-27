import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormDate from "./FormDate";
import FormTextarea from "./FormTextarea";
import FormCheckbox from "./FormCheckbox";
import FormImage from "./FormImage";
import FormFile from "./FormFile";

const FIELD_COMPONENTS = {
  text: FormInput,
  email: FormInput,
  password: FormInput,
  number: FormInput,
  select: FormSelect,
  badge: FormSelect,
  date: FormDate,
  textarea: FormTextarea,
  checkbox: FormCheckbox,
  boolean: FormCheckbox,
  image: FormImage,
  avatar: FormImage,
  file: FormFile,
  document: FormFile,
};

function DynamicForm({ schema = [], values = {}, errors = {}, onChange }) {
  const renderField = (field) => {
    const Component = FIELD_COMPONENTS[field.type] ?? FormInput;

    const commonProps = {
      name: field.key,
      type: field.type,
      label: field.label,
      value: values[field.key] ?? "",
      onChange: (value) => onChange(field.key, value),
      required: field.required,
      disabled: field.disabled,
      placeholder: field.placeholder,
      error: errors[field.key],
      options: field.options ?? [],
      accept: field.accept,
    };

    if (field.type === "checkbox" || field.type === "boolean") {
      return (
        <Component
          label={field.label}
          value={values[field.key]}
          options={field.options}
          field={field}
        />
      );
    }

    return <Component {...commonProps} />;
  };

  return (
    <div className="row g-3">
      {schema.map((field) => (
        <div key={field.key} className={`col-${field.layout?.col ?? 12}`}>
          {renderField(field)}

          {field.helpText && <div className="form-text">{field.helpText}</div>}
        </div>
      ))}
    </div>
  );
}

export default DynamicForm;
