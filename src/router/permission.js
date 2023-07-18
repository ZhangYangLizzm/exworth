import router from "@/router"
import { useAccountStore } from "@/stores/modules/accounts"
import { useUserStore } from "@/stores/modules/user"

export default function Permission() {
  const accountStore = useAccountStore()
  const userStore = useUserStore()

  router.beforeEach(async (to, from, next) => {
    console.log(to, from)
    if (!['Login'].includes(to.name)) {
      // 非登录页
      if (!from.name || ['Login'].includes(from.name)) {
        accountStore.fetchWalletAccount()
        userStore.fetchUser()
      }
    }
    next()
  })
}