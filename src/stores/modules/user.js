import { loadSelf } from "../../api/user"

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
  return {
    username,
    uid,
    fetchUser
  }
})