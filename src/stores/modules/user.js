import { loadSelf, logoutSelf } from "@/api/user"

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const accountName = ref('')
  const uid = ref('')

  const fetchUser = async () => {
    const { statusCode, content } = await loadSelf()
    if (statusCode === 200) {
      uid.value = content.accountId
      username.value = content.username
      accountName.value = content.accountName
    }
  }

  const logout = async () => {
    logoutSelf()
    window.location.href = '/login'
  }
  return {
    accountName,
    username,
    uid,
    logout,
    fetchUser
  }
})