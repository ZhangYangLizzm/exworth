import { AxiosInstance } from "axios";

export const wrapRequest = (requestFn: AxiosInstance, params: any) => {
  let controller: AbortController;

  const cancel = () => controller.abort();

  const wrapRequestFn = () => {
    if (controller) cancel();
    controller = new AbortController();
    requestFn({
      params,
      signal: controller.signal,
    });
  };
  return wrapRequestFn;
};
