import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api/ppc')

export const loadPhysicalCard = params => request({
  url: 'cards',
  params
})


