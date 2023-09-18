import { useRequest } from "@/hooks";

const { request } = useRequest("/api/otc");

const api = {
  wallet: "property",
  address: "blockchain/deposit/addresses",
};

export const loadWalletAddress = (params: any) =>
  request({
    url: api.address,
    params,
  });

export const loadWalletBalance = () =>
  request({
    url: api.wallet,
  });
