export interface WalletAddressRes {
  address: string;
  codeImgUrl: string;
}

export interface WalletAddressReqParams {
  currency: string;
  chain: string;
}

export interface WalletBalanceProperty {
  accountId: string;
  agentId: string;
  balanceAmount: number;
  currency: string;
  freezeAmount: number;
  mechanismId: string;
  merchantId: string;
  ownerId: string;
  processingAmount: number;
  usable: boolean;
}
