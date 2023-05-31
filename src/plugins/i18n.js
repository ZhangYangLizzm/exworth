import { LOCALES_MAP } from '@/libs/config/global'
import { pick, merge } from 'lodash-es'
import enUS from '@/locales/en-US'
import zhHK from '@/locales/zh-HK'
import { useAppStore } from '@/libs/stores/modules/app'

export const SUPPORT_LOCALES = ['en-US', 'zh-HK']

export const SUPPORT_LOCALES_MAP = pick(LOCALES_MAP, SUPPORT_LOCALES)

export const DEFAULT_LOCALE = 'zh-HK'
// export const DEFAULT_LOCALE = 'zh-HK'
export const loadedLocales = [DEFAULT_LOCALE]
export const loadedModules = []
const messages = {
  'en-US': {
    ...enUS
  },
  'zh-HK': {
    ...zhHK
  }
}

export const loadDynamicMessages = async (modules) => {
  const appStore = useAppStore()
  // if loaded
  const { messages, locale } = i18n
  const msg = unref(messages)?.[appStore.locale]
  let _msg
  if (modules instanceof Array) {
    const res = []
    for(const _module of modules) {
      if (!([_module] in msg)) {
        try {
          const [dir, module] = _module.split('_')
          res.push(await import(`../${dir}/locales/${appStore.locale}/${module}.json`))
        } catch(e) {}
      }
    }
    _msg = merge(msg, ...res.map(i => i.default))
  } else {
    if (!([modules] in msg)) {
      try {
          const [dir, module] = modules.split('_')
          const res = await import(`../${dir}/locales/${appStore.locale}/${module}.json`)
          console.log(`../${dir}/${module}/locales/${appStore.locale}/${module}.json`)
        _msg = merge(msg, res.default)
      } catch(e) {}
    }
  }
  if (_msg) {
    vueI18n.global.setLocaleMessage(appStore.locale, _msg)
  }
  
  return nextTick()
}

export const loadLocaleMessages = async (i18n, locale) => {
  const _locale = getLocaleDefault(locale)
  if (loadedLocales.includes(_locale)) {
    setI18nLanguage(i18n, _locale)
  } else {
    // load locale messages with dynamic import
    const loadedMessages = await import(`../locales/${_locale}/index.js`)
    // set locale and locale message
    i18n.global.setLocaleMessage(_locale, loadedMessages.default)
    loadedLocales.push(_locale)
    setI18nLanguage(i18n, _locale)
    // Storage.set(APP_LOCALE, _locale)
  }
  return nextTick()
}

export const getLocaleDefault = (locale, defaultLocale = DEFAULT_LOCALE) => {
  if (SUPPORT_LOCALES.includes(locale)) {
    return locale
  }
  return defaultLocale
}

export const setI18nLanguage = (i18n, locale = DEFAULT_LOCALE) => {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  document.querySelector('html').setAttribute('lang', locale)
}

export const setupI18n = (options = { locale: DEFAULT_LOCALE }) => {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale)
  return i18n
}

const vueI18n = setupI18n({
  legacy: false,
  silentTranslationWarn: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
  availableLocales: SUPPORT_LOCALES
})


export default vueI18n
const { global: i18n } = vueI18n

export {
  i18n
}