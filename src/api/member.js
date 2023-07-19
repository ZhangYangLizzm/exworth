import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api/member')

export const loadMember = params => request({
  url: 'member',
  params
})

export const invite = data => request({
  url: 'invite',
  data,
  method: 'post'
})

export const loadInvitation = params => request({
  url: 'invitation',
  params
})
