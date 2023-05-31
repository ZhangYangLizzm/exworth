import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api')

export const loadSelf = params => request({
  url: 'otc/userInfo',
  params
})

export const login = data => request({
  url: 'login',
  method: 'POST',
  data
})