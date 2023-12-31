import { useRequest } from "@/hooks";
const { request } = useRequest("/api");

export const postWithdrawTransfer = (data: any): Promise<ExResponse<any>> =>
  request({
    url: "otc/withdraw",
    method: "POST",
    data,
  });

export const getBalanceHistory = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "otc/balanceHistory",
    method: "GET",
    params,
  });

export const getDepositHistory = (params: any) =>
  request({
    url: "otc/blockchain/deposit/history",
    method: "GET",
    params: { ...params, timeKey: "createTime" },
  });

export const getWithdrawHistory = (params: any) =>
  request({
    url: "otc/withdraw",
    method: "GET",
    params: { ...params, type: "ppc.send", timeKey: "createTime" },
  });

export const getTransferstory = (params: any) =>
  request({
    url: "otc/withdraw",
    method: "GET",
    params: { ...params, type: "internal", timeKey: "createTime" },
  });

export interface OtcRateRes {
  flipPrice: number;
  receiptAmount: number;
  priceLow: number;
  amount: number;
  price: number;
  dealAmount: number;
  fee: number;
  balanceAmount: number;
  priceHigh: number;
}
export const getOtcRate = (params: any): Promise<ExResponse<OtcRateRes>> =>
  request({
    url: "otc/rate",
    method: "GET",
    params,
  });

export const postCurrencyWithdraw = (data: any): Promise<ExResponse<any>> =>
  request({
    url: "otc/withdraw",
    method: "POST",
    data,
  });

export const postMemberTransfer = (data: any): Promise<ExResponse<any>> =>
  request({
    url: "otc/withdraw",
    method: "POST",
    data: {
      ...data,
      type: "transfer",
    },
  });
