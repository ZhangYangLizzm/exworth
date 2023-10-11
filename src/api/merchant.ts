import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api");

export const getMerchantList = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "merchant",
    params,
  });

export const getMerchantGroupList = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "merchantGroup",
    params,
  });
