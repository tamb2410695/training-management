export function buildEnumFields(fields) {
  return Object.keys(fields).reduce((field, key) => {
    field[key] = {
      label: fields[key].LABEL,
      color: fields[key].COLOR,
    };
    return field;
  }, {});
}

export function buildEnum(definition) {
  const items = [];
  const values = [];
  const options = [];
  const map = {};

  Object.entries(definition).forEach(([value, config]) => {
    const item = {
      value,
      label: config.label ?? value,
      ...config,
    };

    items.push(item);
    values.push(value);

    options.push({
      value,
      label: item.label,
    });

    map[value] = item;
  });

  return Object.freeze({
    items: Object.freeze(items),
    values: Object.freeze(values),
    options: Object.freeze(options),
    map: Object.freeze(map),

    has(value) {
      return values.includes(value);
    },

    get(value) {
      return map[value];
    },

    getLabel(value) {
      return map[value]?.label ?? value;
    },

    getColor(value) {
      return map[value]?.color;
    },

    filter(predicate) {
      return items.filter(predicate);
    },

    filterSelectable() {
      return items.filter((item => item.selectable))
    },

    filterOptions(predicate) {
      return items
        .filter(predicate)
        .map(({ value, label }) => ({
          value,
          label,
        }));
    },
  });
}