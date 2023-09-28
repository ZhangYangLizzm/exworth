import { useRequest } from "@/hooks";
import { WalletAddressReqParams, WalletAddressRes, WalletBalanceProperty } from "./types/account";

const { request } = useRequest("/api/otc");

const api = {
  wallet: "property",
  address: "blockchain/deposit/addresses",
};

export const loadWalletAddress = (
  params: WalletAddressReqParams
): Promise<ExResponse<WalletAddressRes>> =>
  request({
    url: api.address,
    params,
  });

export const loadWalletBalance = ():Promise<ExResponse<WalletBalanceProperty[]>> =>
  request({
    url: api.wallet,
  });
