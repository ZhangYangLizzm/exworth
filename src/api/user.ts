import { useRequest } from "@/hooks";
const { request } = useRequest("/api");

export const logoutSelf = () =>
  request({
    url: "logout",
    method: "POST",
  });

export const loadSelf = () =>
  request({
    url: "otc/userInfo",
  });

export const login = (data: any):Promise<ExResponse<any>> =>
  request({
    url: "login",
    method: "POST",
    data,
  });

export const authCode = (params: any) =>
  request({
    url: "authCode",
    params,
  });

export const firstLogin = (data: any):Promise<ExResponse<any>> =>
  request({
    url: "firstLogin/reset/password",
    method: "POST",
    data,
  });

export const checkAuthcode = (data: any) =>
  request({
    url: "login/checkAuthcode",
    method: "POST",
    data,
  });

export const postUpdatePassword = (data: any) =>
  request({
    url: "user/updatePassword",
    method: "POST",
    data,
  });
