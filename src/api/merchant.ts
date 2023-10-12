import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api");

export const getMerchantList = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "/merchant",
    params,
  });

export const getMerchantBaseInfo = (merchantId: string) =>
  request({
    url: `/merchant/${merchantId}/ppcBaseInfo`,
  });

export const getMerchantPayInfo = (merchantId: string) =>
  request({
    url: `/merchant/${merchantId}/payInfo`,
  });

export const getMerchantPrepaidCardList = (
  params: any
): Promise<ExResponse<any>> =>
  request({
    url: "ppc/manage/cards",
    params,
  });
