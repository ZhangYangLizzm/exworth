import { message, notification } from 'ant-design-vue'
import Storage from 'store'
import { STORAGE_LOCALE } from '@/config/constant.js'

const ERROR_CODES = [101]
const WARN_CONDES = [103, 105, 106, 107, 108]

const useRequestHandler = () => {
  const messageHandler = (config, code, msg) => {
    // 1. silence 不提示
    // 2. get 请求 不提示
    const { headers: { Silence }, method } = config
    if (Silence != 1 && method != 'get') {
      if (code === 200) {
        message.success(msg)
      } else if (ERROR_CODES.concat(WARN_CONDES).includes(code)) {
        notification.error({
          // message: i18n.t('nXGM69uyR2RtkWy9zSOOy'),
          description: msg
        })
      } else {
        message.error(msg)
      }
    }
  }

  const unauthorizedHandler = (config, code) => {
    if (ERROR_CODES.includes(code)) {
      window.location.href = '/login'
    }
  }
  const errorHandler = error => {
    // if (error.response) {
    //   const { data, status } = error.response
    //   const token = storage.get(APP_UID)
    //   if (status === 401 && !(data.content && data.content.isLogin)) {
    //     notification.error({
    //       title: 'Unauthorized',
    //       description: `Authorization verification errored`
    //     })
    //     if (token) {
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 1500)
    //     }
    //   }
    // }
    // return Promise.reject(error)
    // return Promise.resolve({ statusCode: 500, message: i18n.t('B1xUQj-cDCc2LS_3dUyci') })
    return Promise.resolve({ statusCode: 500, message: 'Network Exception' })
  }
  const reqInterceptor = config => {
    // if (config.)
    // console.log(config)
    const locale = Storage.get(STORAGE_LOCALE)
    if (locale) {
      config.headers['User-Lang'] = locale
    }
    return config
  }
  const resInterceptor = res => {
    const { config, data, headers, request, response, status } = res
    const { message: msg, statusCode } = data
    messageHandler(res.config, statusCode, msg)
    unauthorizedHandler(res.config, statusCode, msg)
    return { req: { config, headers, request }, ...res.data }
  }
  return {
    errorHandler,
    reqInterceptor,
    resInterceptor,
  }
}
export default useRequestHandler