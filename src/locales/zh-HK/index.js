import zhHK from 'ant-design-vue/es/locale/zh_HK'
import json from './app'
import 'dayjs/locale/zh-hk'
import libs from '@/libs/locales/zh-HK/libs'
import card from '@/core/card/locales/zh-HK/card'
export default {
  exLocale: zhHK.locale,
  antLocale: zhHK,
  ...card,
  ...json,
  ...libs
}
