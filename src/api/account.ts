import { useRequest } from "@/hooks";

const { request } = useRequest("/api/otc");

const api = {
  wallet: "property",
  address: "blockchain/deposit/addresses",
};

export interface WalletAddressRes {
  address: string;
  codeImgUrl: string;
}
export const loadWalletAddress = (
  params: any
): Promise<ExResponse<WalletAddressRes>> =>
  request({
    url: api.address,
    params,
  });

export const loadWalletBalance = () =>
  request({
    url: api.wallet,
  });
