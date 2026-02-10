import {FormProps} from "../../../utils/constants";

export const buildFormData = (overrides: FormProps = {}): FormProps => ({
  ...overrides,
});
