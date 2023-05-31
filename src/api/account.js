import useRequest from '@/hooks/useRequest'

const { request } = useRequest('/api')

const api = {
  wallet: 'otc/property',
  address: 'otc/blockchain/deposit/addresses'
}

export const loadWalletAddress = params => request({
  url: api.address,
  params
})

export const loadWalletBalance = params => request({
  url: api.wallet
})