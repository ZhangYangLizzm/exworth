import 'ant-design-vue/es/notification/style/index'
import 'ant-design-vue/es/message/style/index'
import Storage from 'store'
import { useScreen } from '@/libs/hooks/useScreen'
import { useAppStore } from '@/libs/stores/modules/app'
import { STORAGE_LOCALE } from '@/libs/config/constant'
import { DEFAULT_LOCALE } from '@/plugins/i18n'

export default function Initializer() {
  const appStore = useAppStore()
  const resizeCallback = ({ isMobile, screenEnum }) => {
    appStore.isMobile = isMobile
  }
  const { resizeListenner, resizeHandler } = useScreen({ width: true, height: true, resizeCallback })
  resizeListenner()
  nextTick(() => {
    resizeHandler()
  })

  // locale
  appStore.setLocale(Storage.get(STORAGE_LOCALE, DEFAULT_LOCALE))
}