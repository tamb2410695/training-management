import { FIELD_DEFAULTS } from "@/constants";
import { FieldBuilder } from "./FieldBuilder";

export function buildFields() {
  const builders = {};

  for (const type of Object.keys(FIELD_DEFAULTS)) {
    builders[type] = (key, label) => new FieldBuilder(type, key, label);
  }

  builders.select = (key, label, enumDefinition) =>
    new FieldBuilder("select", key, label).enum(enumDefinition);

  builders.badge = (key, label, enumDefinition) =>
    new FieldBuilder("badge", key, label).enum(enumDefinition);

  return builders;
}

export function defineFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [
      key,
      typeof field?.build === "function"
        ? field.build()
        : field,
    ]),
  );
}
