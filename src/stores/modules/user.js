import { loadSelf, logoutSelf } from "@/api/user"

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const uid = ref('')

  const fetchUser = async () => {
    const { statusCode, content } = await loadSelf()
    if (statusCode === 200) {
      uid.value = content.accountId
      username.value = content.accountName
    }
  }

  const logout = async () => {
    logoutSelf()
    window.location.href = '/login'
  }
  return {
    username,
    uid,
    logout,
    fetchUser
  }
})