import { message, notification } from "ant-design-vue";
import { STORAGE_LOCALE } from "@/config/constant.ts";
import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import store from "store";
const ERROR_CODES = [101];
const WARN_CONDES = [103, 105, 106, 107, 108];

interface CustomHeaders extends AxiosHeaders {
  Silence: number;
}
const useRequestHandler = () => {
  // const { t } = useI18n();
  const messageHandler = (
    config: InternalAxiosRequestConfig,
    code: number,
    msg: string
  ) => {
    // 1. silence 不提示
    // 2. get 请求 不提示
    const { headers, method } = config;
    const { Silence } = headers as CustomHeaders;
    if (Silence != 1 && method != "get") {
      if (code === 200) {
        message.success(msg);
      } else if (ERROR_CODES.concat(WARN_CONDES).includes(code)) {
        notification.error({
          message: "请求错误提示",
          description: msg,
        });
      } else {
        message.error(msg);
      }
    }
  };

  const unauthorizedHandler = (code: number) => {
    if (ERROR_CODES.includes(code)) {
      window.location.href = "/login";
    }
  };
  const errorHandler = () => {
    return Promise.resolve({ statusCode: 500, message: "Network Exception" });
  };
  const reqInterceptor = (config: InternalAxiosRequestConfig) => {
    const locale = store.get(STORAGE_LOCALE);
    if (locale) {
      config.headers["User-Lang"] = locale;
    }
    return config;
  };

  const resInterceptor = (res: AxiosResponse) => {
    const { config, data, headers, request } = res;
    const { message: msg, statusCode } = data;
    messageHandler(res.config, statusCode, msg);
    unauthorizedHandler(statusCode);
    return { req: { config, headers, request }, ...res.data };
  };

  return {
    errorHandler,
    reqInterceptor,
    resInterceptor,
  };
};
export default useRequestHandler;
