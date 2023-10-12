import { DEFAULT_LOCALE, STORAGE_LOCALE } from "@/config/constant.ts";
import { i18n } from "@/locales";
import store from "store";

export const LOCALES_MAP = {
  "en-US": "English",
  "zh-CN": "简体中文",
};

export type LocalesKey = keyof typeof LOCALES_MAP;

export const useLocale = () => {
  const getLocale = () => {
    return store.get(STORAGE_LOCALE) || DEFAULT_LOCALE;
  };

  const locale = ref(getLocale());

  const localeText = computed(() => LOCALES_MAP[locale.value as LocalesKey]);

  const setLocale = (value: LocalesKey) => {
    i18n.global.locale.value = value;
    store.set(STORAGE_LOCALE,value)
  };

  const SUPPORT_LOCALES = Object.entries(LOCALES_MAP).map(([value, label]) => ({
    label,
    value,
  }));
  return { locale, SUPPORT_LOCALES, localeText, setLocale };
};
