import dayjs from "dayjs";

export const REQUIRED_FIELD_ERROR_TEXT = "This field is required.";
const FIELD_SHOULD_BE_NUMBER_TEXT = "This field should be a number.";
const INVALID_EMAIL_FORMAT_ERROR_TEXT = "Invalid email format.";
const INVALID_DATE_FORMAT_ERROR_TEXT = "Invalid date format.";

export const isEmpty = (fieldValue?: string): string => {
  return !fieldValue?.trim() ? REQUIRED_FIELD_ERROR_TEXT : "";
};

export const isNotNumber = (fieldValue: string): string => {
  return fieldValue !== "" && isNaN(Number(fieldValue))
    ? FIELD_SHOULD_BE_NUMBER_TEXT
    : "";
};

export const isNotValidEmailFormat = (fieldValue?: string): string => {
  if (!fieldValue?.trim()) return "";
  return !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(fieldValue.trim())
    ? INVALID_EMAIL_FORMAT_ERROR_TEXT
    : "";
};

export const isNotValidDate = (fieldValue?: string): string => {
  if (!fieldValue?.trim()) return "";
  const parsed = dayjs(fieldValue);
  return parsed.isValid() && parsed.format("YYYY-MM-DD") === fieldValue
    ? ""
    : INVALID_DATE_FORMAT_ERROR_TEXT;
};

export const isMissingPassword = (value?: string): string =>
  value ? "" : REQUIRED_FIELD_ERROR_TEXT;

export const lengthBetween =
  (min: number, max: number, trim = true) =>
  (value?: string): string => {
    const normalized = trim ? value?.trim() : value;
    if (!normalized) return "";
    const length = Array.from(normalized).length;
    return length < min || length > max
      ? `Length: ${min}–${max} characters.`
      : "";
  };

export const exceedsLength =
  (max: number) =>
  (value?: string): string =>
    value && Array.from(value).length > max
      ? `Maximum length: ${max} characters.`
      : "";

export const API_FIELD_LIMITS = {
  catalogName: 150,
  credential: 150,
  sampleCode: 50,
  sampleLocation: 250,
  sampleResponsible: 150,
  reportNumber: 100,
  reportResult: 200,
} as const;
