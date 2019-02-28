// @flow
import Config from "react-native-config";
import allLocales from "./locales";

const prodStableLanguages = ["en"];

const l = {};
export const localeIds: string[] = Object.keys(allLocales);
localeIds.forEach(key => {
  if (Config.LEDGER_DEBUG_ALL_LANGS || prodStableLanguages.includes(key)) {
    l[key] = allLocales[key];
  }
});

export const locales = l;
