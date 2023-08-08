import enUS from 'ant-design-vue/es/locale/en_US'
import json from './app'
import libs from '@/libs/locales/en-US/libs'
import card from '@/core/card/locales/en-US/card'
export default {
  exLocale: enUS.locale,
  antLocale: enUS,
  ...card,
  ...json,
  ...libs
}