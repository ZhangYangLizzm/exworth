import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api')

export const getConfig = () => request({
    url: 'withdraw/config/security/center',
    method: 'GET'
})

export const getGoogleSecretKey = () => request({
    url: 'withdraw/config/security/googleSecretKey',
    method: 'GET'
})

export const postGoogleAuth = data => request({
    url: 'withdraw/config/security/googleSecretKey',
    method: 'POST',
    data
})

export const postSetCode = data => request({
    url: 'withdraw/config/user/withdrawPassword',
    method: 'POST',
    data
})