import { loadSelf, logoutSelf } from "@/api/user";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const accountName = ref("");
  const uuid = ref("");

  const fetchUser = async () => {
    const { statusCode, content } = await loadSelf() as any;
    if (statusCode === 200) {
      uuid.value = content.accountId;
      username.value = content.username;
      accountName.value = content.accountName;
    }
  };

  const logout = async () => {
    logoutSelf();
    // 防止pinia的缓存
    window.location.href = "/login";
  };
  return {
    accountName,
    username,
    uuid,
    logout,
    fetchUser,
  };
});
