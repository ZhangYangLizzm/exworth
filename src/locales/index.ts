import { createI18n } from "vue-i18n";
import enUS from "./en-US";
import zhCN from "./zh-CN";
import { STORAGE_LOCALE, DEFAULT_LOCALE } from "@/config/constant";
import store from "store";
export const i18n = createI18n({
  locale: store.get(STORAGE_LOCALE) || DEFAULT_LOCALE,
  legacy: false,
  messages: {
    "en-US": enUS,
    "zh-CN": zhCN,
  },
});
