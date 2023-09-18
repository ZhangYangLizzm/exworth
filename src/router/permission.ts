import { useAccountStore } from "@/stores/account";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const WhiteList = ["Login"];

export function Permission() {
  const accountStore = useAccountStore();
  const userStore = useUserStore();

  /**
   * 每个路由都重新获取钱包数据
   */
  router.beforeEach(async (to, from, next) => {
    if (!WhiteList.includes(to.name as string)) {
      // 非登录页
      if (!from.name || WhiteList.includes(from.name as string)) {
        accountStore.fetchWalletAccount();
        userStore.fetchUser();
      }
    }
    next();
  });
}
