import axios from "axios"
import useRequestHandler from "./handler"
import { stringify } from 'qs'

const useRequest = (domain = '', config = {
  successMsg: false
}) => {
  const {
    errorHandler,
    reqInterceptor,
    resInterceptor
  } = useRequestHandler({ ...config })
  
  const request = axios.create({
    baseURL: `${domain}/`,
    timeout: 6000,
    paramsSerializer: {
      serialize: params => stringify(params, { arrayFormat: 'repeat', skipNulls: true })
    }
})
  
  // request interceptors
  request.interceptors.request.use(reqInterceptor, errorHandler)
  
  // response interceptors
  request.interceptors.response.use(resInterceptor, errorHandler)
  return {
    request
  }
}


export default useRequest