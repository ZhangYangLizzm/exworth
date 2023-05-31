import i18n, { loadLocaleMessages, DEFAULT_LOCALE } from "@/plugins/i18n"
import Storage from 'store'
import { STORAGE_LOCALE } from "@/config/constant"

export const useAppStore = defineStore('app', () => {

  const isMobile = ref(true)
  const screen = ref('')
  const countries = ref([])

  const locale = ref(DEFAULT_LOCALE)
  const localeText = computed(() => SUPPORT_LOCALES_MAP[locale.value])

  const setLocale = value => {
    locale.value = value
    Storage.set(STORAGE_LOCALE, value)
    loadLocaleMessages(i18n, value)
  }
  return {
    locale,
    localeText,
    screen,
    countries,
    isMobile,
    setLocale
  }
})