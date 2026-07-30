import { ERROR_CODES } from "@/constants";
import { ValidationError } from "../errors";
import { validatorMap } from "./validatorMap";

export function runValidator(fieldSchema, value) {
  const rules = [];
  rules.push(...fieldSchema.rules);

  for (const rule of rules) {
    const validator = validatorMap[rule.type];
    if (!validator) {
      throw new ValidationError(ERROR_CODES.VALIDATION_FAILED, `Unknown validator: ${rule.type}`);
    }
    const error = validator(value, rule);
    if (error) {
      return error;
    }
  }
}

export function validateForm(schema, data) {
  const errors = {};
  Object.entries(schema).forEach(([field, fieldSchema]) => {
    const error = runValidator(fieldSchema, data[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
