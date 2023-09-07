import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "../i18n/englishMessages";
import it from "../i18n/italianMessages";

const translations = { en, it };

export const i18nProvider = polyglotI18nProvider(
  (locale) => {
    let localeTyped = locale as keyof typeof translations;
    return translations[localeTyped];
  },
  "en", // default locale
  [
    { locale: "en", name: "English" },
    { locale: "it", name: "Italiano" },
  ]
);
