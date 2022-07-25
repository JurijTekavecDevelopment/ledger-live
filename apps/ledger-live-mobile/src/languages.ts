import RNLocalize from "react-native-localize";
import Config from "react-native-config";
import allLocales from "./locales";
import { Language } from "@ledgerhq/live-common/lib/types/languages";

export const languages = {
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
  es: "Español",
  fi: "suomi",
  fr: "Français",
  hu: "magyar",
  it: "italiano",
  ja: "日本語",
  ko: "한국어",
  nl: "Nederlands",
  no: "Norsk",
  pl: "polski",
  pt: "português",
  ru: "Русский",
  sr: "српски",
  sv: "svenska",
  tr: "Türkçe",
  zh: "简体中文",
};

export const localeIds: Locale[] = Object.keys(allLocales) as Locale[];

/**
 * This is the list of languages that are supported in terms of in-app translations
 * and it is meant to appear in the settings.
 */
export const supportedLocales: Locale[] = Config.LEDGER_DEBUG_ALL_LANGS
  ? localeIds
  : ["en", "fr", "es", "ru", "zh", "de", "tr", "ja", "ko"];


export type Locale = keyof typeof languages;

/**
 * This maps the supported locales from live to theiur equivalent languages on the device.
 * It is to be used for suggesting the user to change their device language according to their Live
 * language.
 */
export const localeIdToDeviceLanguage: { [key in Locale]?: Language} = {
  en: "english",
  fr: "french",
  es: "spanish",
}

/**
 * This is the list of languages that are supported in terms of in-app translations
 * (so it is a subset of `supportedLocales`)
 * AND supported in terms of external resources (i.e. customer support, articles etc.)
 * These languages will be used by default for new users if it's their system language
 * or in the case of existing users, they will be prompted once to change their
 * Ledger Live language.
 */
export const fullySupportedLocales: Locale[] = ["en", "fr", "ru", "es", "zh"];

type LocaleIndexed<T> = { [key in Locale]?: T };

export const locales = supportedLocales.reduce((obj: LocaleIndexed<any>, key) => {
  obj[key] = (allLocales as LocaleIndexed<any>)[key]; // eslint-disable-line no-param-reassign
  return obj;
}, {});

/** For the "language" setting which is used for translations. */
export const DEFAULT_LANGUAGE_LOCALE = "en";
/** This allows us to have the language set by default to the system language
 * if & only if that language is supported.
 */
export const getDefaultLanguageLocale = (
  fallbackLocale: string = DEFAULT_LANGUAGE_LOCALE,
) =>
  RNLocalize.findBestAvailableLanguage(fullySupportedLocales)?.languageTag ||
  fallbackLocale;

const languageLocaleToDefaultLocaleMap = {
  de: "de-DE",
  el: "el-GR",
  en: "en-US",
  es: "es-ES",
  fi: "fi-FI",
  fr: "fr-FR",
  hu: "hu-HU",
  it: "it-IT",
  ja: "ja-JP",
  ko: "ko-KR",
  nl: "nl-NL",
  no: "no-NO",
  pl: "pl-PL",
  pt: "pt-PT",
  ru: "ru-RU",
  sr: "sr-SR",
  sv: "sv-SV",
  tr: "tr-TR",
  zh: "zh-CN",
};

/** For the "region" setting which is used for dates & numbers formatting. */
export const DEFAULT_LOCALE = "en-US";
/** This allows us to have the region set by default to the region corresponding
 * to the system language if & only if that language is supported. */
export const getDefaultLocale = () => {
  const defaultLanguageLocale = getDefaultLanguageLocale() as Locale;
  return (
    languageLocaleToDefaultLocaleMap[defaultLanguageLocale] || DEFAULT_LOCALE
  );
};
