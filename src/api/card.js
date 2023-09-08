import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api')

export const loadPhysicalCard = params => request({
  url: 'ppc/cards',
  params
})

export const postRecharge = data => request({
  url: 'ppc/card/recharge',
  data,
  method: 'post'
})

export const postReportLoss = data => request({
  url: 'ppc/reportLoss',
  data,
  method: 'post'
})

export const postChangeCard = data => request({
  url: 'ppc/changeCard',
  data,
  method: 'post'
})

export const postRechargeVCC = data => request({
  url: 'member/credit/recharge',
  method: 'POST',
  data
})


