import { loadWalletBalance } from "@/api/account"

export const useAccountStore = defineStore('account', () => {
  // 钱包资产
  const walletAccounts = ref([])
  const fetchWalletAccount = async () => {
    const { statusCode, content } = await loadWalletBalance()
    if (statusCode === 200) {
      walletAccounts.value = content
    }
  }

  // 卡资产
  return {
    walletAccounts,
    fetchWalletAccount
  }
})