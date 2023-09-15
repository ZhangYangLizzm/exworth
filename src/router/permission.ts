import { useAccountStore } from "@/stores/account";
import { useUserStore } from "@/stores/user";
import router from "@/router";

export function Permission() {
  const accountStore = useAccountStore();
  const userStore = useUserStore();

  router.beforeEach(async (to, from, next) => {
    if (!["Login"].includes(to.name as string)) {
      // 非登录页
      if (!from.name || ["Login"].includes(from.name as string)) {
        accountStore.fetchWalletAccount();
        userStore.fetchUser();
      }
    }
    next();
  });
}
