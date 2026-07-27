import {
  email,
  maxLength,
  minLength,
  pastDate,
  phone,
  required,
  enumValidator
} from "./validators";

export const validatorMap = {
  required,
  email,
  minLength,
  maxLength,
  pastDate,
  phone,
  enum: enumValidator,
};
