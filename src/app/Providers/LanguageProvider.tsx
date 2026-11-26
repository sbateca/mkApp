import {useEffect, useState, type ReactNode} from "react";
import {I18nextProvider} from "react-i18next";
import {
  createTranslations,
  getInitialLanguage,
  LANGUAGE_STORAGE_KEY,
} from "../../shared/i18n/language";

export const LanguageProvider = ({children}: {children: ReactNode}) => {
  const [translations] = useState(() =>
    createTranslations(getInitialLanguage()),
  );

  useEffect(() => {
    const applyLanguage = (language: string) => {
      document.documentElement.lang = language;
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch {
        // The language stays active for the current session.
      }
    };

    applyLanguage(translations.language);
    translations.on("languageChanged", applyLanguage);
    return () => {
      translations.off("languageChanged", applyLanguage);
    };
  }, [translations]);

  return <I18nextProvider i18n={translations}>{children}</I18nextProvider>;
};
