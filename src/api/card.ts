import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api");

export const loadPhysicalCard = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "ppc/cards",
    params,
  });

export const postRecharge = (data: {
  cardKey: any;
  currency: string;
  amount: number;
  password: string;
  authCode: string;
}): Promise<ExResponse<any>> =>
  request({
    url: "ppc/card/recharge",
    data,
    method: "post",
  });

export const postReportLoss = (data: {
  cardKey: any;
  password: string;
  authCode: string;
}): Promise<ExResponse<any>> =>
  request({
    url: "ppc/reportLoss",
    data,
    method: "post",
  });

export const postChangeCard = (data: {
  oldCardkey: any;
  newCardKey: string;
  password: string;
  authCode: string;
}): Promise<ExResponse<any>> =>
  request({
    url: "ppc/changeCard",
    data,
    method: "post",
  });

export const postRechargeVCC = (data: {
  cardKey: any;
  currency: string;
  amount: number;
  password: string;
  authCode: string;
}): Promise<ExResponse<any>> =>
  request({
    url: "member/credit/recharge",
    method: "POST",
    data,
  });

export const getCardPropety = () =>
  request({
    url: "ppc/cardProperty",
  });
