import zhHK from 'ant-design-vue/es/locale/zh_HK'
import json from './app'
import 'dayjs/locale/zh-hk'
import libs from '@/libs/locales/zh-HK/libs'
export default {
  exLocale: zhHK.locale,
  antLocale: zhHK,
  ...json,
  ...libs
}
