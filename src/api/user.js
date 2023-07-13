import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api')

export const logoutSelf = data => request({
  url: 'logout',
  method: 'POST'
})

export const loadSelf = params => request({
  url: 'otc/userInfo',
  params
})

export const login = data => request({
  url: 'login',
  method: 'POST',
  data
})

export const authCode = params => request({
  url: 'authCode',
  params
})