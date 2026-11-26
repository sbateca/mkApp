import {useCallback, useContext} from "react";
import {I18nContext, useTranslation} from "react-i18next";
import {createTranslations, type Language} from "./language";

const standaloneTranslations = createTranslations("en");

export const useInterfaceTranslation = () => {
  const context = useContext(I18nContext);
  const {t, i18n} = useTranslation("translation", {
    i18n: context?.i18n ?? standaloneTranslations,
  });

  return {
    t: useCallback((message?: string) => (message ? t(message) : ""), [t]),
    language: i18n.language === "es" ? "es" : "en",
    changeLanguage: (language: Language) => i18n.changeLanguage(language),
  } as const;
};
