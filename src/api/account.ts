import {useRequest} from '@/hooks'

const { request } = useRequest('/api')

const api = {
  wallet: 'otc/property',
  address: 'otc/blockchain/deposit/addresses'
}

export const loadWalletAddress = (params: any) => request({
  url: api.address,
  params
})

export const loadWalletBalance = () => request({
  url: api.wallet
})