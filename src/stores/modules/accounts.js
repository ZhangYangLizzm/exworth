import { loadWalletBalance } from "@/api/account"

export const useAccountStore = defineStore('account', () => {
  // 钱包资产
  const walletAccounts = ref([])
  const loading = ref(false)
  const fetchWalletAccount = async () => {
    loading.value = true
    const { statusCode, content } = await loadWalletBalance()
    if (statusCode === 200) {
      walletAccounts.value = content
      loading.value = false
    }
  }

  // 某一貨幣的可用資產
  const availableBalance = (currency) => {
    return walletAccounts.value.find((item) => item.currency === currency)?.balanceAmount || 0
  }
  // 卡资产
  return {
    loading,
    walletAccounts,
    fetchWalletAccount,
    availableBalance
  }
})