import enUS from 'ant-design-vue/es/locale/en_US'
import json from './app'
import libs from '@/libs/locales/en-US/libs'

export default {
  exLocale: enUS.locale,
  antLocale: enUS,
  ...json,
  ...libs
}