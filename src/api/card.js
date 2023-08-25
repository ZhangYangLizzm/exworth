import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api/ppc')

export const loadPhysicalCard = params => request({
  url: 'cards',
  params
})

export const postRecharge = data => request({
  url: 'card/recharge',
  data,
  method: 'post'
})

export const postReportLoss = data => request({
  url: 'reportLoss',
  data,
  method: 'post'
})

export const postChangeCard = data => request({
  url: 'changeCard',
  data,
  method: 'post'
})

