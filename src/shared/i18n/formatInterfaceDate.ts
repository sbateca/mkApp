import type {Language} from "./language";

const spanishDate = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export const formatInterfaceDate = (
  value: string,
  language: Language,
): string => {
  if (language === "es" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(value);
    if (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    ) {
      return spanishDate.format(date);
    }
  }
  return value;
};
