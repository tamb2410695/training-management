import ViewText from "./ViewText";
import ViewDate from "./ViewDate";
import ViewImage from "./ViewImage";
import ViewFile from "./ViewFile";

const VIEW_COMPONENTS = {
  text: ViewText,
  email: ViewText,
  password: ViewText,
  number: ViewText,

  date: ViewDate,

  image: ViewImage,
  avatar: ViewImage,

  file: ViewFile,
  document: ViewFile,

  textarea: ViewText,

  checkbox: ViewText,
  boolean: ViewText,
};

function DynamicView({ schema = [], record = {} }) {
  const renderField = (field) => {
    const Component =
      VIEW_COMPONENTS[field.component ?? field.type] ?? ViewText;

    const props = {
      name: field.key,
      label: field.label,
      value: record[field.valueKey ?? field.key],
      options: field.options ?? [],
      format: field.format,
      showTime: field.showTime ?? false,
      emptyText: field.emptyText ?? "-",
      field,
    };

    return <Component {...props} />;
  };

  return (
    <div className="row g-3">
      {schema.map((field) => (
        <div key={field.key} className={`col-${field.layout?.col ?? 12}`}>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}

export default DynamicView;
