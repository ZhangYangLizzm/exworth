import { createI18n } from "vue-i18n";
import enUS from "./en-US";
import zhHK from "./zh-HK";
import { STORAGE_LOCALE } from "@/config/constant";
import { DEFAULT_LOCALE } from "@/hooks/useLocale";

export const i18n = createI18n({
  locale: localStorage.getItem(STORAGE_LOCALE) || DEFAULT_LOCALE,
  legacy: false,
  messages: {
    "en-US": enUS,
    "zh-HK": zhHK,
  },
});
