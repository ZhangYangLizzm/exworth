import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api");

export const getConfig = (): Promise<ExResponse<any>> =>
  request({
    url: "withdraw/config/security/center",
    method: "GET",
  });

export const getGoogleSecretKey = (): Promise<ExResponse<any>> =>
  request({
    url: "withdraw/config/security/googleSecretKey",
    method: "GET",
  });

export const postGoogleAuth = (data: {
  authCode: string;
  secretKey: string | undefined;
}): Promise<ExResponse<any>> =>
  request({
    url: "withdraw/config/security/googleSecretKey",
    method: "POST",
    data,
  });

export const postSetCode = (data: any): Promise<ExResponse<any>> =>
  request({
    url: "withdraw/config/user/withdrawPassword",
    method: "POST",
    data,
  });
