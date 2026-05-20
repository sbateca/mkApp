export type FormValue =
  | string
  | string[]
  | Record<string, unknown>
  | null
  | undefined;

export interface FormProps {
  [key: string]: FormValue;
}

export const getFormStringValue = (
  form: FormProps,
  fieldName: string,
): string => {
  const value = form[fieldName];

  return typeof value === "string" ? value : "";
};
