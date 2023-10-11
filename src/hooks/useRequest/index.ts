import axios from "axios";
import useRequestHandler from "./handler";
import { stringify } from "qs";

export const useRequest = (domain = "") => {
  const { errorHandler, reqInterceptor, resInterceptor } = useRequestHandler();

  const request = axios.create({
    baseURL: `${domain}/`,
    timeout: 6000,
    paramsSerializer: {
      serialize: (params) =>
        stringify(params, { arrayFormat: "repeat", skipNulls: true }),
    },
  });

  // request interceptors
  request.interceptors.request.use(reqInterceptor, errorHandler);

  // response interceptors
  request.interceptors.response.use(resInterceptor, errorHandler);
  
  return {
    request,
  };
};

