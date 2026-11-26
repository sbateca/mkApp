import {createInstance} from "i18next";
import {es} from "./es";

export const languages = {es: "Español", en: "English"} as const;
export type Language = keyof typeof languages;

export const LANGUAGE_STORAGE_KEY = "mk.interface-language";
export const isLanguage = (value: string | null): value is Language =>
  value === "es" || value === "en";

export const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // The app can still switch languages when browser storage is unavailable.
  }
  return "es";
};

export const createTranslations = (language: Language) => {
  const instance = createInstance();
  void instance.init({
    lng: language,
    fallbackLng: "en",
    supportedLngs: ["es", "en"],
    resources: {es: {translation: es}, en: {translation: {}}},
    keySeparator: false,
    nsSeparator: false,
    initAsync: false,
    interpolation: {escapeValue: false},
  });
  return instance;
};
